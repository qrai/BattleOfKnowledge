export default abstract class IObject {
	public x: number = 0;
	public y: number = 0;
	public z: number = 0;

	public abstract render(): void;
}