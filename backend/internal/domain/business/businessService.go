package business

// Service provides business-related operations.
type Service struct {
	repository Repository
}

// NewService creates a new instance of the Business Service with the given repository.
func NewService(repo Repository) *Service {
	return &Service{repository: repo}
}

// CreateBusiness handles the logic to create a new business.
func (s *Service) CreateBusiness(name, owner, contactInfo string) (*Business, error) {
	business := &Business{Name: name, Owner: owner, ContactInfo: contactInfo}
	err := s.repository.Save(business)
	if err != nil {
		return nil, err
	}
	return business, nil
}

// GetBusiness retrieves a business by ID.
func (s *Service) GetBusiness(id int) (*Business, error) {
	return s.repository.FindByID(id)
}

// GetAllBusinesses retrieves all businesses.
func (s *Service) GetAllBusinesses() ([]*Business, error) {
	return s.repository.FindAll()
}

// DeleteBusiness deletes a business by ID.
func (s *Service) DeleteBusiness(id int) error {
	return s.repository.Delete(id)
}
