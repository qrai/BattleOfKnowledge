import Map from "./Map"
import MapBiome from "./MapBiome"

const MapGenerator = new class {
	public generate(width: number, height: number, biome: MapBiome): Map {
		let map: Map = new Map()

		// Generate field
		for(let x = 0; x < width; x++) {
			map.tiles[x] = []
			map.tilesData[x] = []
			for(let y = 0; y < height; y++) {
				map.tiles[x][y] = []
				map.tilesData[x][y] = []

				// Ground
				map.setTile(x, y, 0, biome.ground)

				// Plants (5%)
				if(biome.plant && this.randomBoolean(0.05)) {
					map.pushTile(x, y, biome.plant)
				}

				// Chest (0.1%)
				if(this.randomBoolean(0.001)) {
					map.setTile(x, y, 1, "chest")
				}
			}
		}

		return map
	}

	// Random
	private randomNumber(min: number, max: number): number {
		let rand = min - 0.5 + Math.random() * (max - min + 1)
  		return Math.round(rand)
	}
	private randomBoolean(chance = 0.5): boolean {
		return Math.random() < chance
	}
}

export default MapGenerator