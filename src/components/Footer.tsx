
import { Link } from 'react-router-dom';
import { Leaf, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-eco-beige text-eco-charcoal pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand and Info Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Leaf className="h-6 w-6 text-eco-green-dark" />
              <div className="flex items-center">
                <span className="text-eco-green-dark font-bold text-xl">GreenArtisan</span>
                <span className="text-eco-brown-dark font-medium text-lg">Exchange</span>
              </div>
            </div>
            <p className="text-sm">
              Connecting conscious consumers with eco-friendly, sustainable, and handcrafted products from verified artisans and sellers.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-eco-charcoal hover:text-eco-green-dark transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" className="text-eco-charcoal hover:text-eco-green-dark transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com" className="text-eco-charcoal hover:text-eco-green-dark transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-eco-charcoal hover:text-eco-green-dark transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-eco-charcoal hover:text-eco-green-dark transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-eco-charcoal hover:text-eco-green-dark transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-eco-charcoal hover:text-eco-green-dark transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-eco-charcoal hover:text-eco-green-dark transition-colors">
                  Sustainability Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products?category=Kitchen" className="text-eco-charcoal hover:text-eco-green-dark transition-colors">
                  Kitchen & Dining
                </Link>
              </li>
              <li>
                <Link to="/products?category=Clothing" className="text-eco-charcoal hover:text-eco-green-dark transition-colors">
                  Organic Clothing
                </Link>
              </li>
              <li>
                <Link to="/products?category=Home" className="text-eco-charcoal hover:text-eco-green-dark transition-colors">
                  Home & Garden
                </Link>
              </li>
              <li>
                <Link to="/products?category=Beauty" className="text-eco-charcoal hover:text-eco-green-dark transition-colors">
                  Natural Beauty
                </Link>
              </li>
              <li>
                <Link to="/products?category=Gifts" className="text-eco-charcoal hover:text-eco-green-dark transition-colors">
                  Sustainable Gifts
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <MapPin size={18} className="mt-1 flex-shrink-0 text-eco-green-dark" />
                <span>123 Green Street, Ecoville, Earth 12345</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={18} className="flex-shrink-0 text-eco-green-dark" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={18} className="flex-shrink-0 text-eco-green-dark" />
                <a href="mailto:hello@greenartisan.com" className="hover:text-eco-green-dark transition-colors">
                  hello@greenartisan.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="border-t border-eco-green-light mt-10 pt-8 pb-4">
          <div className="mx-auto max-w-md">
            <h3 className="text-center font-semibold text-lg mb-4">Join Our Newsletter</h3>
            <p className="text-center text-sm mb-4">
              Subscribe for updates on new sustainable products, artisan stories, and eco-living tips.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 eco-input rounded-r-none"
                required
              />
              <button
                type="submit"
                className="bg-eco-green-dark text-white px-4 py-2 rounded-r-md hover:bg-eco-green-medium transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm mt-8 text-gray-600">
          <p>© {new Date().getFullYear()} GreenArtisan Exchange. All rights reserved.</p>
          <div className="mt-2">
            <Link to="/privacy" className="text-gray-600 hover:text-eco-green-dark transition-colors">
              Privacy Policy
            </Link>{' '}
            ·{' '}
            <Link to="/terms" className="text-gray-600 hover:text-eco-green-dark transition-colors">
              Terms of Service
            </Link>{' '}
            ·{' '}
            <Link to="/sustainability" className="text-gray-600 hover:text-eco-green-dark transition-colors">
              Sustainability Pledge
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
