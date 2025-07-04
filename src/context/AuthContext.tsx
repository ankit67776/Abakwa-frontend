
"use client";

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; 

interface User {
  id: string;
  email: string;
  name: string;
  role: 'advertiser' | 'publisher';
}

interface DecodedToken {
  exp: number;
  // Add other token properties if needed
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ user: User, token: string } | void>;
  signup: (email: string, password: string, passwordConfirmation: string, name: string, role: 'advertiser' | 'publisher') => Promise<{ user: User, token: string } | void>;
  handleGoogleLogin: (credentialResponse: any, role?: 'advertiser' | 'publisher') => Promise<{ user: User, token: string } | void>;
  logout: () => void;
  checkAuthStatus: () => void;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const checkAuthStatus = () => {
    setIsLoading(true);
    try {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      if (storedToken && storedUser) {
        const decodedToken = jwtDecode<DecodedToken>(storedToken);
        if (decodedToken.exp * 1000 > Date.now()) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        } else {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setUser(null);
          setToken(null);
        }
      } else {
        setUser(null);
        setToken(null);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
      setToken(null);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string) => {
    if (!API_BASE_URL) throw new Error("API URL not configured.");
    setIsLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/sessions`, { email, password });
      const { token: apiToken, user: apiUser } = res.data;

      localStorage.setItem('token', apiToken);
      localStorage.setItem('user', JSON.stringify(apiUser));
      setToken(apiToken);
      setUser(apiUser);
      setIsLoading(false);
      return { user: apiUser, token: apiToken };
    } catch (error) {
      console.error('Login failed:', error);
      setIsLoading(false);
      throw error;
    }
  };

  const signup = async (email: string, password: string, passwordConfirmation: string, name: string, role: 'advertiser' | 'publisher') => {
    if (!API_BASE_URL) throw new Error("API URL not configured.");
    setIsLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/signup`, { 
        email, 
        password, 
        password_confirmation: passwordConfirmation, 
        name, 
        role 
      });
      const { token: apiToken, user: apiUser } = res.data;
      
      if (apiToken && apiUser) {
        localStorage.setItem('token', apiToken);
        localStorage.setItem('user', JSON.stringify(apiUser));
        setToken(apiToken);
        setUser(apiUser);
      }
      setIsLoading(false);
      return { user: apiUser, token: apiToken }; 
    } catch (error) {
      console.error('Signup failed:', error);
      setIsLoading(false);
      throw error;
    }
  };

  const handleGoogleLogin = async (credentialResponse: any, roleParam?: 'advertiser' | 'publisher') => {
    if (!API_BASE_URL) throw new Error("API URL not configured.");
    setIsLoading(true);
    try {
      const idToken = credentialResponse.credential;
      const requestBody: { id_token: string; role?: 'advertiser' | 'publisher' } = { id_token: idToken };
      if (roleParam) {
        requestBody.role = roleParam;
      }

      const res = await axios.post(`${API_BASE_URL}/auth/google`, requestBody);
      const { token: apiToken, user: apiUser } = res.data;

      localStorage.setItem('token', apiToken);
      localStorage.setItem('user', JSON.stringify(apiUser));
      setToken(apiToken);
      setUser(apiUser);
      setIsLoading(false);
      return { user: apiUser, token: apiToken };
    } catch (err) {
      console.error('Google Login/Signup failed:', err);
      setIsLoading(false);
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login'); 
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        isLoading,
        login,
        signup,
        handleGoogleLogin,
        logout,
        checkAuthStatus
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
