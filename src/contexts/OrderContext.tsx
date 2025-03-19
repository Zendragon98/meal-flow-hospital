
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Define meal item type
export interface MealItem {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

// Define order context type
interface OrderContextType {
  meals: MealItem[];
  cartItems: Record<string, number>;
  date: string;
  hospital: string;
  referralCode: string;
  subtotal: number;
  savedAmount: number;
  loyaltyPoints: number;
  updateCartItem: (id: string, quantity: number) => void;
  updateDate: (date: string) => void;
  updateHospital: (hospital: string) => void;
  updateReferralCode: (code: string) => void;
  clearCart: () => void;
  placeOrder: () => void;
}

// Default values for dates and hospitals
const DEFAULT_DATE = new Date().toISOString().split('T')[0];
const DEFAULT_HOSPITAL = "SENGKANG GENERAL HOSPITAL";
const VALID_REFERRAL_CODE = "354ZAN";

// Create context
const OrderContext = createContext<OrderContextType | undefined>(undefined);

// Provider component
export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initial meals data
  const [meals] = useState<MealItem[]>([
    {
      id: "meal1",
      name: "Energy-Boosting Chicken Rice",
      price: 5.00,
      image: "/meals/meal1.jpg",
      description: "A nutritious meal for recovery and energy."
    },
    {
      id: "meal2",
      name: "Chicken Rice (Black Pepper)",
      price: 6.50,
      image: "/meals/meal2.jpg",
      description: "Savory black pepper chicken rice for enhanced flavor."
    },
    {
      id: "meal3",
      name: "60s Chicken Rice",
      price: 7.00,
      image: "/meals/meal3.jpg",
      description: "Classic recipe with a nostalgic touch."
    },
  ]);

  // State for order details
  const [cartItems, setCartItems] = useState<Record<string, number>>({});
  const [date, setDate] = useState<string>(DEFAULT_DATE);
  const [hospital, setHospital] = useState<string>(DEFAULT_HOSPITAL);
  const [referralCode, setReferralCode] = useState<string>("");
  const [loyaltyPoints, setLoyaltyPoints] = useState<number>(0);

  // Calculate order totals
  const [subtotal, setSubtotal] = useState<number>(0);
  const [savedAmount, setSavedAmount] = useState<number>(0);

  // Calculate total and discounts whenever cart changes
  useEffect(() => {
    // Calculate total quantity and base price
    let totalQuantity = 0;
    let total = 0;

    Object.entries(cartItems).forEach(([id, quantity]) => {
      const meal = meals.find(m => m.id === id);
      if (meal && quantity > 0) {
        total += meal.price * quantity;
        totalQuantity += quantity;
      }
    });

    // Apply discounts
    let discountRate = 0;
    
    // Referral discount
    if (referralCode.toUpperCase() === VALID_REFERRAL_CODE) {
      discountRate += 0.10; // 10% discount
    }
    
    // Bulk order discount
    if (totalQuantity > 10) {
      discountRate += 0.05; // Additional 5% discount
    }
    
    const discount = total * discountRate;
    const finalTotal = total - discount;
    
    setSavedAmount(discount);
    setSubtotal(finalTotal);
  }, [cartItems, referralCode, meals]);

  // Add/update item in cart
  const updateCartItem = (id: string, quantity: number) => {
    setCartItems(prev => ({
      ...prev,
      [id]: quantity
    }));
  };

  // Update date
  const updateDate = (date: string) => {
    setDate(date);
  };

  // Update hospital
  const updateHospital = (hospital: string) => {
    setHospital(hospital);
  };

  // Update referral code
  const updateReferralCode = (code: string) => {
    setReferralCode(code);
  };

  // Clear cart
  const clearCart = () => {
    setCartItems({});
  };

  // Place order
  const placeOrder = () => {
    // Add loyalty points (1 point per $1 spent)
    const newPoints = Math.floor(subtotal) + loyaltyPoints;
    setLoyaltyPoints(newPoints);
    
    // Clear cart after order
    clearCart();
  };

  // Context value
  const value: OrderContextType = {
    meals,
    cartItems,
    date,
    hospital,
    referralCode,
    subtotal,
    savedAmount,
    loyaltyPoints,
    updateCartItem,
    updateDate,
    updateHospital,
    updateReferralCode,
    clearCart,
    placeOrder
  };

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};

// Custom hook for using the order context
export const useOrder = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};
