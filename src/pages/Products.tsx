
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';
import { mockProducts, mockCategoryData } from '../data/mockData';
import { Product } from '../types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  ChevronDown, 
  ChevronUp, 
  SlidersHorizontal, 
  X, 
  Search 
} from 'lucide-react';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    priceRange: [0, 100],
    sustainabilityFeatures: [] as string[],
    searchQuery: searchParams.get('search') || '',
    sortBy: 'featured',
  });
  
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    sustainability: true,
  });

  // Unique sustainability features
  const allSustainabilityFeatures = Array.from(
    new Set(
      mockProducts.flatMap(product => product.sustainabilityFeatures)
    )
  );

  useEffect(() => {
    // In a real app, this would be an API call with filter params
    setProducts(mockProducts);
  }, []);

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const searchParam = searchParams.get('search');
    
    if (categoryParam || searchParam) {
      setFilters(prev => ({
        ...prev,
        category: categoryParam || prev.category,
        searchQuery: searchParam || prev.searchQuery,
      }));
    }
  }, [searchParams]);

  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, products]);

  const applyFilters = () => {
    let result = [...products];
    
    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(
        product => 
          product.name.toLowerCase().includes(query) || 
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Filter by category
    if (filters.category) {
      result = result.filter(product => product.category === filters.category);
    }
    
    // Filter by price range
    result = result.filter(
      product => 
        product.price >= filters.priceRange[0] && 
        product.price <= filters.priceRange[1]
    );
    
    // Filter by sustainability features
    if (filters.sustainabilityFeatures.length > 0) {
      result = result.filter(product => 
        filters.sustainabilityFeatures.some(feature => 
          product.sustainabilityFeatures.includes(feature)
        )
      );
    }
    
    // Sort products
    switch (filters.sortBy) {
      case 'price-low-high':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }
    
    setFilteredProducts(result);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters(prev => ({ ...prev, searchQuery: (e.target as HTMLFormElement).search.value }));
  };

  const handleCategoryChange = (category: string) => {
    setFilters(prev => ({ ...prev, category }));
  };

  const handlePriceChange = (value: number[]) => {
    setFilters(prev => ({ ...prev, priceRange: value }));
  };

  const handleSustainabilityChange = (feature: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      sustainabilityFeatures: checked
        ? [...prev.sustainabilityFeatures, feature]
        : prev.sustainabilityFeatures.filter(f => f !== feature),
    }));
  };

  const handleSortChange = (value: string) => {
    setFilters(prev => ({ ...prev, sortBy: value }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      priceRange: [0, 100],
      sustainabilityFeatures: [],
      searchQuery: '',
      sortBy: 'featured',
    });
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const maxPrice = Math.max(...products.map(product => product.price), 100);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-eco-charcoal mb-2">
            Sustainable Products
          </h1>
          <p className="text-gray-600">
            Shop our curated collection of eco-friendly, sustainable, and handcrafted products.
          </p>
        </div>

        {/* Mobile filter toggle */}
        <div className="lg:hidden mb-4">
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center"
            onClick={() => setIsFiltersVisible(!isFiltersVisible)}
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            {isFiltersVisible ? 'Hide Filters' : 'Show Filters'}
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`w-full lg:w-1/4 ${isFiltersVisible ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-eco-green-light">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Filters</h2>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearFilters}
                  className="text-eco-green-dark hover:text-eco-green-medium hover:bg-transparent p-0"
                >
                  Clear All
                </Button>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <div 
                  className="flex justify-between items-center cursor-pointer mb-2"
                  onClick={() => toggleSection('categories')}
                >
                  <h3 className="font-medium">Categories</h3>
                  {expandedSections.categories ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </div>
                
                {expandedSections.categories && (
                  <div className="space-y-2">
                    <div 
                      className={`cursor-pointer ${filters.category === '' ? 'text-eco-green-dark font-medium' : ''}`}
                      onClick={() => handleCategoryChange('')}
                    >
                      All Categories
                    </div>
                    {mockCategoryData.map((category, idx) => (
                      <div 
                        key={idx} 
                        className={`cursor-pointer flex justify-between ${
                          filters.category === category.name ? 'text-eco-green-dark font-medium' : ''
                        }`}
                        onClick={() => handleCategoryChange(category.name)}
                      >
                        <span>{category.name}</span>
                        <span className="text-gray-500 text-sm">({category.count})</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <div 
                  className="flex justify-between items-center cursor-pointer mb-2"
                  onClick={() => toggleSection('price')}
                >
                  <h3 className="font-medium">Price Range</h3>
                  {expandedSections.price ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </div>
                
                {expandedSections.price && (
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>${filters.priceRange[0]}</span>
                      <span>${filters.priceRange[1] === 100 ? maxPrice.toFixed(0) : filters.priceRange[1]}</span>
                    </div>
                    <Slider
                      value={filters.priceRange}
                      min={0}
                      max={100}
                      step={1}
                      onValueChange={handlePriceChange}
                      className="mt-2"
                    />
                  </div>
                )}
              </div>

              {/* Sustainability Features */}
              <div className="mb-6">
                <div 
                  className="flex justify-between items-center cursor-pointer mb-2"
                  onClick={() => toggleSection('sustainability')}
                >
                  <h3 className="font-medium">Sustainability</h3>
                  {expandedSections.sustainability ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </div>
                
                {expandedSections.sustainability && (
                  <div className="space-y-2">
                    {allSustainabilityFeatures.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`feature-${idx}`} 
                          checked={filters.sustainabilityFeatures.includes(feature)}
                          onCheckedChange={(checked) => 
                            handleSustainabilityChange(feature, checked as boolean)
                          }
                        />
                        <Label 
                          htmlFor={`feature-${idx}`}
                          className="cursor-pointer text-sm"
                        >
                          {feature}
                        </Label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="w-full lg:w-3/4">
            {/* Search and Sort Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
              <form onSubmit={handleSearch} className="w-full sm:w-auto relative">
                <Input
                  type="text"
                  name="search"
                  placeholder="Search products..."
                  className="eco-input pr-10 w-full sm:w-64"
                  defaultValue={filters.searchQuery}
                />
                <Button 
                  type="submit" 
                  variant="ghost" 
                  size="sm"
                  className="absolute right-0 top-0 h-full"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </form>
              
              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <Label htmlFor="sort-by" className="whitespace-nowrap">Sort by:</Label>
                <Select
                  value={filters.sortBy}
                  onValueChange={handleSortChange}
                >
                  <SelectTrigger id="sort-by" className="eco-input w-full">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                    <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Active Filters */}
            {(filters.category || filters.searchQuery || filters.sustainabilityFeatures.length > 0) && (
              <div className="flex flex-wrap gap-2 mb-4">
                {filters.category && (
                  <div className="flex items-center bg-eco-green-light text-eco-green-dark px-2 py-1 rounded-full text-sm">
                    <span>Category: {filters.category}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-4 w-4 p-0 ml-1 text-eco-green-dark hover:bg-transparent"
                      onClick={() => handleCategoryChange('')}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                )}
                
                {filters.searchQuery && (
                  <div className="flex items-center bg-eco-green-light text-eco-green-dark px-2 py-1 rounded-full text-sm">
                    <span>Search: {filters.searchQuery}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-4 w-4 p-0 ml-1 text-eco-green-dark hover:bg-transparent"
                      onClick={() => setFilters(prev => ({ ...prev, searchQuery: '' }))}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                )}
                
                {filters.sustainabilityFeatures.map((feature, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center bg-eco-green-light text-eco-green-dark px-2 py-1 rounded-full text-sm"
                  >
                    <span>{feature}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-4 w-4 p-0 ml-1 text-eco-green-dark hover:bg-transparent"
                      onClick={() => handleSustainabilityChange(feature, false)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {/* Products */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-gray-600">No products found matching your criteria.</p>
                <Button 
                  onClick={clearFilters}
                  className="mt-4 bg-eco-green-dark hover:bg-eco-green-medium"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
