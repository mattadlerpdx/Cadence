package inventory

// InventoryItem represents an item in the inventory.
type InventoryItem struct {
	ID    int    `json:"id"`
	Name  string `json:"name"`
	Stock int    `json:"stock"`
}
