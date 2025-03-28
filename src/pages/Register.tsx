
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import { UserRole } from '../types';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserRole>('buyer');
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  
  const { register } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const validatePassword = () => {
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return false;
    }
    
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return false;
    }
    
    setPasswordError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePassword()) {
      return;
    }
    
    setIsLoading(true);

    try {
      const user = await register(email, name, password, role);
      
      if (user) {
        toast({
          title: "Registration successful!",
          description: `Welcome to GreenArtisan Exchange, ${user.name}!`,
        });
        
        if (user.role === 'seller') {
          navigate('/seller-dashboard');
        } else {
          navigate('/products');
        }
      } else {
        toast({
          title: "Registration failed",
          description: "Could not create your account. Please try again.",
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

  return (
    <Layout>
      <div className="max-w-md mx-auto my-12 px-4">
        <div className="bg-white rounded-lg shadow-md p-6 border border-eco-green-light">
          <h1 className="text-2xl font-bold text-center mb-6 text-eco-green-dark">Create an Account</h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required
                className="eco-input"
              />
            </div>
            
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
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                required
                className="eco-input"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
                className="eco-input"
              />
              {passwordError && (
                <p className="text-red-500 text-sm mt-1">{passwordError}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">I want to</Label>
              <Select
                value={role}
                onValueChange={(value: UserRole) => setRole(value)}
              >
                <SelectTrigger id="role" className="eco-input">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="buyer">Shop for sustainable products</SelectItem>
                  <SelectItem value="seller">Sell my eco-friendly products</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {role === 'seller' && (
              <div className="p-3 bg-eco-green-light rounded-md text-sm text-eco-charcoal mt-2">
                <p>As a seller, you'll be able to:</p>
                <ul className="list-disc list-inside mt-1">
                  <li>List your sustainable products</li>
                  <li>Reach eco-conscious customers</li>
                  <li>Track sales and manage inventory</li>
                  <li>Build your brand in the green marketplace</li>
                </ul>
              </div>
            )}
            
            <Button 
              type="submit" 
              className="w-full bg-eco-green-dark hover:bg-eco-green-medium"
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>
          
          <div className="mt-6 text-center text-gray-600">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="text-eco-green-dark hover:text-eco-green-medium">
                Log in
              </Link>
            </p>
          </div>
          
          <div className="mt-4 text-xs text-center text-gray-500">
            <p>
              By creating an account, you agree to our{' '}
              <Link to="/terms" className="text-eco-green-dark hover:text-eco-green-medium">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-eco-green-dark hover:text-eco-green-medium">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
