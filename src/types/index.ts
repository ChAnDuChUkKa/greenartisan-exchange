
export type UserRole = 'buyer' | 'seller';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: Date;
  avatar?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  tags: string[];
  sellerId: string;
  sellerName: string;
  stock: number;
  rating: number;
  reviewCount: number;
  createdAt: Date;
  sustainabilityFeatures: string[];
  materials: string[];
  featured: boolean;
}

export interface CartItem {
  productId: string;
  quantity: number;
  product: Product;
}

export interface Order {
  id: string;
  userId: string;
  items: {
    product: Product;
    quantity: number;
    priceAtPurchase: number;
  }[];
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  totalAmount: number;
  createdAt: Date;
  shippingAddress: Address;
  paymentMethod: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface CategoryData {
  name: string;
  count: number;
}

export interface SalesData {
  date: string;
  amount: number;
}
