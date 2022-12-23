export enum ItemType {
	Material = 'material',
	Book = 'book',

	Tile = 'tile',

	Armor_Helmet = 'helmet',
	Armor_Body = 'body',
	Armor_Pants = 'pants',
	Armor_Boots = 'boots',
}

export default interface Item {
	id: string;
	type: ItemType;

	icon: string;
	title: string;
	description: string;
}