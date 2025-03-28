
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Product } from '../types';
import { mockCartItems } from '../data/mockData';
import { useToast } from "@/components/ui/use-toast";

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  // Load cart items from localStorage on initial render
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch (error) {
        console.error('Failed to parse stored cart:', error);
        localStorage.removeItem('cart');
      }
    } else {
      // For demo purposes, pre-populate with mock data
      setCartItems(mockCartItems);
    }
  }, []);

  // Update localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product, quantity: number) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.productId === product.id);
      
      if (existingItem) {
        // If item exists, update quantity
        const updatedItems = prevItems.map(item => 
          item.productId === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
        
        toast({
          title: "Cart updated",
          description: `${product.name} quantity increased to ${existingItem.quantity + quantity}`,
        });
        
        return updatedItems;
      } else {
        // If item doesn't exist, add it
        toast({
          title: "Added to cart",
          description: `${product.name} added to your cart`,
        });
        
        return [...prevItems, { productId: product.id, quantity, product }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prevItems => {
      const itemToRemove = prevItems.find(item => item.productId === productId);
      
      if (itemToRemove) {
        toast({
          title: "Item removed",
          description: `${itemToRemove.product.name} removed from your cart`,
        });
      }
      
      return prevItems.filter(item => item.productId !== productId);
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.productId === productId 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
    });
  };

  // Calculate total number of items in cart
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (total, item) => total + (item.product.price * item.quantity), 
    0
  );

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    subtotal
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
