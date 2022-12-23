import ITile, { Tiles, TilesAmount } from './type/ITile'

import Map from './type/Map'

import BuildMode from './component/BuildMode'

import IComponent from './type/IComponent'
import Camera from './component/Camera'
import IObject from './type/IObject'

export default new class Engine {
	private readonly tileColumnOffset: number = 256; //px
	private readonly tileRowOffset: number = 128; //px
	public readonly baseWidthFactor: number = 370; // px

	public map?: Map;

	private originX: number = 0; // offset from left
	private originY: number = 0; // offset from top

	public Xtiles: number = 0; // Number of tiles in X-dimension
	public Ytiles: number = 0; // Number of tiles in Y-dimensi
	
	private selectedTileX: number = -1;
	private selectedTileY: number = -1;

	private showCoords: boolean = false;

	private readonly tileImages: Record<string, HTMLImageElement> = {};

	private canvas: HTMLCanvasElement | null = null;
	public context: CanvasRenderingContext2D | null = null;

	public get width(): number {
		return this.canvas?.width ?? 0
	}
	public get height(): number {
		return this.canvas?.height ?? 0
	}

	public components: IComponent[] = [];
	public camera?: Camera;
	public building?: BuildMode;
	public addComponent(component: IComponent) {
		this.components.push(component)

		// Core components
		if(component instanceof Camera) {
			this.camera = component
		}
		else if(component instanceof BuildMode) {
			this.building = component
		}
	}

	public objects: Record<string, IObject> = {};
	public addObject(id: string, obj: IObject) {
		this.objects[id] = obj
	}

	public load(canvas: HTMLCanvasElement, map: Map) {
		this.map = map

		// Setup canvas & context
		this.canvas = canvas
		this.context = this.canvas.getContext('2d')

		// Setup tiles
		this.Xtiles = this.map.tiles.length
		this.Ytiles = this.map.tiles[0].length

		this.updateCanvasSize()

		// Load images
		let loadedImages: number = 0
		let totalImages: number = TilesAmount
	
		// Load all the images before we run the app
		for(let id in Tiles) {
			this.tileImages[id] = new Image()
			this.tileImages[id].onload = () => {
				if(++loadedImages >= totalImages) {
					// Run game loop
					requestAnimationFrame(this.loop.bind(this))
				}
			}
			this.tileImages[id].src = require('@/assets/sprite/tile/' + Tiles[id].image + '_N.png')
		}

		// Load components
		for(let component of this.components) {
			component.init?.(this)
		}

		// Add event listeners
		window.onclick = () => {
			// Build
			if(this.building?.tile && this.map) {
				// Change tile
				this.map.tiles[this.selectedTileX][this.selectedTileY][this.building.layer] = this.building.tile
			}

			let { x, y } = this.worldToScreen(this.selectedTileX, this.selectedTileY)
			let { Xi, Yi } = this.screenToWorld(x, y)

			console.log(`(${this.selectedTileX}, ${this.selectedTileY}), (${Xi}, ${Yi})`)
		}
		window.onresize = () => {
			this.updateCanvasSize()

			for(let component of this.components) {
				component.onResize?.()
			}
		}
		window.onmousemove = (e) => {
			let pageX = e.pageX
			let pageY = e.pageY

			if(this.camera) {
				pageX /= this.camera.zoom
				pageY /= this.camera.zoom

				pageX -= this.camera.x
				pageY -= this.camera.y
			}

			pageX = pageX - this.tileColumnOffset / 2 - this.originX;
			pageY = pageY - this.tileRowOffset / 2 - this.originY;
			let tileX = Math.round(pageX / this.tileColumnOffset - pageY / this.tileRowOffset)
			let tileY = Math.round(pageX / this.tileColumnOffset + pageY / this.tileRowOffset)
	   
			this.selectedTileX = tileX
			this.selectedTileY = tileY
		}
	}

	public worldToScreen(Xi: number, Yi: number): { x: number, y: number } {
		let x = Xi * this.tileColumnOffset / 2 + Yi * this.tileColumnOffset / 2 + this.originX;
		let y = Yi * this.tileRowOffset / 2 - Xi * this.tileRowOffset / 2 + this.originY;

		return { x, y }
	}
	public screenToWorld(x: number, y: number): { Xi: number, Yi: number } {
		if(this.camera) {
			x /= this.camera.zoom
			y /= this.camera.zoom

			x -= this.camera.x
			y -= this.camera.y
		}

		//y += this.baseWidthFactor

		x = x - this.tileColumnOffset / 2 - this.originX
		y = y - this.tileRowOffset / 2 - this.originY
		let Xi = Math.round(x / this.tileColumnOffset - y / this.tileRowOffset)
		let Yi = Math.round(x / this.tileColumnOffset + y / this.tileRowOffset)

		return { Xi, Yi }
	}

	public readonly fps: number = 60;
	public lastTime?: number;
	public readonly requiredElapsed = 1000 / this.fps;
	private loop(now: number) {
		requestAnimationFrame(this.loop.bind(this))

		if(!this.lastTime) this.lastTime = now
		let elapsed = now - this.lastTime

		if(elapsed > this.requiredElapsed) {
			this.lastTime = now

			for(let component of this.components) {
				component.update?.()
			}

			this.render(elapsed)
		}
	}

	private updateCanvasSize() {
		if(!this.context) return

		const width = window.innerWidth
		const height = window.innerHeight
	
		this.context.canvas.width  = width;
		this.context.canvas.height = height;

		this.originX = width / 2 - this.Xtiles * this.tileColumnOffset / 2;
		this.originY = height / 2;
	}
	
	private render(delta: number) {
		if(!this.context || !this.map) return

		this.context.canvas.width = this.context.canvas.width

		if(this.camera) this.camera.begin()

		// Before render
		for(let component of this.components) {
			component.beforeRender?.(delta)
		}

		// Drawing tiles
		const layers = 3
		for(let Zi = 0; Zi < layers; Zi++) {
			for(let Xi = (this.Xtiles - 1); Xi >= 0; Xi--) {
				for(let Yi = 0; Yi < this.Ytiles; Yi++) {
					// Is layer exists in this position
					if(Zi < this.map.tiles[Xi][Yi].length) {
						// Draw building
						if(Zi === this.building?.layer && Xi === this.selectedTileX && Yi === this.selectedTileY && this.building.tile && this.isCursorOnMap()) {
							this.context.filter = 'sepia(100%) hue-rotate(90deg) saturate(200%)'
							this.drawTile(this.selectedTileX, this.selectedTileY, this.tileImages[this.building.tile])
							this.context.filter = 'none'
							continue
						}

						if(this.map.tilesData[Xi][Yi][Zi]) {
							// Apply filter
							if(this.map.tilesData[Xi][Yi][Zi].filter) {
								this.context.filter = this.map.tilesData[Xi][Yi][Zi].filter
							}
						}

						this.drawTile(Xi, Yi, this.tileImages[this.map.tiles[Xi][Yi][Zi]])
						this.context.filter = 'none'
					}
				}
			}
		}

		// Drawing selection
		this.drawSelected(this.selectedTileX, this.selectedTileY, '#ffd700')

		// Objects
		for(let obj of Object.values(this.objects)) {
			obj.render()
		}

		// After render
		for(let component of this.components) {
			component.afterRender?.(delta)
		}

		if(this.camera) this.camera.end()
	}
	
	private isCursorOnMap() {
		return (this.selectedTileX >= 0 && this.selectedTileX < this.Xtiles &&
			this.selectedTileY >= 0 && this.selectedTileY < this.Ytiles)
	}
	
	private drawTile(Xi: number, Yi: number, image: any) {
		if(!this.context || !this.map) return

		let { x, y } = this.worldToScreen(Xi, Yi)

		this.context.drawImage(image, x, y - 370)
	
		if(this.showCoords) {
			this.context.fillStyle = 'black';
			this.context.font = '14pt Arial'
			this.context.fillText(Xi + ", " + Yi, x + this.tileColumnOffset / 2 - 15, y + this.tileRowOffset / 2 + 3);
		}
	}
	
	private drawSelected(Xi: number, Yi: number, color: string) {
		if(!this.context || !this.map || !this.map.tiles[Xi]?.[Yi]) return

		// Tile data
		const tile = this.map.tiles[Xi][Yi]
		const tileData: ITile | undefined = Tiles[tile[tile.length - 1]]

		let offX = Xi * this.tileColumnOffset / 2 + Yi * this.tileColumnOffset / 2 + this.originX;
		let offY = Yi * this.tileRowOffset / 2 - Xi * this.tileRowOffset / 2 + this.originY;
	
		// Selection
		this.drawLine(offX, offY + this.tileRowOffset / 2, offX + this.tileColumnOffset / 2, offY, color)
		this.drawLine(offX + this.tileColumnOffset / 2, offY, offX + this.tileColumnOffset, offY + this.tileRowOffset / 2, color)
		this.drawLine(offX + this.tileColumnOffset, offY + this.tileRowOffset / 2, offX + this.tileColumnOffset / 2, offY + this.tileRowOffset, color)
		this.drawLine(offX + this.tileColumnOffset / 2, offY + this.tileRowOffset, offX, offY + this.tileRowOffset / 2, color)

		// Title
		if(tileData?.title && !this.building?.tile) {
			this.context.fillStyle = 'white'
			this.context.font = '18pt Arial'
			this.context.strokeStyle = 'black'
			this.context.lineWidth = 3
			this.context.strokeText(tileData.title ?? '', offX + this.tileColumnOffset/2 - 35, offY + this.tileRowOffset/2 + 3)
			this.context.fillText(tileData.title ?? '', offX + this.tileColumnOffset/2 - 35, offY + this.tileRowOffset/2 + 3)
		}
	}
	
	private drawLine(x1: number, y1: number, x2: number, y2: number, color: string) {
		if(!this.context) return

		color = typeof color !== 'undefined' ? color : 'white';
		this.context.strokeStyle = color;
		this.context.beginPath();
		this.context.lineWidth = 2;
		this.context.moveTo(x1, y1);
		this.context.lineTo(x2, y2);
		this.context.stroke();
	}
}