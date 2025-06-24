import { createContext, useState, useEffect, useContext } from 'react';
import React from 'react';

// Create auth context
const AuthContext = createContext();

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user exists in localStorage on component mount
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  // Signup function
  const signup = (email, password, name) => {
    // Create a new user
    const newUser = {
      id: Date.now().toString(),
      email,
      name,
      bookings: []
    };
    
    // Store user in localStorage
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    // Save in users array
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push({ email, password, id: newUser.id });
    localStorage.setItem('users', JSON.stringify(users));
    
    setCurrentUser(newUser);
    return newUser;
  };

  // Login function
  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      // Get full user data
      const userData = {
        id: user.id,
        email: user.email,
        name: user.name || email.split('@')[0],
        bookings: user.bookings || []
      };
      
      localStorage.setItem('currentUser', JSON.stringify(userData));
      setCurrentUser(userData);
      return userData;
    }
    
    return null;
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
  };

  // Add a booking
  const addBooking = (booking) => {
    if (!currentUser) return;
    
    const updatedUser = {
      ...currentUser,
      bookings: [...(currentUser.bookings || []), booking]
    };
    
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    setCurrentUser(updatedUser);
  };

  const value = {
    currentUser,
    signup,
    login,
    logout,
    addBooking
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  return useContext(AuthContext);
};