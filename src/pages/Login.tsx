
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const user = await login(email, password);
      
      if (user) {
        toast({
          title: "Login successful!",
          description: `Welcome back, ${user.name}!`,
        });
        
        if (user.role === 'seller') {
          navigate('/seller-dashboard');
        } else {
          navigate('/products');
        }
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // For demo - helper to log in as buyer or seller quickly
  const loginAsDemoUser = async (role: 'buyer' | 'seller') => {
    setIsLoading(true);
    const email = role === 'buyer' ? 'buyer@example.com' : 'seller@example.com';
    const password = 'password';
    
    try {
      const user = await login(email, password);
      
      if (user) {
        toast({
          title: "Demo login successful!",
          description: `You're now logged in as a demo ${role}.`,
        });
        
        if (user.role === 'seller') {
          navigate('/seller-dashboard');
        } else {
          navigate('/products');
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log in with demo account.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto my-12 px-4">
        <div className="bg-white rounded-lg shadow-md p-6 border border-eco-green-light">
          <h1 className="text-2xl font-bold text-center mb-6 text-eco-green-dark">Log In</h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="eco-input"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="password">Password</Label>
                <Link 
                  to="/forgot-password" 
                  className="text-sm text-eco-green-dark hover:text-eco-green-medium"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="eco-input"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-eco-green-dark hover:bg-eco-green-medium"
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              {isLoading ? 'Logging in...' : 'Log In'}
            </Button>
          </form>
          
          <div className="mt-6">
            <p className="text-center text-gray-600 mb-4">
              Don't have an account?{' '}
              <Link to="/register" className="text-eco-green-dark hover:text-eco-green-medium">
                Sign up
              </Link>
            </p>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-eco-brown-light"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">
                  Or try demo accounts
                </span>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-4">
              <Button
                type="button"
                variant="outline"
                className="border-eco-green-light"
                onClick={() => loginAsDemoUser('buyer')}
                disabled={isLoading}
              >
                Demo as Buyer
              </Button>
              <Button
                type="button"
                variant="outline"
                className="border-eco-brown-light"
                onClick={() => loginAsDemoUser('seller')}
                disabled={isLoading}
              >
                Demo as Seller
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
