import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';
import { AuthProvider } from './store/AuthContext';
import { LSFIStateProvider } from './store/LSFIStateContext';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <LSFIStateProvider>
          <AppRoutes />
        </LSFIStateProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
