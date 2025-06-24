import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');
      
      if (!email || !password) {
        return setError('Please fill in all fields');
      }
      
      try {
        setLoading(true);
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
    
        if (!response.ok) {
          const { message } = await response.json();
          return setError(message || 'Invalid email or password');
        }
    
        const { token } = await response.json();
        localStorage.setItem('token', token);
        navigate('/');
      } catch (err) {
        setError('Failed to log in');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
      
    
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Welcome Back</h2>
            
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md flex items-start">
                <AlertCircle size={18} className="mr-2 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={18} className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="password"
                    id="password"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-900 text-white py-2 rounded-md hover:bg-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                disabled={loading}
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="text-blue-900 hover:text-blue-700 font-medium">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
        
        {/* Demo Account Info */}
        <div className="max-w-md mx-auto mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <h3 className="text-lg font-medium text-blue-800 mb-2">Demo Account</h3>
          <p className="text-sm text-gray-700 mb-2">
            You can create a new account or use these test credentials:
          </p>
          <div className="bg-white p-3 rounded border border-blue-100">
            <p className="text-sm">
              <strong>Email:</strong> demo@travelease.com
            </p>
            <p className="text-sm">
              <strong>Password:</strong> password123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;