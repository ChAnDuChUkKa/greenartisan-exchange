
import { Product, User, Order, CategoryData, SalesData } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'buyer@example.com',
    name: 'Alex Johnson',
    role: 'buyer',
    createdAt: new Date('2023-01-15'),
    avatar: 'https://i.pravatar.cc/150?img=11'
  },
  {
    id: '2',
    email: 'seller@example.com',
    name: 'Green Earth Crafts',
    role: 'seller',
    createdAt: new Date('2022-11-20'),
    avatar: 'https://i.pravatar.cc/150?img=12'
  }
];

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Bamboo Cutlery Set',
    description: 'Handcrafted bamboo cutlery set including fork, knife, spoon, and carrying case. Perfect for on-the-go and reducing plastic waste.',
    price: 18.99,
    imageUrl: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&q=80&w=500',
    category: 'Kitchen',
    tags: ['bamboo', 'zero waste', 'kitchenware'],
    sellerId: '2',
    sellerName: 'Green Earth Crafts',
    stock: 45,
    rating: 4.7,
    reviewCount: 58,
    createdAt: new Date('2023-02-10'),
    sustainabilityFeatures: ['Biodegradable', 'Renewable resource', 'Plastic-free'],
    materials: ['Organic bamboo'],
    featured: true
  },
  {
    id: '2',
    name: 'Organic Cotton Tote Bag',
    description: 'Durable tote bag made from 100% organic cotton. Naturally dyed with plant-based colors.',
    price: 22.50,
    imageUrl: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&q=80&w=500',
    category: 'Bags',
    tags: ['cotton', 'organic', 'bag'],
    sellerId: '2',
    sellerName: 'Green Earth Crafts',
    stock: 32,
    rating: 4.5,
    reviewCount: 42,
    createdAt: new Date('2023-02-15'),
    sustainabilityFeatures: ['Organic', 'Reusable', 'Natural dyes'],
    materials: ['Organic cotton'],
    featured: true
  },
  {
    id: '3',
    name: 'Beeswax Food Wraps (Set of 3)',
    description: 'Reusable food wraps made from organic cotton infused with beeswax, jojoba oil, and tree resin. A sustainable alternative to plastic wrap.',
    price: 16.95,
    imageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=500',
    category: 'Kitchen',
    tags: ['beeswax', 'reusable', 'kitchen'],
    sellerId: '2',
    sellerName: 'Green Earth Crafts',
    stock: 25,
    rating: 4.8,
    reviewCount: 36,
    createdAt: new Date('2023-03-01'),
    sustainabilityFeatures: ['Reusable', 'Biodegradable', 'Plastic-free'],
    materials: ['Organic cotton', 'Beeswax', 'Jojoba oil', 'Tree resin'],
    featured: false
  },
  {
    id: '4',
    name: 'Hemp Face Mask with Filters',
    description: 'Breathable, durable face mask made from organic hemp fabric with pocket for replaceable filters.',
    price: 14.99,
    imageUrl: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=500',
    category: 'Personal Care',
    tags: ['hemp', 'face mask', 'personal care'],
    sellerId: '2',
    sellerName: 'Green Earth Crafts',
    stock: 38,
    rating: 4.6,
    reviewCount: 29,
    createdAt: new Date('2023-03-10'),
    sustainabilityFeatures: ['Washable', 'Reusable', 'Eco-friendly'],
    materials: ['Organic hemp', 'Organic cotton'],
    featured: false
  },
  {
    id: '5',
    name: 'Recycled Glass Plant Terrarium',
    description: 'Beautiful handcrafted terrarium made from recycled glass. Perfect for small plants and succulents.',
    price: 39.50,
    imageUrl: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&q=80&w=500',
    category: 'Home Decor',
    tags: ['recycled', 'glass', 'home decor'],
    sellerId: '2',
    sellerName: 'Green Earth Crafts',
    stock: 15,
    rating: 4.9,
    reviewCount: 22,
    createdAt: new Date('2023-03-20'),
    sustainabilityFeatures: ['Recycled materials', 'Handmade', 'Long-lasting'],
    materials: ['Recycled glass'],
    featured: true
  }
];

export const mockOrders: Order[] = [
  {
    id: '1',
    userId: '1',
    items: [
      {
        product: mockProducts[0],
        quantity: 1,
        priceAtPurchase: 18.99
      },
      {
        product: mockProducts[2],
        quantity: 2,
        priceAtPurchase: 16.95
      }
    ],
    status: 'delivered',
    totalAmount: 52.89,
    createdAt: new Date('2023-04-15'),
    shippingAddress: {
      street: '123 Green St',
      city: 'Ecoville',
      state: 'CA',
      postalCode: '90210',
      country: 'USA'
    },
    paymentMethod: 'Credit Card'
  },
  {
    id: '2',
    userId: '1',
    items: [
      {
        product: mockProducts[1],
        quantity: 1,
        priceAtPurchase: 22.50
      }
    ],
    status: 'shipped',
    totalAmount: 22.50,
    createdAt: new Date('2023-05-20'),
    shippingAddress: {
      street: '123 Green St',
      city: 'Ecoville',
      state: 'CA',
      postalCode: '90210',
      country: 'USA'
    },
    paymentMethod: 'PayPal'
  }
];

export const mockCategoryData: CategoryData[] = [
  { name: 'Kitchen', count: 2 },
  { name: 'Bags', count: 1 },
  { name: 'Personal Care', count: 1 },
  { name: 'Home Decor', count: 1 }
];

export const mockSalesData: SalesData[] = [
  { date: 'Jan', amount: 0 },
  { date: 'Feb', amount: 120 },
  { date: 'Mar', amount: 320 },
  { date: 'Apr', amount: 450 },
  { date: 'May', amount: 350 },
  { date: 'Jun', amount: 600 }
];

export const mockCartItems = [
  {
    productId: '1',
    quantity: 1,
    product: mockProducts[0]
  }
];
