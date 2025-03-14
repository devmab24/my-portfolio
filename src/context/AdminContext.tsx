
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

interface AdminContextType {
  isAdmin: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

interface AdminProviderProps {
  children: React.ReactNode;
}

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check if user is logged in on initial load
  useEffect(() => {
    const storedAdmin = localStorage.getItem('isAdmin');
    if (storedAdmin === 'true') {
      setIsAdmin(true);
    }
  }, []);

  // In a real app, this would verify credentials against a backend
  const login = async (username: string, password: string): Promise<boolean> => {
    // Simple hardcoded credentials for demo purposes
    // In a real app, this would be an API call
    if (username === 'admin' && password === 'password') {
      setIsAdmin(true);
      localStorage.setItem('isAdmin', 'true');
      toast({
        title: "Login successful",
        description: "Welcome to the admin dashboard!",
      });
      return true;
    } else {
      toast({
        title: "Login failed",
        description: "Invalid username or password",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('isAdmin');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    navigate('/admin/login');
  };

  return (
    <AdminContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};
