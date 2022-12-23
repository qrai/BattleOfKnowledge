export default interface MapBiome {
	readonly ground: string;
	readonly plant: string | null;
	readonly tree: string | null;
}

// Biomes
export const DesertBiome: MapBiome = {
	ground: "dirt",
	plant: "corn",
	tree: null
}