import IComponent from "../type/IComponent"
import Player from "./Player";

export default class BuildMode extends IComponent {
	public tile: string | null = null;
	public layer: number = 0;

	canBuild(player: Player, Xi: number, Yi: number): boolean {
		return false
	}
}