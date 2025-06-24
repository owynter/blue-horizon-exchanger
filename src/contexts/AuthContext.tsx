import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  preferences: {
    favoriteCurrencies: string[];
    defaultBaseCurrency: string;
    theme: 'light' | 'dark' | 'system';
  };
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  updatePreferences: (preferences: Partial<User['preferences']>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  // Simulate API calls - In a real app, these would be actual API calls
  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user exists in localStorage (mock database)
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const existingUser = users.find((u: any) => u.email === email);
      
      if (!existingUser || existingUser.password !== password) {
        throw new Error('Invalid email or password');
      }
      
      const userData: User = {
        id: existingUser.id,
        email: existingUser.email,
        name: existingUser.name,
        createdAt: new Date(existingUser.createdAt),
        preferences: existingUser.preferences || {
          favoriteCurrencies: [],
          defaultBaseCurrency: 'USD',
          theme: 'system'
        }
      };
      
      setUser(userData);
      localStorage.setItem('currentUser', JSON.stringify(userData));
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string): Promise<void> => {
    setIsLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const existingUser = users.find((u: any) => u.email === email);
      
      if (existingUser) {
        throw new Error('User with this email already exists');
      }
      
      // Create new user
      const newUser = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        password, // In a real app, this would be hashed
        name,
        createdAt: new Date().toISOString(),
        preferences: {
          favoriteCurrencies: ['USD', 'EUR', 'GBP', 'JPY'], // Default favorites
          defaultBaseCurrency: 'USD',
          theme: 'system' as const
        }
      };
      
      // Save to mock database
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      
      // Set current user
      const userData: User = {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        createdAt: new Date(newUser.createdAt),
        preferences: newUser.preferences
      };
      
      setUser(userData);
      localStorage.setItem('currentUser', JSON.stringify(userData));
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const updatePreferences = (preferences: Partial<User['preferences']>) => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      preferences: {
        ...user.preferences,
        ...preferences
      }
    };
    
    setUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    // Update in mock database
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex((u: any) => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], preferences: updatedUser.preferences };
      localStorage.setItem('users', JSON.stringify(users));
    }
  };

  // Check for existing session on mount
  useEffect(() => {
    const checkAuthState = () => {
      try {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
          const userData = JSON.parse(currentUser);
          setUser({
            ...userData,
            createdAt: new Date(userData.createdAt)
          });
        }
      } catch (error) {
        console.error('Error checking auth state:', error);
        localStorage.removeItem('currentUser');
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuthState();
  }, []);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    updatePreferences,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 