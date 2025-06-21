// client/src/utils/auth.js
import { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser } from './api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          // Verify token validity before setting user state
          const isValid = await verifyToken(token);
          if (isValid) {
            setUser({ token });
            // Optional: Fetch additional user data if needed
            // await fetchUserData(token);
          } else {
            localStorage.removeItem('token');
          }
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
        setError('Failed to initialize authentication');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Basic token verification (replace with actual verification logic)
  const verifyToken = async (token) => {
    // In a real app, you might:
    // 1. Decode the token to check expiration
    // 2. Make an API call to validate the token
    // 3. Check token structure
    return !!token; // Simple check for demo purposes
  };

  const login = async (credentials) => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await loginUser(credentials);
      if (!data?.token) {
        throw new Error('No token received from server');
      }

      localStorage.setItem('token', data.token);
      setUser({
        ...(data.user || {}), // Handle cases where user data might not be returned
        token: data.token
      });
      return { success: true };
    } catch (error) {
      let errorMessage = 'Login failed';
      
      if (error.response) {
        errorMessage = error.response.data?.message || errorMessage;
      } else if (error.request) {
        errorMessage = 'Network error - could not reach server';
      }
      
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await registerUser(userData);
      if (!data?.token) {
        throw new Error('No token received from server');
      }

      localStorage.setItem('token', data.token);
      setUser({
        ...(data.user || {}),
        token: data.token
      });
      return { success: true };
    } catch (error) {
      let errorMessage = 'Registration failed';
      
      if (error.response) {
        errorMessage = error.response.data?.message || errorMessage;
        if (error.response.status === 409) {
          errorMessage = 'User already exists';
        }
      } else if (error.request) {
        errorMessage = 'Network error - could not reach server';
      }
      
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem('token');
      setUser(null);
      setError(null);
    } catch (err) {
      console.error('Logout error:', err);
      setError('Failed to logout properly');
    }
  };

  // Function to refresh token if needed
  const refreshToken = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return null;
      
      // In a real app, you would call your refresh token endpoint
      // const newToken = await refreshTokenAPI(token);
      // localStorage.setItem('token', newToken);
      // setUser(prev => ({ ...prev, token: newToken }));
      // return newToken;
      
      return token; // For now just return current token
    } catch (err) {
      console.error('Token refresh failed:', err);
      logout();
      return null;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      loading, 
      error,
      refreshToken,
      isAuthenticated: !!user?.token
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}