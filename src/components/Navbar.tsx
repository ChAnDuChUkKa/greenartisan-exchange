
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { ShoppingCart, Menu, X, User, Package, LogOut, Home, Search } from 'lucide-react';

const Navbar = () => {
  const { currentUser, isAuthenticated, logout } = useAuth();
  const { totalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would navigate to search results
    console.log('Searching for:', searchQuery);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center">
              <span className="text-eco-green-dark font-bold text-xl">GreenArtisan</span>
              <span className="text-eco-brown-dark font-medium text-lg">Exchange</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-eco-green-dark transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-eco-green-dark transition-colors">
              Shop
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-eco-green-dark transition-colors">
              About
            </Link>
            {isAuthenticated && currentUser?.role === 'seller' && (
              <Link to="/seller-dashboard" className="text-gray-700 hover:text-eco-green-dark transition-colors">
                Seller Dashboard
              </Link>
            )}
          </div>

          {/* Search Bar (Desktop) */}
          <form 
            onSubmit={handleSearch}
            className="hidden md:flex items-center relative w-64 xl:w-80"
          >
            <input
              type="text"
              placeholder="Search sustainable products..."
              className="w-full eco-input pr-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              type="submit" 
              className="absolute right-2 text-gray-500 hover:text-eco-green-dark"
            >
              <Search size={18} />
            </button>
          </form>

          {/* User Menu and Cart (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/cart" className="relative p-2">
              <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-eco-green-dark transition-colors" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-eco-green-dark text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="p-0 h-auto hover:bg-transparent">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={currentUser?.avatar} />
                      <AvatarFallback className="bg-eco-green-medium text-white">
                        {currentUser ? getInitials(currentUser.name) : 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/orders" className="cursor-pointer flex items-center">
                      <Package className="mr-2 h-4 w-4" />
                      <span>Orders</span>
                    </Link>
                  </DropdownMenuItem>
                  {currentUser?.role === 'seller' && (
                    <DropdownMenuItem asChild>
                      <Link to="/seller-dashboard" className="cursor-pointer flex items-center">
                        <Home className="mr-2 h-4 w-4" />
                        <span>Seller Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer flex items-center text-red-500">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex space-x-2">
                <Button variant="outline" asChild className="text-eco-green-dark border-eco-green-dark hover:bg-eco-green-light">
                  <Link to="/login">Log in</Link>
                </Button>
                <Button asChild className="bg-eco-green-dark hover:bg-eco-green-medium text-white">
                  <Link to="/register">Sign up</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link to="/cart" className="relative p-1">
              <ShoppingCart className="h-6 w-6 text-gray-700" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-eco-green-dark text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              onClick={toggleMenu}
              className="p-1 rounded-md text-gray-700 hover:text-eco-green-dark focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-2 border-t border-eco-green-light">
            <form 
              onSubmit={handleSearch}
              className="mb-4 flex items-center relative"
            >
              <input
                type="text"
                placeholder="Search sustainable products..."
                className="w-full eco-input pr-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit" 
                className="absolute right-2 text-gray-500 hover:text-eco-green-dark"
              >
                <Search size={18} />
              </button>
            </form>
            
            <div className="space-y-3 pb-3">
              <Link 
                to="/" 
                className="block px-2 py-1 text-gray-700 hover:text-eco-green-dark"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/products" 
                className="block px-2 py-1 text-gray-700 hover:text-eco-green-dark"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </Link>
              <Link 
                to="/about" 
                className="block px-2 py-1 text-gray-700 hover:text-eco-green-dark"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              {isAuthenticated && currentUser?.role === 'seller' && (
                <Link 
                  to="/seller-dashboard" 
                  className="block px-2 py-1 text-gray-700 hover:text-eco-green-dark"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Seller Dashboard
                </Link>
              )}
            </div>

            {/* Mobile Account Links */}
            <div className="pt-3 border-t border-eco-green-light">
              {isAuthenticated ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={currentUser?.avatar} />
                      <AvatarFallback className="bg-eco-green-medium text-white">
                        {currentUser ? getInitials(currentUser.name) : 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{currentUser?.name}</span>
                  </div>
                  <Link 
                    to="/profile" 
                    className="block px-2 py-1 text-gray-700 hover:text-eco-green-dark"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link 
                    to="/orders" 
                    className="block px-2 py-1 text-gray-700 hover:text-eco-green-dark"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-2 py-1 text-red-500 hover:text-red-700"
                  >
                    Log out
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Button variant="outline" asChild className="text-eco-green-dark border-eco-green-dark hover:bg-eco-green-light">
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>Log in</Link>
                  </Button>
                  <Button asChild className="bg-eco-green-dark hover:bg-eco-green-medium text-white">
                    <Link to="/register" onClick={() => setIsMenuOpen(false)}>Sign up</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
