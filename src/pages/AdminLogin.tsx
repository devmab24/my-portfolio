
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '@/context/AdminContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield } from 'lucide-react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAdmin } = useAdmin();
  const navigate = useNavigate();

  // Check if already logged in
  useEffect(() => {
    if (isAdmin) {
      navigate('/admin/dashboard');
    }
  }, [isAdmin, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      console.log('Submitting login with:', { username, password });
      const success = await login(username, password);
      
      if (success) {
        console.log('Login successful, navigating to dashboard');
        navigate('/admin/dashboard');
      } else {
        console.log('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Don't render the login form if already logged in
  if (isAdmin) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Admin</title>
        <meta name="description" content="Admin page" />
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <NavBar />
        
        <main className="flex-grow pt-24 pb-16 flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader className="space-y-1 text-center">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8" />
              </div>
              <CardTitle className="text-2xl">Admin Login</CardTitle>
              <CardDescription>
                Enter your credentials to access the admin dashboard
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="username" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Username
                  </label>
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    placeholder="Enter your username"
                    autoCapitalize="none"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Password
                  </label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter your password"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </CardFooter>
            </form>
            <div className="p-6 pt-0 text-center text-sm">
              <p className="text-muted-foreground">
                For demo purposes, use:
                <br />
                Username: <strong>admin</strong>
                <br />
                Password: <strong>password</strong>
              </p>
            </div>
          </Card>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default AdminLogin;
