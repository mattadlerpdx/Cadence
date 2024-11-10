package business

// Repository is an interface for interacting with business data storage.
type Repository interface {
	Save(business *Business) error
	FindByID(id int) (*Business, error)
	FindAll() ([]*Business, error)
	Delete(id int) error
}
