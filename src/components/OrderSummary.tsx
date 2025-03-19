
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';
import { useOrder } from '@/contexts/OrderContext';
import { VALID_REFERRAL_CODE } from '@/lib/constants';

const OrderSummary = () => {
  const { 
    cartItems, 
    referralCode, 
    updateReferralCode, 
    subtotal, 
    savedAmount, 
    loyaltyPoints,
    placeOrder
  } = useOrder();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [localReferralCode, setLocalReferralCode] = useState(referralCode);
  const navigate = useNavigate();

  // Check if cart is empty
  const isCartEmpty = Object.values(cartItems).every(qty => qty === 0);
  
  // Calculate loyalty progress
  const progressPercent = Math.min(Math.floor((subtotal / 100) * 100), 100);
  
  // Check if bulk discount applies
  const totalQuantity = Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);
  const bulkDiscountApplies = totalQuantity > 10;
  
  // Check if referral discount applies
  const referralDiscountApplies = referralCode.toUpperCase() === VALID_REFERRAL_CODE;

  const handleReferralChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalReferralCode(e.target.value);
  };

  const handleReferralApply = () => {
    updateReferralCode(localReferralCode);
    
    if (localReferralCode.toUpperCase() === VALID_REFERRAL_CODE) {
      toast({
        title: "Referral code applied!",
        description: "You've received a 10% discount.",
        duration: 3000,
      });
    } else if (localReferralCode.trim() !== "") {
      toast({
        title: "Invalid referral code",
        description: "Please check and try again.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const handleOrderNow = () => {
    if (isCartEmpty) {
      toast({
        title: "Empty cart",
        description: "Please add items to your cart before ordering.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    setShowConfirmation(true);
  };

  const handleConfirmOrder = () => {
    placeOrder();
    setShowConfirmation(false);
    toast({
      title: "Order placed successfully!",
      description: "Your meal will be delivered as scheduled.",
      duration: 3000,
    });
    navigate('/order-scheduled');
  };

  return (
    <div className="bg-white rounded-2xl shadow-elegant p-6 border border-gray-100">
      <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
      
      {/* Discounts Section */}
      <div className="space-y-4 mb-6">
        {(bulkDiscountApplies || referralDiscountApplies) && (
          <div className="bg-green-50 rounded-lg p-4 border border-green-100">
            <h3 className="text-sm font-medium text-green-800 mb-2">Applied Discounts</h3>
            <ul className="space-y-2">
              {bulkDiscountApplies && (
                <li className="flex items-center text-green-700 text-sm">
                  <Check size={16} className="mr-2 flex-shrink-0" />
                  <span>Bulk order discount (5%)</span>
                </li>
              )}
              {referralDiscountApplies && (
                <li className="flex items-center text-green-700 text-sm">
                  <Check size={16} className="mr-2 flex-shrink-0" />
                  <span>Referral discount (10%)</span>
                </li>
              )}
            </ul>
          </div>
        )}
        
        {/* Referral Code Input */}
        <div className="flex items-center space-x-2">
          <Input
            value={localReferralCode}
            onChange={handleReferralChange}
            placeholder="Referral code"
            className="flex-1"
          />
          <Button onClick={handleReferralApply} size="sm" variant="outline">Apply</Button>
        </div>
        
        {/* Invite Friends */}
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
          <div className="flex items-start">
            <Award size={20} className="text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <p className="text-sm text-blue-800">
                Invite friends and earn up to <span className="font-semibold">10% off</span> your next order!
              </p>
              <p className="text-sm font-medium text-blue-700 mt-1">
                Share code: <span className="font-bold">{VALID_REFERRAL_CODE}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Price Summary */}
      <div className="space-y-3 pt-4 border-t border-gray-100">
        {savedAmount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-green-700">You saved:</span>
            <span className="font-medium text-green-700">${savedAmount.toFixed(2)}</span>
          </div>
        )}
        
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal:</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Delivery:</span>
          <span className="font-medium">Free</span>
        </div>
        
        <div className="flex justify-between text-lg font-semibold pt-3 border-t border-gray-100">
          <span>Total:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
      </div>
      
      {/* Loyalty Points */}
      <div className="mt-6 bg-gray-50 rounded-lg p-4 border border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium">Loyalty Points: {loyaltyPoints}</h3>
          <span className="text-xs text-gray-500">{progressPercent}% to next reward</span>
        </div>
        <Progress value={progressPercent} className="h-2" />
        <p className="text-xs text-gray-500 mt-2">
          Spend $100 to earn a 10% discount on your next order!
        </p>
      </div>
      
      {/* Order Button */}
      <Button 
        className="w-full mt-6" 
        size="lg"
        onClick={handleOrderNow}
        disabled={isCartEmpty}
      >
        Place Order
      </Button>
      
      {/* Order Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm your order</DialogTitle>
            <DialogDescription>
              Please review your order details before proceeding.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <p className="text-sm text-gray-600 mb-4">
              Your order will be delivered to the selected hospital on the specified date.
            </p>
            <p className="text-sm text-gray-600">
              Total amount: <span className="font-semibold">${subtotal.toFixed(2)}</span>
            </p>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmation(false)}>Cancel</Button>
            <Button onClick={handleConfirmOrder}>Confirm Order</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrderSummary;
