
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          size={14}
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

  const renderSustainabilityFeatures = () => {
    return product.sustainabilityFeatures.slice(0, 2).map((feature, index) => (
      <span 
        key={index} 
        className="bg-eco-green-light text-eco-green-dark text-xs px-2 py-1 rounded-full mr-1 mb-1 inline-block"
      >
        {feature}
      </span>
    ));
  };

  return (
    <div className="eco-card group">
      <Link to={`/products/${product.id}`} className="block">
        {/* Product Image */}
        <div className="relative h-56 overflow-hidden">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {product.featured && (
            <span className="absolute top-2 right-2 bg-eco-green-dark text-white text-xs px-2 py-1 rounded-full">
              Featured
            </span>
          )}
          <button 
            className="absolute top-2 left-2 p-1.5 bg-white rounded-full text-gray-600 hover:text-red-500 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // In a real app, this would toggle wishlist status
              console.log('Added to wishlist:', product.name);
            }}
          >
            <Heart size={18} />
          </button>
        </div>
        
        {/* Product Info */}
        <div className="p-4">
          <div className="text-sm text-eco-green-dark mb-1">{product.category}</div>
          <h3 className="font-medium text-lg mb-1 line-clamp-1">{product.name}</h3>
          
          <div className="flex items-center space-x-1 mb-2">
            <div className="flex items-center">
              {renderStars(product.rating)}
            </div>
            <span className="text-xs text-gray-500">({product.reviewCount})</span>
          </div>
          
          <div className="flex flex-wrap mb-3">
            {renderSustainabilityFeatures()}
            {product.sustainabilityFeatures.length > 2 && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-xs text-eco-green-dark cursor-help">+{product.sustainabilityFeatures.length - 2} more</span>
                  </TooltipTrigger>
                  <TooltipContent className="bg-white p-2 shadow-md rounded-md border border-eco-green-light">
                    <ul>
                      {product.sustainabilityFeatures.slice(2).map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
            <Button 
              size="sm" 
              className="bg-eco-green-dark hover:bg-eco-green-medium"
              onClick={handleAddToCart}
            >
              <ShoppingCart size={16} className="mr-1" /> Add
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
