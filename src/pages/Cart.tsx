
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MinusCircle, PlusCircle, Trash2, ShoppingCart, ArrowLeft, ArrowRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, subtotal } = useCart();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [promoCode, setPromoCode] = useState('');
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  const [discount, setDiscount] = useState(0);
  
  const shippingCost = subtotal >= 50 ? 0 : 4.95;
  const totalAmount = subtotal + shippingCost - discount;

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    const cartItem = cartItems.find(item => item.productId === productId);
    
    if (cartItem && newQuantity > 0 && newQuantity <= cartItem.product.stock) {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
  };

  const handlePromoCode = (e: React.FormEvent) => {
    e.preventDefault();
    setIsApplyingPromo(true);
    
    // Simulate API call to validate promo code
    setTimeout(() => {
      if (promoCode.toUpperCase() === 'ECO20') {
        const discountAmount = subtotal * 0.2;
        setDiscount(discountAmount);
        toast({
          title: "Promo code applied!",
          description: "20% discount has been applied to your order.",
        });
      } else {
        toast({
          title: "Invalid promo code",
          description: "The promo code you entered is invalid or expired.",
          variant: "destructive",
        });
      }
      setIsApplyingPromo(false);
    }, 1000);
  };

  const handleCheckout = () => {
    if (isAuthenticated) {
      // In a real app, this would navigate to the checkout page
      navigate('/checkout');
    } else {
      toast({
        title: "Login required",
        description: "Please login or create an account to checkout.",
      });
      navigate('/login', { state: { returnTo: '/cart' } });
    }
  };

  if (cartItems.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold text-eco-charcoal mb-8">Your Cart</h1>
          
          <div className="bg-white rounded-lg shadow-sm border border-eco-green-light p-8 text-center">
            <div className="flex justify-center mb-4">
              <ShoppingCart className="h-16 w-16 text-gray-400" />
            </div>
            <h2 className="text-xl font-medium mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">
              Looks like you haven't added any sustainable products to your cart yet.
            </p>
            <Button asChild className="bg-eco-green-dark hover:bg-eco-green-medium">
              <Link to="/products">Start Shopping</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-eco-charcoal mb-8">Your Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-eco-green-light overflow-hidden">
              <div className="hidden md:grid md:grid-cols-4 lg:grid-cols-5 gap-4 p-4 bg-eco-green-light text-eco-charcoal font-medium">
                <div className="md:col-span-2 lg:col-span-3">Product</div>
                <div className="text-center">Quantity</div>
                <div className="text-right">Total</div>
              </div>
              
              <div className="divide-y divide-eco-green-light">
                {cartItems.map(item => (
                  <div 
                    key={item.productId} 
                    className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4 items-center"
                  >
                    {/* Product Info */}
                    <div className="md:col-span-2 lg:col-span-3 flex items-center">
                      <div className="h-20 w-20 flex-shrink-0 mr-4 bg-white rounded border border-eco-green-light overflow-hidden">
                        <img 
                          src={item.product.imageUrl} 
                          alt={item.product.name} 
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">
                          <Link 
                            to={`/products/${item.productId}`}
                            className="hover:text-eco-green-dark transition-colors"
                          >
                            {item.product.name}
                          </Link>
                        </h3>
                        <p className="text-gray-500 text-sm">{item.product.category}</p>
                        <p className="font-medium mt-1">${item.product.price.toFixed(2)}</p>
                        <button 
                          onClick={() => handleRemoveItem(item.productId)}
                          className="text-sm text-red-500 hover:text-red-700 flex items-center mt-2 md:hidden"
                        >
                          <Trash2 className="h-4 w-4 mr-1" /> Remove
                        </button>
                      </div>
                    </div>
                    
                    {/* Quantity */}
                    <div className="flex items-center justify-center">
                      <div className="flex items-center border border-eco-brown-light rounded-md">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                          className="text-eco-green-dark hover:text-eco-green-medium h-9"
                        >
                          <MinusCircle size={16} />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stock}
                          className="text-eco-green-dark hover:text-eco-green-medium h-9"
                        >
                          <PlusCircle size={16} />
                        </Button>
                      </div>
                    </div>
                    
                    {/* Price */}
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-right flex-1">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                      <button 
                        onClick={() => handleRemoveItem(item.productId)}
                        className="text-red-500 hover:text-red-700 ml-4 hidden md:block"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-4 flex justify-between bg-eco-beige">
                <Button
                  variant="outline"
                  className="border-eco-green-dark text-eco-green-dark hover:bg-eco-green-light"
                  onClick={clearCart}
                >
                  Clear Cart
                </Button>
                <Button
                  variant="outline"
                  asChild
                  className="border-eco-green-dark text-eco-green-dark hover:bg-eco-green-light"
                >
                  <Link to="/products" className="flex items-center">
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Continue Shopping
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-eco-green-light p-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span className="font-medium">-${discount.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="border-t border-eco-green-light pt-3">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="text-sm text-gray-500 text-right">
                    Tax included
                  </div>
                </div>
              </div>
              
              {/* Promo Code */}
              <form onSubmit={handlePromoCode} className="mb-6">
                <h3 className="font-medium mb-2">Promo Code</h3>
                <div className="flex">
                  <Input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter promo code"
                    className="eco-input rounded-r-none"
                  />
                  <Button 
                    type="submit" 
                    disabled={isApplyingPromo || !promoCode}
                    className="bg-eco-green-dark hover:bg-eco-green-medium rounded-l-none"
                  >
                    Apply
                  </Button>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Try "ECO20" for 20% off
                </div>
              </form>
              
              <Button 
                onClick={handleCheckout}
                className="w-full bg-eco-green-dark hover:bg-eco-green-medium flex items-center justify-center"
              >
                Proceed to Checkout
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
              
              <div className="mt-6 space-y-2 text-sm text-center text-gray-600">
                <p>We accept secure payment methods</p>
                <div className="flex justify-center space-x-2">
                  <img src="https://cdn-icons-png.flaticon.com/128/196/196578.png" alt="Visa" className="h-7" />
                  <img src="https://cdn-icons-png.flaticon.com/128/196/196561.png" alt="Mastercard" className="h-7" />
                  <img src="https://cdn-icons-png.flaticon.com/128/196/196565.png" alt="PayPal" className="h-7" />
                  <img src="https://cdn-icons-png.flaticon.com/128/5968/5968249.png" alt="Apple Pay" className="h-7" />
                </div>
              </div>
            </div>
            
            <div className="mt-6 bg-eco-green-light p-4 rounded-lg text-sm">
              <h3 className="font-medium mb-2">Our Eco-Friendly Promise</h3>
              <ul className="space-y-1">
                <li className="flex items-start">
                  <div className="h-5 w-5 flex items-center justify-center mr-2 flex-shrink-0">
                    <img 
                      src="https://cdn-icons-png.flaticon.com/512/7218/7218740.png" 
                      alt="Carbon neutral" 
                      className="h-4 w-4"
                    />
                  </div>
                  <span>Carbon-neutral shipping on all orders</span>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 flex items-center justify-center mr-2 flex-shrink-0">
                    <img 
                      src="https://cdn-icons-png.flaticon.com/512/3126/3126647.png" 
                      alt="Recyclable" 
                      className="h-4 w-4"
                    />
                  </div>
                  <span>Plastic-free, recyclable packaging</span>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 flex items-center justify-center mr-2 flex-shrink-0">
                    <img 
                      src="https://cdn-icons-png.flaticon.com/512/2454/2454299.png" 
                      alt="Tree" 
                      className="h-4 w-4"
                    />
                  </div>
                  <span>We plant a tree for every order over $75</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
