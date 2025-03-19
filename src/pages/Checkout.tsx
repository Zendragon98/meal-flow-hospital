import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import OrderSummary from '@/components/OrderSummary';
import { Button } from '@/components/ui/button';
import { useOrder } from '@/contexts/OrderContext';
import { formatDateForDisplay } from '@/lib/constants';

const Checkout = () => {
  const { cartItems, date, hospital } = useOrder();
  const navigate = useNavigate();
  
  // Count total items in cart
  const cartItemCount = Object.values(cartItems).reduce((total, qty) => total + qty, 0);
  const isCartEmpty = cartItemCount === 0;
  
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
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm text-gray-500 mb-1">Delivery Date</h3>
                    <p className="font-medium">{formatDateForDisplay(date)}</p>
                  </div>
                  <div>
                    <h3 className="text-sm text-gray-500 mb-1">Delivery Location</h3>
                    <p className="font-medium">{hospital}</p>
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
              <div className="bg-white rounded-2xl shadow-elegant p-6 border border-gray-100">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <OrderSummary />
                <div className="mt-6 pt-6 border-t">
                  <Button className="w-full" size="lg" onClick={placeOrder}>
                    Place Order
                  </Button>
                  <p className="text-xs text-center text-gray-500 mt-4">
                    By placing your order, you agree to our Terms of Service and Privacy Policy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </PageLayout>
  );
};

export default Checkout; 