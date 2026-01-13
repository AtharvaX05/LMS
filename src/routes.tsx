import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import BorrowerDashboard from './pages/BorrowerDashboard';
import BankDashboard from './pages/BankDashboard';
import ComplianceDashboard from './pages/ComplianceDashboard';
import { useAuthContext } from './store/AuthContext';

const AppRoutes = () => {
  const navigate = useNavigate();
  const { isAuthenticated, getCurrentRole } = useAuthContext();
  
  // Redirect based on authentication status
  useEffect(() => {
    if (!isAuthenticated && window.location.pathname !== '/signup') {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      
      {/* Protected routes */}
      <Route path="/" element={
        <Navigate 
          to={
            getCurrentRole() === 'borrower' 
              ? '/borrower' 
              : getCurrentRole() === 'bank-officer' 
                ? '/bank-officer' 
                : '/compliance'
          }
        />
      } />
      
      <Route path="/borrower" element={<BorrowerDashboard />} />
      <Route path="/bank-officer" element={<BankDashboard />} />
      <Route path="/compliance" element={<ComplianceDashboard />} />
    </Routes>
  );
};

export default AppRoutes;