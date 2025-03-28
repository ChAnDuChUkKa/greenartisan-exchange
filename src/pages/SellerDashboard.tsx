
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { mockProducts, mockSalesData, mockCategoryData } from '../data/mockData';
import { Button } from '@/components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { 
  Package, 
  DollarSign, 
  Users, 
  TrendingUp, 
  Plus, 
  FileEdit, 
  Trash2, 
  ShoppingCart, 
  Star, 
  Eye 
} from 'lucide-react';

const SellerDashboard = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  
  // If user is not authenticated or not a seller, redirect to login
  if (!isAuthenticated || (currentUser && currentUser.role !== 'seller')) {
    return <Navigate to="/login" />;
  }

  const COLORS = ['#4A6741', '#A7C4A0', '#6D4C3D', '#C0A58E', '#4C7C93'];

  const totalSales = mockSalesData.reduce((sum, item) => sum + item.amount, 0);
  const totalProducts = mockProducts.length;
  const totalOrders = 28; // Mock data
  
  const recentOrders = [
    { id: 'ORD-001', date: '2023-06-15', customer: 'John D.', items: 2, total: 42.99, status: 'shipped' },
    { id: 'ORD-002', date: '2023-06-14', customer: 'Sarah M.', items: 1, total: 18.95, status: 'delivered' },
    { id: 'ORD-003', date: '2023-06-12', customer: 'Eric T.', items: 3, total: 67.50, status: 'processing' },
    { id: 'ORD-004', date: '2023-06-10', customer: 'Lisa K.', items: 1, total: 22.50, status: 'delivered' },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-eco-charcoal mb-1">Seller Dashboard</h1>
            <p className="text-gray-600">
              Welcome back, {currentUser?.name}! Here's what's happening with your products.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button asChild className="bg-eco-green-dark hover:bg-eco-green-medium">
              <Link to="/seller-dashboard/add-product" className="flex items-center">
                <Plus className="mr-1 h-4 w-4" /> Add New Product
              </Link>
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full border-b border-eco-green-light mb-8">
            <TabsTrigger value="overview" className="text-base">Overview</TabsTrigger>
            <TabsTrigger value="products" className="text-base">Products</TabsTrigger>
            <TabsTrigger value="orders" className="text-base">Orders</TabsTrigger>
            <TabsTrigger value="analytics" className="text-base">Analytics</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
                  <DollarSign className="h-4 w-4 text-eco-green-dark" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${totalSales.toFixed(2)}</div>
                  <p className="text-xs text-gray-500">+12% from last month</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">Products</CardTitle>
                  <Package className="h-4 w-4 text-eco-green-dark" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalProducts}</div>
                  <p className="text-xs text-gray-500">2 new this month</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">Orders</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-eco-green-dark" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalOrders}</div>
                  <p className="text-xs text-gray-500">5 pending fulfillment</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">Customers</CardTitle>
                  <Users className="h-4 w-4 text-eco-green-dark" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">19</div>
                  <p className="text-xs text-gray-500">3 new this month</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Sales Over Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={mockSalesData}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="amount" fill="#4A6741" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Product Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={mockCategoryData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="count"
                        >
                          {mockCategoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-eco-green-light text-left">
                        <th className="py-3 px-4 font-medium">Order ID</th>
                        <th className="py-3 px-4 font-medium">Date</th>
                        <th className="py-3 px-4 font-medium">Customer</th>
                        <th className="py-3 px-4 font-medium">Items</th>
                        <th className="py-3 px-4 font-medium">Total</th>
                        <th className="py-3 px-4 font-medium">Status</th>
                        <th className="py-3 px-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order, index) => (
                        <tr key={index} className="border-b border-eco-green-light hover:bg-eco-green-light/10">
                          <td className="py-3 px-4 font-medium">{order.id}</td>
                          <td className="py-3 px-4">{order.date}</td>
                          <td className="py-3 px-4">{order.customer}</td>
                          <td className="py-3 px-4">{order.items}</td>
                          <td className="py-3 px-4">${order.total.toFixed(2)}</td>
                          <td className="py-3 px-4">
                            <span className={`
                              inline-block rounded-full px-2 py-1 text-xs capitalize
                              ${order.status === 'delivered' ? 'bg-green-100 text-green-800' : 
                                order.status === 'shipped' ? 'bg-blue-100 text-blue-800' : 
                                'bg-yellow-100 text-yellow-800'}
                            `}>
                              {order.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 text-right">
                  <Button variant="outline" asChild className="border-eco-green-dark text-eco-green-dark hover:bg-eco-green-light">
                    <Link to="/seller-dashboard/orders">View All Orders</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Products Tab */}
          <TabsContent value="products">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Your Products</h2>
              <Button asChild className="bg-eco-green-dark hover:bg-eco-green-medium">
                <Link to="/seller-dashboard/add-product" className="flex items-center">
                  <Plus className="mr-1 h-4 w-4" /> Add New Product
                </Link>
              </Button>
            </div>
            
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-eco-green-light text-left">
                        <th className="py-3 px-4 font-medium">Product</th>
                        <th className="py-3 px-4 font-medium">Price</th>
                        <th className="py-3 px-4 font-medium">Stock</th>
                        <th className="py-3 px-4 font-medium">Category</th>
                        <th className="py-3 px-4 font-medium">Rating</th>
                        <th className="py-3 px-4 font-medium">Featured</th>
                        <th className="py-3 px-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockProducts.map((product) => (
                        <tr key={product.id} className="border-b border-eco-green-light hover:bg-eco-green-light/10">
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0 mr-3 rounded-sm overflow-hidden">
                                <img 
                                  src={product.imageUrl} 
                                  alt={product.name} 
                                  className="h-full w-full object-cover" 
                                />
                              </div>
                              <span className="font-medium">{product.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">${product.price.toFixed(2)}</td>
                          <td className="py-3 px-4">
                            <span className={`
                              ${product.stock > 10 ? 'text-green-600' : 
                                product.stock > 0 ? 'text-orange-500' : 'text-red-500'}
                            `}>
                              {product.stock} {product.stock === 1 ? 'unit' : 'units'}
                            </span>
                          </td>
                          <td className="py-3 px-4">{product.category}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              {product.rating.toFixed(1)}
                              <Star className="h-3 w-3 text-yellow-400 fill-yellow-400 ml-1" />
                              <span className="text-gray-500 text-xs ml-1">({product.reviewCount})</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            {product.featured ? (
                              <span className="bg-eco-green-light text-eco-green-dark px-2 py-1 rounded-full text-xs">
                                Featured
                              </span>
                            ) : (
                              <span className="text-gray-500 text-xs">—</span>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-1">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-blue-600">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-amber-600">
                                <FileEdit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Orders Tab */}
          <TabsContent value="orders">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Order Management</h2>
              <Button variant="outline" className="border-eco-green-dark text-eco-green-dark hover:bg-eco-green-light">
                Export Orders
              </Button>
            </div>
            
            <Card>
              <CardContent className="p-4">
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" className="bg-eco-green-dark text-white hover:bg-eco-green-medium">
                      All Orders
                    </Button>
                    <Button variant="outline" className="border-eco-green-light text-gray-700 hover:bg-eco-green-light">
                      Processing
                    </Button>
                    <Button variant="outline" className="border-eco-green-light text-gray-700 hover:bg-eco-green-light">
                      Shipped
                    </Button>
                    <Button variant="outline" className="border-eco-green-light text-gray-700 hover:bg-eco-green-light">
                      Delivered
                    </Button>
                    <Button variant="outline" className="border-eco-green-light text-gray-700 hover:bg-eco-green-light">
                      Cancelled
                    </Button>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-eco-green-light text-left">
                        <th className="py-3 px-4 font-medium">Order ID</th>
                        <th className="py-3 px-4 font-medium">Date</th>
                        <th className="py-3 px-4 font-medium">Customer</th>
                        <th className="py-3 px-4 font-medium">Items</th>
                        <th className="py-3 px-4 font-medium">Total</th>
                        <th className="py-3 px-4 font-medium">Status</th>
                        <th className="py-3 px-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Sample order data, expanded version */}
                      {[...recentOrders, 
                        { id: 'ORD-005', date: '2023-06-08', customer: 'Michael B.', items: 2, total: 44.99, status: 'delivered' },
                        { id: 'ORD-006', date: '2023-06-06', customer: 'Amanda J.', items: 1, total: 39.50, status: 'cancelled' },
                        { id: 'ORD-007', date: '2023-06-05', customer: 'Daniel R.', items: 3, total: 86.75, status: 'delivered' },
                        { id: 'ORD-008', date: '2023-06-03', customer: 'Jessica L.', items: 1, total: 18.99, status: 'delivered' },
                      ].map((order, index) => (
                        <tr key={index} className="border-b border-eco-green-light hover:bg-eco-green-light/10">
                          <td className="py-3 px-4 font-medium">{order.id}</td>
                          <td className="py-3 px-4">{order.date}</td>
                          <td className="py-3 px-4">{order.customer}</td>
                          <td className="py-3 px-4">{order.items}</td>
                          <td className="py-3 px-4">${order.total.toFixed(2)}</td>
                          <td className="py-3 px-4">
                            <span className={`
                              inline-block rounded-full px-2 py-1 text-xs capitalize
                              ${order.status === 'delivered' ? 'bg-green-100 text-green-800' : 
                                order.status === 'shipped' ? 'bg-blue-100 text-blue-800' : 
                                order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                'bg-yellow-100 text-yellow-800'}
                            `}>
                              {order.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-1">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-blue-600">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Analytics & Insights</h2>
              <div className="flex space-x-2">
                <Button variant="outline" className="border-eco-green-dark text-eco-green-dark hover:bg-eco-green-light">
                  Last 30 Days
                </Button>
                <Button variant="outline" className="border-eco-green-light text-gray-700 hover:bg-eco-green-light">
                  Last 90 Days
                </Button>
                <Button variant="outline" className="border-eco-green-light text-gray-700 hover:bg-eco-green-light">
                  Year to Date
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-eco-green-dark" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${totalSales.toFixed(2)}</div>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-xs text-green-500">+12% from previous period</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">Orders</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-eco-green-dark" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalOrders}</div>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-xs text-green-500">+8% from previous period</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                  <Star className="h-4 w-4 text-eco-green-dark" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3.2%</div>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-xs text-green-500">+0.5% from previous period</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">Avg. Order Value</CardTitle>
                  <Package className="h-4 w-4 text-eco-green-dark" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$42.50</div>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-xs text-green-500">+$3.25 from previous period</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Sales Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={mockSalesData}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="amount" fill="#4A6741" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Popular Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={mockCategoryData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="count"
                        >
                          {mockCategoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Top Selling Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-eco-green-light text-left">
                        <th className="py-3 px-4 font-medium">Product</th>
                        <th className="py-3 px-4 font-medium">Price</th>
                        <th className="py-3 px-4 font-medium">Units Sold</th>
                        <th className="py-3 px-4 font-medium">Revenue</th>
                        <th className="py-3 px-4 font-medium">Rating</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Sample top selling products */}
                      {mockProducts.slice(0, 5).map((product, index) => (
                        <tr key={index} className="border-b border-eco-green-light hover:bg-eco-green-light/10">
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0 mr-3 rounded-sm overflow-hidden">
                                <img 
                                  src={product.imageUrl} 
                                  alt={product.name} 
                                  className="h-full w-full object-cover" 
                                />
                              </div>
                              <span className="font-medium">{product.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">${product.price.toFixed(2)}</td>
                          <td className="py-3 px-4">{Math.floor(Math.random() * 50) + 10}</td>
                          <td className="py-3 px-4">
                            ${((Math.floor(Math.random() * 50) + 10) * product.price).toFixed(2)}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              {product.rating.toFixed(1)}
                              <Star className="h-3 w-3 text-yellow-400 fill-yellow-400 ml-1" />
                              <span className="text-gray-500 text-xs ml-1">({product.reviewCount})</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default SellerDashboard;
