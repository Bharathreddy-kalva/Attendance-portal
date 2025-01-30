import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from "../firebase"; // Import your Firebase auth

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication status
    
    const unsubscribe = auth.onAuthStateChanged(user => {
        console.log("Auth state changed:", user); // Check if user object is being returned
        setIsAuthenticated(!!user); // Set true if user is logged in
        setLoading(false); // Stop loading once the authentication check is done
      });
    
      return unsubscribe; // Cleanup on unmount
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show a loading spinner while checking the auth status
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />; // Redirect to login page if not authenticated
  }

  return children; // Render the protected route children if authenticated
};

export default ProtectedRoute;
