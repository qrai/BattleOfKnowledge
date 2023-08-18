import IComponent from "../type/IComponent"
import Engine from "../Engine"
import IObject from "../type/IObject";

enum PlayerAngle {
	N = '0',
	NE = '1',
	E = '2',
	SE = '3',
	S = '4',
	SW = '5',
	W = '6',
	WN = '7'
}
enum PlayerState {
	Idle = 'Idle',
	Run = 'Run',
	Pickup = 'Pickup'
}

export class PlayerObject extends IObject {
	public render(): void {
		
	}
}

export default class Player extends IComponent {
	public angle: PlayerAngle = PlayerAngle.SE;
	public state: PlayerState = PlayerState.Idle;
	public animationFrame: number = 0;

	private prevX: number = 0;
	public x: number = 0;
	private velX: number = 0;

	private prevY: number = 0;
	private y: number = 0;
	private velY: number = 0;

	private keys: Record<string, boolean> = {};

	public readonly speed: number = 4;
	public readonly friction: number = 0.75;

	private images?: Record<PlayerState, Record<PlayerAngle, Record<number, CanvasImageSource>>>;

	init(engine: typeof Engine) {
		super.init(engine)

		// Initial position of player
		this.x = engine.width / 2
		this.y = engine.height / 2 - engine.baseWidthFactor

		//let { x, y } = engine.worldToScreen(engine.Xtiles / 2, engine.Ytiles / 2)
		//this.x = x
		//this.y = y - engine.baseWidthFactor

		let images: any = {}
		for(let state of Object.values(PlayerState)) {
			images[state] = {}
			for(let angle of Object.values(PlayerAngle)) {
				images[state][angle] = {}

				if(state === PlayerState.Idle) {
					let img = new Image()
					img.src = require(`@/assets/sprite/entity/player/Male_${angle}_${state}0.png`)
					images[state][angle][0] = img
				}
				else {
					for(let i = 0; i <= 6;i++) {
						let img = new Image()
						img.src = require(`@/assets/sprite/entity/player/Male_${angle}_${state}${i}.png`)
						images[state][angle][i] = img
					}
				}
			}
		}
		this.images = images

		// Add event listener
        window.addEventListener('keydown', (e) => {
			this.keys[e.key.toLowerCase()] = true
		})
		window.addEventListener('keyup', (e) => {
			delete this.keys[e.key.toLowerCase()]
		})
    }

	changeFrameInterval: number = -1
	update() {
		if(this.keys['w']) {
			if(this.velY > -this.speed) {
				this.angle = PlayerAngle.WN
				this.velY--
			}
		}
		if(this.keys['s']) {
			if(this.velY < this.speed) {
				this.angle = PlayerAngle.SE
				this.velY++
			}
		}
		if(this.keys['d']) {
			if(this.velX < this.speed) {
				this.angle = PlayerAngle.NE
				this.velX++
			}
		}
		if(this.keys['a']) {
			if(this.velX > -this.speed) {
				this.angle = PlayerAngle.SW
				this.velX--
			}
		}

		// Angles
		if(this.keys['w'] && this.keys['a']) {
			this.angle = PlayerAngle.W
		}
		if(this.keys['a'] && this.keys['s']) {
			this.angle = PlayerAngle.S
		}
		if(this.keys['s'] && this.keys['d']) {
			this.angle = PlayerAngle.E
		}
		if(this.keys['d'] && this.keys['w']) {
			this.angle = PlayerAngle.N
		}

		// Not moving -> Idle state
		if(!this.keys['w'] && !this.keys['a'] && !this.keys['s'] && !this.keys['d']) {
			this.state = PlayerState.Idle

			if(this.changeFrameInterval !== -1) {
				clearInterval(this.changeFrameInterval)
				this.changeFrameInterval = -1
				this.animationFrame = 0
			}
		}
		// Moving -> Run state
		else {
			this.state = PlayerState.Run

			// Animation
			if(this.changeFrameInterval === -1) {
				this.changeFrameInterval = setInterval(() => {
					this.animationFrame += 1
					if(this.animationFrame > 6) {
						this.animationFrame = 0
					}
				}, 100)
			}
		}

		this.velY *= this.friction
		this.prevY = this.y
		this.y += this.velY

		this.velX *= this.friction
		this.prevX = this.x
		this.x += this.velX

		if(this.engine?.camera) {
			this.engine.camera.x -= this.x - this.prevX
			this.engine.camera.y -= this.y - this.prevY
		}
	}

	onResize() {
		if(!this.engine) return

		this.x = this.engine.width / 2
		this.y = this.engine.height / 2 - this.engine.baseWidthFactor
	}

	afterRender() {
		if(!this.engine || !this.images?.[this.state][this.angle][0]) return

		let frame: number = this.animationFrame
		if(this.state === PlayerState.Idle)
			frame = 0

		// Draw image
		this.engine.context?.drawImage(
			this.images[this.state][this.angle][frame],
			this.x,
			this.y
		)
	}

	public getPosition(): { Xi: number, Yi: number } | null {
		if(!this.engine) return null

		let { Xi, Yi } = this.engine.screenToWorld(this.x, this.y)
		Xi -= 4
		Yi += 4
		return { Xi, Yi }
	}
}