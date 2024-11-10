package inventory

// Repository is an interface for interacting with inventory data storage.
type Repository interface {
	Save(item *InventoryItem) error
	FindByID(id int) (*InventoryItem, error)
	FindAll() ([]*InventoryItem, error)
	Delete(id int) error
}
