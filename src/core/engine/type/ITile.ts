export default interface ITile {
	title: string;
	image: string;
}

export const Tiles: Record<string, ITile> = {
	// Dirt
	"dirt": { title: "Земля", image: "ground/dirt" },
	"dirt_farm": { title: "Пашня", image: "ground/dirtFarmland" },

	// Plants
	"corn": { title: "Кукуруза", image: "ground/corn" },
	"corn_young": { title: "Кукуруза", image: "ground/cornYoung" },

	// Trees
	"tree_birch": { title: "Дерево", image: "tree/treeBirch" },
	
	// Wood
	"planks": { title: "Дерево", image: "ground/planks" },
	"planks_high": { title: "Дерево", image: "ground/planksHigh" },
	"planks_side": { title: "Дерево", image: "ground/planksSide" },
	"wooden_support": { title: "Дерево", image: "wall/woodenSupportsBlock" },
	"chest": { title: "Сундук", image: "decor/chestClosed" },

	/*
	// Stone: Ground
	"ground/stone", // 10
	"ground/stoneStep", // 11
	"ground/stoneSteps", // 12
	"ground/stoneSide", // 13
	"ground/stoneCorner", // 14
	"ground/stoneInset", // 15
	"ground/stoneLeft", // 16
	"ground/stoneRight", // 17
	// Stone: Wall
	"wall/stoneWall", // 
	"wall/stoneWallTop", // 
	"wall/stoneWallHalf", // 
	"wall/stoneWallHole", // 
	"wall/stoneWallRound", // 
	"wall/stoneWallStructure", // 
	"wall/stoneWallArchway", // 
	"wall/stoneWallColumn", // 
	"wall/stoneWallColumnIn", // 
	"wall/stoneColumn", // 
	"wall/stoneWallCorner", // 
	"wall/stoneWallWindow", // 
	"wall/stoneWallWindowBars", // 
	"wall/stoneWallDoor", // 
	"wall/stoneWallDoorBars", // 
	"wall/stoneWallGate", // 
	"wall/stoneWallGateBars", // 
	"wall/stoneWallBooks", // 
	*/
}
export const TilesAmount = Object.keys(Tiles).length