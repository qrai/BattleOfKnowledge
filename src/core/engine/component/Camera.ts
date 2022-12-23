import Engine from "../Engine"
import IComponent from "../type/IComponent"

export default class Camera extends IComponent {
	public zoom: number = 0.75
	public x: number = 0
	public y: number = 0

    init(engine: typeof Engine) {
		super.init(engine)

		// Place camera to center
		let { x, y } = engine.worldToScreen(engine.Xtiles / 2, engine.Ytiles / 2)
		this.x += x / 2 - engine.baseWidthFactor / 1.5
		this.y += (y / 2) - (engine.baseWidthFactor / 2)
    }

    begin() {
		if(!this.engine?.context) return
		
        this.engine.context.save()
        this.engine.context.scale(this.zoom, this.zoom)
        this.engine.context.translate(this.x, this.y)
    }
    end() {
		if(!this.engine?.context) return

        this.engine.context.restore()
    }
}