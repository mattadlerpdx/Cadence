package inventory

// Service provides inventory-related operations.
type Service struct {
	repository Repository
}

// NewService creates a new instance of the Inventory Service with the given repository.
func NewService(repo Repository) *Service {
	return &Service{repository: repo}
}

// AddInventoryItem handles the logic to add a new inventory item.
func (s *Service) AddInventoryItem(name string, stock int) (*InventoryItem, error) {
	item := &InventoryItem{Name: name, Stock: stock}
	err := s.repository.Save(item)
	if err != nil {
		return nil, err
	}
	return item, nil
}

// GetInventoryItem retrieves an inventory item by ID.
func (s *Service) GetInventoryItem(id int) (*InventoryItem, error) {
	return s.repository.FindByID(id)
}

// GetAllInventoryItems retrieves all inventory items.
func (s *Service) GetAllInventoryItems() ([]*InventoryItem, error) {
	return s.repository.FindAll()
}

// DeleteInventoryItem deletes an inventory item by ID.
func (s *Service) DeleteInventoryItem(id int) error {
	return s.repository.Delete(id)
}
