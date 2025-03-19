import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import OrderSummary from '@/components/OrderSummary';
import { Button } from '@/components/ui/button';
import { useOrder } from '@/contexts/OrderContext';
import { formatDateForDisplay } from '@/lib/constants';
import { Calendar } from 'lucide-react';

const Checkout = () => {
  const { meals, cartItems, itemDates, date, hospital } = useOrder();
  const navigate = useNavigate();
  
  // Count total items in cart
  const cartItemCount = Object.values(cartItems).reduce((total, qty) => total + qty, 0);
  const isCartEmpty = cartItemCount === 0;

  // Get unique delivery dates
  const cartItemsWithDates = meals
    .filter(meal => (cartItems[meal.id.toString()] || 0) > 0)
    .map(meal => ({
      ...meal,
      quantity: cartItems[meal.id.toString()],
      itemDate: itemDates[meal.id.toString()] || date
    }));

  // Group items by date
  const itemsByDate = cartItemsWithDates.reduce((acc, item) => {
    const dateKey = item.itemDate;
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(item);
    return acc;
  }, {} as Record<string, typeof cartItemsWithDates>);
  
  const goToCart = () => {
    navigate('/cart');
  };
  
  const placeOrder = () => {
    // Here we would typically place the order
    alert('Order placed successfully!');
    // Then navigate to a confirmation page
    navigate('/');
  };

  return (
    <PageLayout>
      <section className="animate-fade-in">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Checkout</h1>
        
        {isCartEmpty ? (
          <div className="bg-white rounded-2xl shadow-elegant p-8 border border-gray-100 text-center">
            <div className="max-w-md mx-auto">
              <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-6">
                Add some items to your cart before checking out.
              </p>
              <Button onClick={() => navigate('/menu')}>Browse Menu</Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Delivery Details Summary */}
              <div className="bg-white rounded-2xl shadow-elegant p-6 border border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Delivery Details</h2>
                  <Button variant="outline" size="sm" onClick={goToCart}>
                    Edit
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <h3 className="text-sm text-gray-500 mb-2">Delivery Location</h3>
                    <p className="font-medium">{hospital}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm text-gray-500 mb-2">Delivery Schedule</h3>
                    {Object.keys(itemsByDate).length > 1 ? (
                      <div className="space-y-3">
                        {Object.entries(itemsByDate).map(([dateKey, items]) => (
                          <div key={dateKey} className="p-3 border rounded-lg bg-gray-50">
                            <div className="flex items-center">
                              <Calendar size={16} className="text-primary mr-2" />
                              <span className="font-medium">{formatDateForDisplay(dateKey)}</span>
                            </div>
                            <div className="mt-2 pl-6">
                              <ul className="text-sm space-y-1">
                                {items.map((item, index) => (
                                  <li key={index} className="flex justify-between">
                                    <span>{item.name}</span>
                                    <span className="text-gray-500">x{item.quantity}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="font-medium">{formatDateForDisplay(date)}</p>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Payment Method */}
              <div className="bg-white rounded-2xl shadow-elegant p-6 border border-gray-100">
                <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                <div className="p-4 border rounded-lg bg-gray-50">
                  <p className="text-center text-gray-500">
                    Payment options will be available in a future update.
                  </p>
                </div>
              </div>
              
              {/* Notes */}
              <div className="bg-white rounded-2xl shadow-elegant p-6 border border-gray-100">
                <h2 className="text-xl font-semibold mb-4">Order Notes</h2>
                <textarea 
                  className="w-full p-3 border rounded-lg h-24 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" 
                  placeholder="Add any special instructions for your order here..."
                />
              </div>
            </div>
            
            <div>
              <OrderSummary />
              <div className="bg-white rounded-2xl shadow-elegant p-6 border border-gray-100 mt-6">
                <p className="text-xs text-center text-gray-500">
                  By placing your order, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        )}
      </section>
    </PageLayout>
  );
};

export default Checkout; 