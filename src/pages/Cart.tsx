import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Minus, Trash2, Calendar, Edit2 } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import OrderSummary from '@/components/OrderSummary';
import { Button } from '@/components/ui/button';
import { useOrder } from '@/contexts/OrderContext';
import { formatDateForDisplay } from '@/lib/constants';
import DateSelector from '@/components/DateSelector';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Cart = () => {
  const { meals, cartItems, updateCartItem, date, updateDate, hospital } = useOrder();
  const navigate = useNavigate();
  const [isDateSelectorOpen, setIsDateSelectorOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  
  // Get cart items with quantities > 0
  const cartItemsWithDetails = meals
    .filter(meal => (cartItems[meal.id.toString()] || 0) > 0)
    .map(meal => ({
      ...meal,
      quantity: cartItems[meal.id.toString()],
      stringId: meal.id.toString()
    }));
  
  const isCartEmpty = cartItemsWithDetails.length === 0;
  
  const handleIncrement = (id: string | number) => {
    const stringId = id.toString();
    updateCartItem(stringId, (cartItems[stringId] || 0) + 1);
  };
  
  const handleDecrement = (id: string | number) => {
    const stringId = id.toString();
    if (cartItems[stringId] > 1) {
      updateCartItem(stringId, cartItems[stringId] - 1);
    } else {
      updateCartItem(stringId, 0);
    }
  };
  
  const handleRemove = (id: string | number) => {
    updateCartItem(id.toString(), 0);
  };
  
  const handleChangeDateClick = (id: string) => {
    setSelectedItemId(id);
    setIsDateSelectorOpen(true);
  };
  
  const handleDateSelected = (newDate: string) => {
    if (selectedItemId) {
      // Logic to change the date for this specific item would go here
      // For now, we'll just update the global date
      updateDate(newDate);
      setIsDateSelectorOpen(false);
    }
  };
  
  const continueShopping = () => {
    navigate('/menu');
  };
  
  const proceedToCheckout = () => {
    navigate('/checkout');
  };

  return (
    <PageLayout>
      <section className="animate-fade-in">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Your Cart</h1>
        
        {isCartEmpty ? (
          <div className="bg-white rounded-2xl shadow-elegant p-8 border border-gray-100 text-center">
            <div className="max-w-md mx-auto">
              <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-6">
                Looks like you haven't added any meals to your cart yet.
              </p>
              <Button onClick={continueShopping}>Browse Menu</Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Delivery Details */}
              <div className="bg-white rounded-2xl shadow-elegant p-6 border border-gray-100 mb-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold mb-4">Delivery Details</h2>
                  <Dialog open={isDateSelectorOpen} onOpenChange={setIsDateSelectorOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="flex items-center mb-4">
                        <Calendar className="mr-2 h-4 w-4" />
                        <span>Change Date</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Select New Delivery Date</DialogTitle>
                      </DialogHeader>
                      <DateSelector onDateSelected={handleDateSelected} initialDate={date} />
                    </DialogContent>
                  </Dialog>
                </div>
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
                
                <div className="border rounded-lg overflow-hidden mb-6">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Item</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Quantity</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Price</th>
                        <th className="px-4 py-3 text-center text-sm font-medium text-gray-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {cartItemsWithDetails.map((item) => (
                        <tr key={item.stringId} className="bg-white">
                          <td className="px-4 py-4">
                            <div className="flex items-center">
                              <div className="h-12 w-12 rounded-md overflow-hidden mr-3">
                                <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                              </div>
                              <div>
                                <div className="font-medium">{item.name}</div>
                                <div className="text-sm text-gray-500">{item.category}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-7 w-7 rounded-full"
                                onClick={() => handleDecrement(item.stringId)}
                              >
                                <Minus size={14} />
                              </Button>
                              
                              <span className="w-8 text-center font-medium">{item.quantity}</span>
                              
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-7 w-7 rounded-full"
                                onClick={() => handleIncrement(item.stringId)}
                              >
                                <Plus size={14} />
                              </Button>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            ${(item.price * item.quantity).toFixed(2)}
                          </td>
                          <td className="px-4 py-4 text-center">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-gray-400 hover:text-destructive"
                              onClick={() => handleRemove(item.stringId)}
                            >
                              <Trash2 size={16} />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
              <div className="mt-4">
                <Button className="w-full" onClick={proceedToCheckout}>
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          </div>
        )}
      </section>
    </PageLayout>
  );
};

export default Cart;
