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
  const { meals, cartItems, itemDates, updateCartItem, date, updateDate, updateItemDate, hospital } = useOrder();
  const navigate = useNavigate();
  const [isDateSelectorOpen, setIsDateSelectorOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  
  // Get cart items with quantities > 0
  const cartItemsWithDetails = meals
    .filter(meal => (cartItems[meal.id.toString()] || 0) > 0)
    .map(meal => ({
      ...meal,
      quantity: cartItems[meal.id.toString()],
      stringId: meal.id.toString(),
      itemDate: itemDates[meal.id.toString()] || date
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
      // Update only the selected item's date
      updateItemDate(selectedItemId, newDate);
    } else {
      // Update the global date (affects all items without custom dates)
      updateDate(newDate);
    }
    setIsDateSelectorOpen(false);
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
              {/* Order Details */}
              <div className="bg-white rounded-2xl shadow-elegant p-6 border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Your Order Summary</h2>
                  <Dialog open={isDateSelectorOpen} onOpenChange={setIsDateSelectorOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4" />
                        <span>Change All Dates</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          {selectedItemId 
                            ? "Select Delivery Date for This Item" 
                            : "Select New Delivery Date for All Items"
                          }
                        </DialogTitle>
                      </DialogHeader>
                      <DateSelector 
                        onDateSelected={handleDateSelected} 
                        initialDate={selectedItemId ? itemDates[selectedItemId] || date : date} 
                      />
                    </DialogContent>
                  </Dialog>
                </div>
                
                <div className="border rounded-lg overflow-hidden mb-6">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Item</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Quantity</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Price</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Delivery Date</th>
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
                          <td className="px-4 py-4">
                            <div className="flex items-center">
                              <span className="mr-2">{formatDateForDisplay(item.itemDate)}</span>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-6 w-6 text-gray-400 hover:text-primary"
                                onClick={() => handleChangeDateClick(item.stringId)}
                              >
                                <Edit2 size={14} />
                              </Button>
                            </div>
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
                
                <div className="border-t pt-6 mt-6">
                  <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                    <Button variant="outline" onClick={continueShopping}>
                      Add More Items
                    </Button>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-sm text-gray-500 mb-1">Total</div>
                        <div className="text-2xl font-bold">
                          ${cartItemsWithDetails.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}
                        </div>
                      </div>
                      <Button onClick={proceedToCheckout}>
                        Proceed to Checkout
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <OrderSummary />
              <div className="bg-white rounded-2xl shadow-elegant p-6 border border-gray-100 mt-6">
                <h3 className="text-md font-semibold mb-2">Delivery To</h3>
                <p className="text-gray-600">{hospital}</p>
              </div>
            </div>
          </div>
        )}
      </section>
    </PageLayout>
  );
};

export default Cart;
