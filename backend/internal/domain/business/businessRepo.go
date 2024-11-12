package business

// Repository is an interface for interacting with business data storage.
type Repository interface {
	Save(business *Business) error
	FindByID(id int) (*Business, error)
	FindAll() ([]*Business, error)
	Delete(id int) error
	Update(id int, name, owner, contactInfo string) (*Business, error) // Add the Update method to the interface
}
