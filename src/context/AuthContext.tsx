'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'VENDOR' | 'CLIENT';
  phone?: string;
  vendorId?: string;
  vendorStatus?: string;
  businessName?: string;
}

interface AuthContextType {
  user: UserSession | null;
  isLoading: boolean;
  login: (userData: UserSession) => void;
  logout: () => void;
  loginAsDemo: (role: 'ADMIN' | 'VENDOR' | 'CLIENT' | 'PENDING_VENDOR') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('ventzivo_user');
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load user session', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (userData: UserSession) => {
    setUser(userData);
    localStorage.setItem('ventzivo_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ventzivo_user');
  };

  const loginAsDemo = (roleType: 'ADMIN' | 'VENDOR' | 'CLIENT' | 'PENDING_VENDOR') => {
    let demoUser: UserSession;

    if (roleType === 'ADMIN') {
      demoUser = {
        id: 'admin-demo-id',
        name: 'VentZivo Administrator',
        email: 'admin@ventzivo.com',
        role: 'ADMIN',
      };
    } else if (roleType === 'VENDOR') {
      demoUser = {
        id: 'vendor-demo-1',
        name: 'Vikramaditya Rathore',
        email: 'grandpalace@ventzivo.com',
        role: 'VENDOR',
        vendorId: 'vendor-grandpalace',
        vendorStatus: 'VERIFIED',
        businessName: 'The Grand Imperial Palace & Resort',
      };
    } else if (roleType === 'PENDING_VENDOR') {
      demoUser = {
        id: 'vendor-demo-2',
        name: 'Manish Patel',
        email: 'apexvisuals@ventzivo.com',
        role: 'VENDOR',
        vendorId: 'vendor-apexvisuals',
        vendorStatus: 'PENDING_APPROVAL',
        businessName: 'Apex Visuals & Drone Studio',
      };
    } else {
      demoUser = {
        id: 'client-demo-1',
        name: 'Aarav Sharma',
        email: 'client@ventzivo.com',
        role: 'CLIENT',
        phone: '+91 98261 11223',
      };
    }

    login(demoUser);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, loginAsDemo }}>
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
