import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import InventoryPage from './pages/InventoryPage';
import Dashboard from './pages/Dashboard'; // Assuming you have a Dashboard component
import Settings from './pages/Settings';
import ProtectedRoute from './components/ProtectedRoute';


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/inventory" element={<InventoryPage />} />
      <Route
        path="/settings"
        element={<Settings/>}
      />
      <Route path="*" element={<Navigate to="/" />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }

      />
      {/* Add other routes here */}
    </Routes>
  );
};

export default AppRoutes;