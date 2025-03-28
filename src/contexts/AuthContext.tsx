
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '../types';
import { mockUsers } from '../data/mockData';

type AuthContextType = {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<User | null>;
  logout: () => void;
  register: (email: string, name: string, password: string, role: UserRole) => Promise<User | null>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Load stored user on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setCurrentUser(user);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('currentUser');
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<User | null> => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, you'd validate against a database
    // For this demo, we'll check against our mock data
    // Note: In a real app, you'd never store passwords in plaintext
    const user = mockUsers.find(user => user.email === email);
    
    if (user && password === 'password') { // Using a simple password for demo
      setCurrentUser(user);
      setIsAuthenticated(true);
      localStorage.setItem('currentUser', JSON.stringify(user));
      return user;
    }
    
    return null;
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser');
  };

  const register = async (
    email: string, 
    name: string, 
    password: string, 
    role: UserRole
  ): Promise<User | null> => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, you'd validate and store in a database
    // For this demo, we'll just create a user object but won't persist it
    // across page reloads
    const newUser: User = {
      id: `new-${Date.now()}`,
      email,
      name,
      role,
      createdAt: new Date(),
    };
    
    // In a real app, you'd store the user in a database
    setCurrentUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    return newUser;
  };

  const value = {
    currentUser,
    isAuthenticated,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
