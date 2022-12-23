import Engine from "../Engine"

export default abstract class IComponent {
	protected engine: typeof Engine | null = null;

	init(engine: typeof Engine) {
		this.engine = engine
	}

	update?(): void;
	beforeRender?(delta: number): void;
	afterRender?(delta: number): void;
	onResize?(): void;
}