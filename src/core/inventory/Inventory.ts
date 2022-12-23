import Item from "./Item"

type InventoryItem = Item & {
	amount: number
}
type HUDItem = {
	id: string;
} | null

const Inventory = new class {
	// Items in inventory
	private _items: InventoryItem[] = []
	get items(): InventoryItem[] {
		return this._items
	}
	public removeItem(id: string, amount: number): boolean {
		for(let item of this._items) {
			if(item.id === id) {
				// Remove some amount
				if(item.amount > amount) {
					item.amount -= amount
					return true
				}
				// Remove item
				else {
					this._items = this._items.filter((item: InventoryItem) => item.id !== id)
					return true
				}
			}
		}

		return false
	}
	public getItem(id: string): InventoryItem | null {
		for(let item of this._items) {
			if(item.id === id)
				return item
		}

		return null
	}

	// Items in HUD
	private _hud: HUDItem[] = [
		null,
		null,
		null,
		null,
		null
	]
	get hud(): HUDItem[] {
		return this._hud
	}
	public addToHUD(id: string, slot: number) {
		let item: InventoryItem | null = this.getItem(id)

		if(!item) {
			console.error(`Failed to add to HUD: item not found (id: ${id})`)
			return
		}
		if(slot < 1 || slot > 5) {
			console.error(`Failed to add to HUD: slot number is invalid (should be 1-5)`)
			return
		}

		this._hud[slot - 1] = { id: item.id }
	}
}

export default Inventory