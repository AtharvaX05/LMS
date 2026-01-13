import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthContext } from '../store/AuthContext';
import '../assets/styles/auth.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuthContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const userData = await login(email, password);

      // Redirect based on role
      if (userData.role === 'borrower') {
        navigate('/borrower');
      } else if (userData.role === 'bank-officer') {
        navigate('/bank-officer');
      } else if (userData.role === 'compliance') {
        navigate('/compliance');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-header">
          <h1>LSFI Platform</h1>
          <p>Loan Stability & Fairness Index</p>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-[#003D82] hover:underline font-medium">
              Create one now
            </Link>
          </p>
        </div>

        <div className="demo-info">
          <strong>Demo Accounts:</strong>
          <p>📦 Borrower: <code>borrower@lsfi.com</code></p>
          <p>🏦 Officer: <code>officer@lsfi.com</code></p>
          <p>✅ Compliance: <code>compliance@lsfi.com</code></p>
          <p style={{ marginTop: '8px' }}>Password: <code>password123</code></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
