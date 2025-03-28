
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { mockProducts } from '../data/mockData';
import { Product } from '../types';
import { Button } from '@/components/ui/button';
import { useCart } from '../contexts/CartContext';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Star, ShoppingCart, Heart, MinusCircle, PlusCircle, Package, RefreshCw, ArrowLeft, Check } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState('');
  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, this would be an API call to get product details
    const foundProduct = mockProducts.find(p => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedImage(foundProduct.imageUrl);
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  const updateQuantity = (newQuantity: number) => {
    if (newQuantity >= 1 && product && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const addToWishlist = () => {
    toast({
      title: "Added to wishlist",
      description: `${product?.name} has been added to your wishlist`,
    });
  };

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-xl">Product not found</p>
          <Link 
            to="/products" 
            className="inline-flex items-center mt-4 text-eco-green-dark hover:text-eco-green-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Products
          </Link>
        </div>
      </Layout>
    );
  }

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          size={16}
          className={`${
            i < Math.floor(rating) 
              ? 'text-yellow-400 fill-yellow-400' 
              : i < rating 
                ? 'text-yellow-400 fill-yellow-400 opacity-50' 
                : 'text-gray-300'
          }`}
        />
      ));
  };

  // Additional images for the gallery (in a real app, these would come from the API)
  const additionalImages = [
    product.imageUrl,
    'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&q=80&w=500',
    'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=500',
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-4">
          <Link 
            to="/products" 
            className="inline-flex items-center text-eco-green-dark hover:text-eco-green-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Products
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div>
            <div className="bg-white rounded-lg overflow-hidden border border-eco-green-light mb-4 h-96">
              <img 
                src={selectedImage} 
                alt={product.name} 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {additionalImages.map((img, idx) => (
                <div 
                  key={idx}
                  className={`border cursor-pointer rounded-md overflow-hidden h-24 ${
                    selectedImage === img ? 'border-eco-green-dark' : 'border-gray-200'
                  }`}
                  onClick={() => setSelectedImage(img)}
                >
                  <img 
                    src={img} 
                    alt={`Product view ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-2xl font-bold text-eco-charcoal mb-2">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex mr-2">
                {renderStars(product.rating)}
              </div>
              <span className="text-sm text-gray-500">
                {product.rating.toFixed(1)} ({product.reviewCount} reviews)
              </span>
            </div>
            
            <div className="text-2xl font-bold text-eco-green-dark mb-4">
              ${product.price.toFixed(2)}
            </div>
            
            <div className="mb-6">
              <p className="text-gray-700">{product.description}</p>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-2">Sustainable Features:</h3>
              <div className="flex flex-wrap gap-2">
                {product.sustainabilityFeatures.map((feature, idx) => (
                  <span 
                    key={idx}
                    className="bg-eco-green-light text-eco-green-dark px-3 py-1 rounded-full text-sm flex items-center"
                  >
                    <Check className="h-3 w-3 mr-1" />
                    {feature}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-2">Materials:</h3>
              <div className="flex flex-wrap gap-2">
                {product.materials.map((material, idx) => (
                  <span 
                    key={idx}
                    className="bg-eco-brown-light text-eco-brown-dark px-3 py-1 rounded-full text-sm"
                  >
                    {material}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex items-center mb-6">
              <div className="mr-4">
                <span className="font-medium block mb-1">Quantity:</span>
                <div className="flex items-center border border-eco-brown-light rounded-md">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => updateQuantity(quantity - 1)}
                    disabled={quantity <= 1}
                    className="text-eco-green-dark hover:text-eco-green-medium h-10"
                  >
                    <MinusCircle size={18} />
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => updateQuantity(quantity + 1)}
                    disabled={quantity >= product.stock}
                    className="text-eco-green-dark hover:text-eco-green-medium h-10"
                  >
                    <PlusCircle size={18} />
                  </Button>
                </div>
              </div>
              <div className="text-sm">
                <span className={`block ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                  {product.stock > 0 
                    ? product.stock > 10 
                      ? 'In Stock' 
                      : `Only ${product.stock} left!` 
                    : 'Out of Stock'}
                </span>
                <span className="text-gray-500">
                  {product.stock > 0 ? 'Usually ships within 1-2 business days' : ''}
                </span>
              </div>
            </div>
            
            <div className="flex space-x-4 mb-8">
              <Button 
                onClick={handleAddToCart}
                className="flex-1 bg-eco-green-dark hover:bg-eco-green-medium"
                disabled={product.stock <= 0}
              >
                <ShoppingCart className="h-5 w-5 mr-1" /> Add to Cart
              </Button>
              <Button 
                variant="outline" 
                className="border-eco-brown-medium text-eco-brown-dark hover:bg-eco-brown-light"
                onClick={addToWishlist}
              >
                <Heart className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="space-y-3 text-sm border-t border-eco-green-light pt-6">
              <div className="flex items-center">
                <Package className="h-5 w-5 text-eco-green-dark mr-2" />
                <span>Free shipping on orders over $50</span>
              </div>
              <div className="flex items-center">
                <RefreshCw className="h-5 w-5 text-eco-green-dark mr-2" />
                <span>30-day easy returns</span>
              </div>
              <div className="flex items-center">
                <div className="h-5 w-5 flex items-center justify-center mr-2">
                  <img 
                    src="https://cdn-icons-png.flaticon.com/512/7218/7218740.png" 
                    alt="Carbon neutral" 
                    className="h-4 w-4"
                  />
                </div>
                <span>Carbon-neutral shipping</span>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information Tabs */}
        <div className="mb-12">
          <Tabs defaultValue="details">
            <TabsList className="w-full border-b border-eco-green-light">
              <TabsTrigger value="details" className="text-base">Details</TabsTrigger>
              <TabsTrigger value="sustainability" className="text-base">Sustainability</TabsTrigger>
              <TabsTrigger value="reviews" className="text-base">Reviews</TabsTrigger>
              <TabsTrigger value="shipping" className="text-base">Shipping</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="pt-4">
              <div className="max-w-3xl mx-auto space-y-4">
                <h3 className="text-lg font-semibold">Product Details</h3>
                <p>{product.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <h4 className="font-medium">Features</h4>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>Handcrafted with care</li>
                      <li>Made from sustainable materials</li>
                      <li>Designed to last for years</li>
                      <li>Plastic-free packaging</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium">Specifications</h4>
                    <ul className="mt-2 space-y-1">
                      <li><span className="font-medium">Materials:</span> {product.materials.join(', ')}</li>
                      <li><span className="font-medium">Dimensions:</span> Varies by product</li>
                      <li><span className="font-medium">Weight:</span> Varies by product</li>
                      <li><span className="font-medium">Care:</span> Hand wash recommended</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="sustainability" className="pt-4">
              <div className="max-w-3xl mx-auto space-y-4">
                <h3 className="text-lg font-semibold">Our Sustainability Commitment</h3>
                <p>
                  This product is part of our commitment to create a more sustainable future. 
                  Here's how this particular item contributes to environmental stewardship:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                  <div className="bg-eco-green-light p-4 rounded-lg">
                    <h4 className="font-medium text-eco-green-dark mb-2">Environmental Impact</h4>
                    <ul className="space-y-2">
                      {product.sustainabilityFeatures.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <Check className="h-5 w-5 text-eco-green-dark mr-2 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Artisan Story</h4>
                    <p className="mb-4">
                      Each {product.name} is carefully crafted by skilled artisans who are paid fair wages 
                      and work in safe conditions. By purchasing this product, you're supporting traditional 
                      craftsmanship and sustainable livelihoods.
                    </p>
                    <h4 className="font-medium mb-2">End-of-Life</h4>
                    <p>
                      This product is designed to be biodegradable or recyclable at the end of its useful life, 
                      minimizing waste and environmental impact. We provide guidelines for proper disposal or 
                      recycling with each purchase.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="pt-4">
              <div className="max-w-3xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Customer Reviews</h3>
                  <Button className="bg-eco-green-dark hover:bg-eco-green-medium">Write a Review</Button>
                </div>
                
                <div className="flex items-center mb-6">
                  <div className="mr-4">
                    <span className="text-3xl font-bold">{product.rating.toFixed(1)}</span>
                    <div className="flex">
                      {renderStars(product.rating)}
                    </div>
                    <span className="text-sm text-gray-500">Based on {product.reviewCount} reviews</span>
                  </div>
                  <div className="flex-1 max-w-md">
                    {/* Rating distribution bars */}
                    {[5, 4, 3, 2, 1].map((star) => (
                      <div key={star} className="flex items-center mb-1">
                        <span className="text-sm w-8">{star} stars</span>
                        <div className="flex-1 h-2 mx-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-yellow-400 rounded-full"
                            style={{ 
                              width: `${
                                star === 5 ? 70 : 
                                star === 4 ? 20 : 
                                star === 3 ? 7 : 
                                star === 2 ? 2 : 1
                              }%` 
                            }}
                          ></div>
                        </div>
                        <span className="text-sm w-8 text-right">
                          {star === 5 ? 70 : 
                           star === 4 ? 20 : 
                           star === 3 ? 7 : 
                           star === 2 ? 2 : 1}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sample reviews */}
                <div className="space-y-6">
                  <div className="border-b border-eco-green-light pb-4">
                    <div className="flex items-center mb-2">
                      <span className="font-medium mr-2">Emily R.</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-500">2 weeks ago</span>
                    </div>
                    <p className="text-gray-700">
                      Absolutely love this product! It's exactly as described and the quality is exceptional.
                      I appreciate that it's made sustainably and the craftsmanship is evident.
                    </p>
                  </div>
                  
                  <div className="border-b border-eco-green-light pb-4">
                    <div className="flex items-center mb-2">
                      <span className="font-medium mr-2">James T.</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} className={i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-500">1 month ago</span>
                    </div>
                    <p className="text-gray-700">
                      Great product that lives up to its eco-friendly claims. Shipping was slower than expected
                      but the quality makes up for the wait. Would recommend.
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-2">
                      <span className="font-medium mr-2">Sophia L.</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} className={i < 5 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-500">2 months ago</span>
                    </div>
                    <p className="text-gray-700">
                      I've tried several sustainable products and this is by far the best quality I've found.
                      Beautiful design, functional, and truly sustainable. Well worth the investment.
                    </p>
                  </div>
                </div>
                
                <div className="mt-8 text-center">
                  <Button variant="outline" className="border-eco-green-light">
                    View All Reviews
                  </Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="shipping" className="pt-4">
              <div className="max-w-3xl mx-auto space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Shipping Information</h3>
                  <p>
                    We're committed to minimizing the environmental impact of our shipping process while
                    ensuring your order arrives safely and in a timely manner.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Shipping Options</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-eco-green-dark mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium">Standard Shipping:</span> 5-7 business days, $4.95
                        (Free on orders over $50)
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-eco-green-dark mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium">Express Shipping:</span> 2-3 business days, $9.95
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Eco-Friendly Packaging</h4>
                  <p className="mb-4">
                    All orders are shipped in plastic-free, recyclable or biodegradable packaging materials.
                    We use:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Recycled cardboard boxes</li>
                    <li>Paper tape</li>
                    <li>Biodegradable packing peanuts</li>
                    <li>Reused packaging materials when possible</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Carbon-Neutral Shipping</h4>
                  <p>
                    We calculate the carbon footprint of each shipment and purchase carbon offsets to
                    ensure your delivery is carbon-neutral. These offsets support verified climate action
                    projects around the world.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Returns & Exchanges</h4>
                  <p>
                    We accept returns within 30 days of delivery. Items must be in original condition
                    with all packaging. Return shipping is free for exchanges or store credit.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <div>
          <h2 className="text-2xl font-bold text-eco-charcoal mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockProducts
              .filter(p => p.id !== product.id && p.category === product.category)
              .slice(0, 4)
              .map(relatedProduct => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
