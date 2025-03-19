import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ShoppingCart, 
  Menu, 
  User, 
  Moon, 
  Sun, 
  Home,
  ChefHat
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useOrder } from '@/contexts/OrderContext';

export function Header() {
  const location = useLocation();
  const { cartItems } = useOrder();
  
  // Count total items in cart
  const cartItemCount = Object.values(cartItems).reduce((total, qty) => total + qty, 0);
  
  // Check if current route is active
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <MobileNav />
            </SheetContent>
          </Sheet>
          
          <Link to="/" className="flex items-center space-x-2">
            <ChefHat className="h-6 w-6 text-brand-500" />
            <span className="font-semibold inline-block">Midnight Mealmate</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-5 text-sm ml-6">
            <Link 
              to="/" 
              className={`font-medium transition-colors hover:text-foreground/80 ${isActive('/') ? 'text-foreground' : 'text-foreground/60'}`}
            >
              Home
            </Link>
            <Link 
              to="/menu" 
              className={`font-medium transition-colors hover:text-foreground/80 ${isActive('/menu') ? 'text-foreground' : 'text-foreground/60'}`}
            >
              Menu
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          
          <Link to="/profile">
            <Button variant="ghost" size="icon" className="text-muted-foreground">
              <User className="h-5 w-5" />
              <span className="sr-only">Profile</span>
            </Button>
          </Link>
          
          <Link to="/checkout" className="relative">
            <Button variant="ghost" size="icon" className="text-muted-foreground">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-brand-500 rounded-full">
                  {cartItemCount}
                </span>
              )}
              <span className="sr-only">Cart</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

function MobileNav() {
  return (
    <div className="flex flex-col gap-4 px-2 py-4">
      <Link 
        to="/"
        className="flex items-center gap-2 px-2 py-1 text-muted-foreground hover:text-foreground"
      >
        <Home className="h-4 w-4" />
        <span>Home</span>
      </Link>
      <Link 
        to="/menu"
        className="flex items-center gap-2 px-2 py-1 text-muted-foreground hover:text-foreground"
      >
        <ChefHat className="h-4 w-4" />
        <span>Menu</span>
      </Link>
      <Link 
        to="/profile"
        className="flex items-center gap-2 px-2 py-1 text-muted-foreground hover:text-foreground"
      >
        <User className="h-4 w-4" />
        <span>Profile</span>
      </Link>
      <Link 
        to="/checkout"
        className="flex items-center gap-2 px-2 py-1 text-muted-foreground hover:text-foreground"
      >
        <ShoppingCart className="h-4 w-4" />
        <span>Checkout</span>
      </Link>
    </div>
  );
}

export default Header; 