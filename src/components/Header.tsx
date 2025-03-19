import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Calendar, Package } from 'lucide-react';
import { useOrder } from '@/contexts/OrderContext';
import { Badge } from '@/components/ui/badge';

const Header = () => {
  const { cartItems } = useOrder();
  
  // Count total items in cart
  const cartItemCount = Object.values(cartItems).reduce((total, qty) => total + qty, 0);
  
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b shadow-sm">
      <div className="container flex items-center justify-between px-4 mx-auto py-2">
        <Link to="/" className="flex items-center">
          <img src="/KCKFoodLogo.svg" alt="KCK Food Logo" className="h-12 w-auto" />
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
            Home
          </Link>
          <Link to="/menu" className="text-sm font-medium transition-colors hover:text-primary">
            Menu
          </Link>
          <Link to="/my-orders" className="text-sm font-medium transition-colors hover:text-primary flex items-center">
            My Orders
            {cartItemCount > 0 && (
              <Badge className="ml-1 bg-primary hover:bg-primary/90">{cartItemCount}</Badge>
            )}
          </Link>
          <Link to="/save-more" className="text-sm font-medium transition-colors hover:text-primary">
            Save More
          </Link>
          <Link to="/order-scheduled" className="text-sm font-medium transition-colors hover:text-primary flex items-center">
            Order Scheduled
            <Badge className="ml-1 bg-red-500 hover:bg-red-600">5</Badge>
          </Link>
          <Link to="/account" className="text-sm font-medium transition-colors hover:text-primary">
            Account
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Link to="/cart" className="relative">
            <ShoppingCart className="w-6 h-6" />
            {cartItemCount > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-primary hover:bg-primary/90 w-5 h-5 flex items-center justify-center p-0 text-[10px]">
                {cartItemCount}
              </Badge>
            )}
          </Link>
          
          <Link to="/my-orders" className="relative md:hidden">
            <Package className="w-6 h-6" />
            {cartItemCount > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-primary hover:bg-primary/90 w-5 h-5 flex items-center justify-center p-0 text-[10px]">
                {cartItemCount}
              </Badge>
            )}
          </Link>
          
          <Link to="/account" className="md:hidden">
            <User className="w-6 h-6" />
          </Link>
          
          <Link to="/order-scheduled" className="relative md:hidden">
            <Calendar className="w-6 h-6" />
            <Badge className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 w-5 h-5 flex items-center justify-center p-0 text-[10px]">
              5
            </Badge>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
