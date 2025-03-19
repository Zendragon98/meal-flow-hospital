
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Minus, Trash2 } from 'lucide-react';
import Header from '@/components/Header';
import OrderSummary from '@/components/OrderSummary';
import { Button } from '@/components/ui/button';
import { useOrder } from '@/contexts/OrderContext';
import { formatDateForDisplay } from '@/lib/constants';

const Cart = () => {
  const { meals, cartItems, updateCartItem, date, hospital } = useOrder();
  const navigate = useNavigate();
  
  // Get cart items with quantities > 0
  const cartItemsWithDetails = meals
    .filter(meal => (cartItems[meal.id] || 0) > 0)
    .map(meal => ({
      ...meal,
      quantity: cartItems[meal.id]
    }));
  
  const isCartEmpty = cartItemsWithDetails.length === 0;
  
  const handleIncrement = (id: string) => {
    updateCartItem(id, (cartItems[id] || 0) + 1);
  };
  
  const handleDecrement = (id: string) => {
    if (cartItems[id] > 1) {
      updateCartItem(id, cartItems[id] - 1);
    } else {
      updateCartItem(id, 0);
    }
  };
  
  const handleRemove = (id: string) => {
    updateCartItem(id, 0);
  };
  
  const continueShopping = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <section className="animate-fade-in">
          <h1 className="text-3xl font-bold tracking-tight mb-6">Your Cart</h1>
          
          {isCartEmpty ? (
            <div className="bg-white rounded-2xl shadow-elegant p-8 border border-gray-100 text-center">
              <div className="max-w-md mx-auto">
                <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
                <p className="text-gray-600 mb-6">
                  Looks like you haven't added any meals to your cart yet.
                </p>
                <Button onClick={continueShopping}>Continue Shopping</Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                {/* Delivery Details */}
                <div className="bg-white rounded-2xl shadow-elegant p-6 border border-gray-100 mb-6">
                  <h2 className="text-lg font-semibold mb-4">Delivery Details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-gray-500">Date</span>
                      <p className="font-medium">{formatDateForDisplay(date)}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Hospital</span>
                      <p className="font-medium">{hospital}</p>
                    </div>
                  </div>
                </div>
                
                {/* Cart Items */}
                <div className="bg-white rounded-2xl shadow-elegant p-6 border border-gray-100">
                  <h2 className="text-lg font-semibold mb-4">Cart Items</h2>
                  
                  <div className="divide-y">
                    {cartItemsWithDetails.map((item) => (
                      <div key={item.id} className="py-4 flex items-center">
                        <div className="h-20 w-20 rounded-lg overflow-hidden mr-4 flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-base">{item.name}</h3>
                          <p className="text-gray-600 text-sm">${item.price.toFixed(2)}</p>
                        </div>
                        
                        <div className="flex items-center space-x-2 mr-4">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={() => handleDecrement(item.id)}
                          >
                            <Minus size={16} />
                          </Button>
                          
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={() => handleIncrement(item.id)}
                          >
                            <Plus size={16} />
                          </Button>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-400 hover:text-destructive"
                          onClick={() => handleRemove(item.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 pt-4 border-t flex justify-between items-center">
                    <Button variant="outline" onClick={continueShopping}>
                      Continue Shopping
                    </Button>
                  </div>
                </div>
              </div>
              
              <div>
                <OrderSummary />
              </div>
            </div>
          )}
        </section>
      </main>
      
      <footer className="py-8 mt-auto border-t bg-white">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} KCK Food. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Cart;
