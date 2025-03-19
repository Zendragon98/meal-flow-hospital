
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useOrder } from '@/contexts/OrderContext';
import { SCHEDULED_ORDERS } from '@/lib/constants';

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems, meals } = useOrder();

  // Calculate cart count
  const cartCount = Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);
  
  // Navigation links
  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'Menu', path: '/menu' },
    { title: 'Save More', path: '/save-more' },
    { title: 'Order Scheduled', path: '/order-scheduled', badge: SCHEDULED_ORDERS.length },
    { title: 'Account', path: '/account' },
    { title: 'Cart', path: '/cart', badge: cartCount > 0 ? cartCount : null }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm animate-fade-in">
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 animate-hover">
          <img src="/KCKLogo.svg" alt="KCK Food" className="h-10 w-auto" />
          <span className="font-medium text-lg hidden sm:inline-block">KCK Food</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`relative px-1 py-2 text-sm font-medium transition-colors animate-hover 
                ${location.pathname === link.path 
                  ? 'text-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary after:content-[""]' 
                  : 'text-gray-600 hover:text-gray-900'}`}
            >
              {link.title}
              {link.badge && (
                <span className="absolute -top-1 -right-3 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                  {link.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden" 
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-md shadow-elegant z-50 animate-slide-in border-b border-slate-200">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-3 text-base font-medium transition-colors rounded-md animate-hover 
                  ${location.pathname === link.path 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.title}
                {link.badge && (
                  <span className="absolute top-1/2 right-4 -translate-y-1/2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
