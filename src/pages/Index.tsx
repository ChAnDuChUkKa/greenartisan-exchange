import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';
import { mockProducts, mockCategoryData } from '../data/mockData';
import { Button } from '@/components/ui/button';
import { ArrowRight, Leaf, RefreshCw, ShieldCheck, Truck, Star } from 'lucide-react';

const Index = () => {
  const featuredProducts = mockProducts.filter(product => product.featured);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-eco-green-light via-eco-blue-light to-eco-green-light py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-eco-green-dark mb-6">
              Sustainable Living, <br />Handcrafted with Care
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8">
              Discover eco-friendly, organic, and sustainable products from verified artisans around the world. Shop consciously, live sustainably.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
              <Button asChild className="bg-eco-green-dark hover:bg-eco-green-medium text-white px-8 py-6 text-lg">
                <Link to="/products">Shop Now</Link>
              </Button>
              <Button asChild variant="outline" className="border-eco-green-dark text-eco-green-dark hover:bg-eco-green-light px-8 py-6 text-lg">
                <Link to="/register">Become a Seller</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-eco-beige">
              <Leaf className="h-12 w-12 text-eco-green-dark mb-4" />
              <h3 className="text-lg font-semibold mb-2">Eco-Friendly</h3>
              <p className="text-gray-700">All products meet our strict sustainability standards and reduce environmental impact.</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-eco-beige">
              <ShieldCheck className="h-12 w-12 text-eco-green-dark mb-4" />
              <h3 className="text-lg font-semibold mb-2">Verified Artisans</h3>
              <p className="text-gray-700">Every seller is vetted to ensure authentic, high-quality sustainable craftsmanship.</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-eco-beige">
              <RefreshCw className="h-12 w-12 text-eco-green-dark mb-4" />
              <h3 className="text-lg font-semibold mb-2">Circular Economy</h3>
              <p className="text-gray-700">We promote products designed for longevity, repair, and eventual recycling.</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-eco-beige">
              <Truck className="h-12 w-12 text-eco-green-dark mb-4" />
              <h3 className="text-lg font-semibold mb-2">Carbon-Neutral</h3>
              <p className="text-gray-700">All shipping emissions are calculated and offset through verified carbon projects.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-eco-beige">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-eco-charcoal">Featured Products</h2>
            <Link 
              to="/products" 
              className="text-eco-green-dark hover:text-eco-green-medium inline-flex items-center"
            >
              View all <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-eco-charcoal text-center mb-12">Shop by Category</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {mockCategoryData.map((category, index) => (
              <Link 
                key={index}
                to={`/products?category=${category.name}`} 
                className="group"
              >
                <div className="relative h-40 md:h-64 rounded-lg overflow-hidden">
                  <img 
                    src={`https://source.unsplash.com/random/300x400/?${category.name.toLowerCase()},eco`} 
                    alt={category.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-eco-charcoal to-transparent opacity-60"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="text-lg font-semibold">{category.name}</h3>
                    <p className="text-sm">{category.count} products</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-eco-green-light">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-eco-charcoal text-center mb-12">
            What Our Community Says
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "I love that I can shop with confidence knowing everything meets rigorous sustainability standards. The bamboo kitchen set I purchased is beautiful and functional!"
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                  <img 
                    src="https://i.pravatar.cc/150?img=23" 
                    alt="Sarah L." 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">Sarah L.</p>
                  <p className="text-sm text-gray-500">Verified Buyer</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "As a seller, I appreciate how the platform connects me with customers who value sustainability. The seller dashboard makes it easy to track my eco-friendly product line."
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                  <img 
                    src="https://i.pravatar.cc/150?img=32" 
                    alt="Michael T." 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">Michael T.</p>
                  <p className="text-sm text-gray-500">Artisan Seller</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className={i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "The transparency about materials and production processes helps me make informed choices. I've discovered so many innovative sustainable products here!"
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                  <img 
                    src="https://i.pravatar.cc/150?img=44" 
                    alt="Jamie K." 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">Jamie K.</p>
                  <p className="text-sm text-gray-500">Verified Buyer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-eco-brown-light">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-eco-charcoal mb-6">
            Join Our Sustainable Marketplace Today
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
            Whether you're a buyer seeking eco-friendly products or an artisan with sustainable creations, become part of our community today.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
            <Button asChild className="bg-eco-green-dark hover:bg-eco-green-medium text-white px-8 py-6 text-lg">
              <Link to="/products">Start Shopping</Link>
            </Button>
            <Button asChild variant="outline" className="border-eco-green-dark text-eco-green-dark hover:bg-eco-green-light px-8 py-6 text-lg">
              <Link to="/register">Become a Seller</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
