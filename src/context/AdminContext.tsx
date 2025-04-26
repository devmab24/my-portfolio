
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/hooks/supabase/client';

interface AdminUser {
  id: string;
  username: string;
  password_hash: string;
  created_at: string;
  updated_at: string;
}

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

  // Verify against the admin_users table in Supabase
  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      // Query the admin_users table with a custom query
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('username', username)
        .single();
      
      if (error) {
        console.error('Error fetching admin user:', error);
        toast({
          title: "Login failed",
          description: "Unable to verify credentials",
          variant: "destructive",
        });
        return false;
      }
      
      // Type assertion with safety check
      if (!data) {
        toast({
          title: "Login failed",
          description: "User not found",
          variant: "destructive",
        });
        return false;
      }

      // Verify the data has the expected structure
      const adminUser = data as AdminUser;
      
      // Simple password check (for demo purposes only)
      // In a real app, you'd use proper password hashing
      if (adminUser && adminUser.password_hash === password) {
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
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login failed",
        description: "An unexpected error occurred",
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
