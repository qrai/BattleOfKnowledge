export default class Map {
	public tiles: string[][][] = []
	public tilesData: Record<string, any>[][][] = []

	constructor(tiles: string[][][] = [], tilesData: Record<string, any>[][][] = []) {
		this.tiles = tiles
		this.tilesData = tilesData
	}

	public getTileData(x: number, y: number, z: number): Record<string,any> | undefined {
		return this.tilesData[x]?.[y]?.[z]
	}

	// Check tile at X, Y, Z
	public isTileExists(x: number, y: number, z: number) {
		return this.tiles[x][y][z] !== undefined
	}

	// Remove tile at X, Y, Z
	public removeTile(x: number, y: number, z: number) {
		if(this.isTileExists(x, y, z)) {
			delete this.tiles[x][y][z]
		}
		else {
			console.error(`Failed to remove tile at (${x}, ${y}, ${z}): tile is not exists`)
		}
	}

	// Set tile at X, Y, Z
	public setTile(x: number, y: number, z: number, tile: string | null, data?: any) {
		if(tile === null) return

		if(this.tiles[x][y]) {
			// Set tile & data
			this.tiles[x][y][z] = tile
			if(data) this.tilesData[x][y][z] = data
		}
		else {
			console.error(`Failed to set tile at (${x}, ${y}): position is invalid`)
		}
	}

	// Push tile to X, Y
	public pushTile(x: number, y: number, tile: string | null, data?: any) {
		if(tile === null) return

		if(this.tiles[x][y]) {
			// Get top Z
			let z = this.tiles[x][y].length
			// Set tile & data
			this.tiles[x][y][z] = tile
			if(data) this.tilesData[x][y][z] = data
		}
		else {
			console.error(`Failed to set tile at (${x}, ${y}): position is invalid`)
		}
	}
}