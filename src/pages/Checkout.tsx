import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2, Minus, Plus, Calendar, Hospital } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useOrder } from '@/contexts/OrderContext';
import { useToast } from '@/components/ui/use-toast';

const Checkout = () => {
  const { 
    meals, 
    cartItems, 
    updateCartItem, 
    date, 
    updateDate, 
    hospital,
    updateHospital,
    subtotal,
    savedAmount,
    loyaltyPoints,
    referralCode,
    updateReferralCode,
    placeOrder
  } = useOrder();
  
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  // Filter meals that are in the cart
  const cartMeals = meals.filter(meal => cartItems[meal.id.toString()] && cartItems[meal.id.toString()] > 0);
  
  // Handle quantity change
  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity >= 0) {
      updateCartItem(id, quantity);
    }
  };
  
  // Handle order submission
  const handleSubmitOrder = () => {
    if (cartMeals.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before placing an order.",
        variant: "destructive"
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate order processing
    setTimeout(() => {
      placeOrder();
      setIsProcessing(false);
      toast({
        title: "Order placed successfully!",
        description: `Your order will be delivered to ${hospital} on ${new Date(date).toLocaleDateString()}.`,
        variant: "default"
      });
      navigate('/');
    }, 1500);
  };

  return (
    <PageLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Checkout</h1>
        <p className="text-muted-foreground">
          Review your order and complete your purchase
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-card rounded-lg border shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Your Order</h2>
            
            {cartMeals.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">Your cart is empty</p>
                <Button onClick={() => navigate('/menu')}>
                  Browse Menu
                </Button>
              </div>
            ) : (
              <>
                {cartMeals.map(meal => (
                  <div key={meal.id} className="flex gap-4 py-4 border-b last:border-0">
                    <div className="h-20 w-20 rounded-md overflow-hidden flex-shrink-0">
                      <img 
                        src={meal.image} 
                        alt={meal.name} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <h3 className="font-medium">{meal.name}</h3>
                        <span className="font-medium">${(meal.price * cartItems[meal.id.toString()]).toFixed(2)}</span>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-1">
                        {meal.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => handleQuantityChange(meal.id.toString(), cartItems[meal.id.toString()] - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          
                          <span className="w-8 text-center">{cartItems[meal.id.toString()]}</span>
                          
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => handleQuantityChange(meal.id.toString(), cartItems[meal.id.toString()] + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => updateCartItem(meal.id.toString(), 0)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-card rounded-lg border shadow-sm p-6 space-y-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            
            {/* Delivery Details */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Delivery Date
                </Label>
                <Input 
                  type="date" 
                  value={date}
                  onChange={(e) => updateDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Hospital className="h-4 w-4" />
                  Hospital
                </Label>
                <select 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={hospital}
                  onChange={(e) => updateHospital(e.target.value)}
                >
                  <option value="SENGKANG GENERAL HOSPITAL">Sengkang General Hospital</option>
                  <option value="SINGAPORE GENERAL HOSPITAL">Singapore General Hospital</option>
                  <option value="TAN TOCK SENG HOSPITAL">Tan Tock Seng Hospital</option>
                  <option value="NATIONAL UNIVERSITY HOSPITAL">National University Hospital</option>
                  <option value="CHANGI GENERAL HOSPITAL">Changi General Hospital</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label>Referral Code (Optional)</Label>
                <Input 
                  placeholder="Enter referral code" 
                  value={referralCode}
                  onChange={(e) => updateReferralCode(e.target.value)}
                />
              </div>
            </div>
            
            <Separator />
            
            {/* Price Summary */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${(subtotal + savedAmount).toFixed(2)}</span>
              </div>
              
              {savedAmount > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Discount</span>
                  <span className="text-green-600">-${savedAmount.toFixed(2)}</span>
                </div>
              )}
              
              <div className="flex justify-between font-medium text-lg pt-2 border-t">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="text-sm text-muted-foreground text-right">
                You'll earn {Math.floor(subtotal)} loyalty points with this order
              </div>
              
              {loyaltyPoints > 0 && (
                <div className="text-sm text-brand-500 text-right">
                  Current loyalty points: {loyaltyPoints}
                </div>
              )}
            </div>
            
            <Button 
              className="w-full" 
              size="lg"
              onClick={handleSubmitOrder}
              disabled={isProcessing || cartMeals.length === 0}
            >
              {isProcessing ? "Processing..." : "Place Order"}
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Checkout; 