
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Define meal item type
export interface MealItem {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category?: string;
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
  // Initial meals data with expanded menu
  const [meals] = useState<MealItem[]>([
    {
      id: "meal1",
      name: "Hainanese Chicken Rice",
      price: 6.50,
      image: "/meals/hainanese-chicken-rice.jpg",
      description: "Fragrant rice with tender poached chicken and flavorful sauces.",
      category: "Signature Dishes"
    },
    {
      id: "meal2",
      name: "Chili Crab",
      price: 10.00,
      image: "/meals/chili-crab.jpg",
      description: "Singapore's iconic dish of crab in sweet and spicy tomato sauce.",
      category: "Seafood"
    },
    {
      id: "meal3",
      name: "Laksa",
      price: 7.50,
      image: "/meals/laksa.jpg",
      description: "Spicy coconut milk-based noodle soup with prawns and fish cake.",
      category: "Noodles"
    },
    {
      id: "meal4",
      name: "Char Kway Teow",
      price: 6.50,
      image: "/meals/char-kway-teow.jpg",
      description: "Stir-fried flat rice noodles with prawns, lap cheong, and bean sprouts.",
      category: "Noodles"
    },
    {
      id: "meal5",
      name: "Hokkien Mee",
      price: 7.00,
      image: "/meals/hokkien-mee.jpg",
      description: "Braised egg noodles and rice noodles in a rich prawn and pork stock.",
      category: "Noodles"
    },
    {
      id: "meal6",
      name: "Satay",
      price: 7.50,
      image: "/meals/satay.jpg",
      description: "Grilled skewers of marinated meat served with peanut sauce.",
      category: "Appetizers"
    },
    {
      id: "meal7",
      name: "Bak Chor Mee",
      price: 6.50,
      image: "/meals/bak-chor-mee.jpg",
      description: "Minced pork noodles with liver, meatballs, and vinegar.",
      category: "Noodles"
    },
    {
      id: "meal8",
      name: "Fish Head Curry",
      price: 9.50,
      image: "/meals/fish-head-curry.jpg",
      description: "Red snapper head in a spicy tamarind and coconut curry.",
      category: "Seafood"
    },
    {
      id: "meal9",
      name: "Nasi Lemak",
      price: 7.00,
      image: "/meals/nasi-lemak.jpg",
      description: "Coconut rice with sambal, fried fish, eggs, peanuts, and cucumber.",
      category: "Rice Dishes"
    },
    {
      id: "meal10",
      name: "Roti Prata",
      price: 6.50,
      image: "/meals/roti-prata.jpg",
      description: "Flaky flatbread served with curry dipping sauce.",
      category: "Appetizers"
    },
    {
      id: "meal11",
      name: "Bak Kut Teh",
      price: 8.00,
      image: "/meals/bak-kut-teh.jpg",
      description: "Pork ribs soup with herbs and spices, served with rice.",
      category: "Soup & Stew"
    },
    {
      id: "meal12",
      name: "Yong Tau Foo",
      price: 7.50,
      image: "/meals/yong-tau-foo.jpg",
      description: "Stuffed tofu and vegetables in clear soup or with laksa gravy.",
      category: "Soup & Stew"
    },
    {
      id: "meal13",
      name: "Wanton Mee",
      price: 6.50,
      image: "/meals/wanton-mee.jpg",
      description: "Noodles with char siu and dumplings, in soup or with sauce.",
      category: "Noodles"
    },
    {
      id: "meal14",
      name: "Beef Rendang",
      price: 8.50,
      image: "/meals/beef-rendang.jpg",
      description: "Slow-cooked beef in rich coconut and spice gravy.",
      category: "Meat Dishes"
    },
    {
      id: "meal15",
      name: "Oyster Omelette",
      price: 7.00,
      image: "/meals/oyster-omelette.jpg",
      description: "Crispy egg omelette with fresh oysters and tangy chili sauce.",
      category: "Seafood"
    },
    {
      id: "meal16",
      name: "Claypot Rice",
      price: 7.50,
      image: "/meals/claypot-rice.jpg",
      description: "Rice cooked in claypot with chinese sausage, chicken, and vegetables.",
      category: "Rice Dishes"
    },
    {
      id: "meal17",
      name: "Sambal Stingray",
      price: 9.00,
      image: "/meals/sambal-stingray.jpg",
      description: "Grilled stingray topped with spicy sambal and lime.",
      category: "Seafood"
    },
    {
      id: "meal18",
      name: "Fried Carrot Cake",
      price: 6.50,
      image: "/meals/fried-carrot-cake.jpg",
      description: "Stir-fried radish cake with eggs and preserved radish.",
      category: "Appetizers"
    },
    {
      id: "meal19",
      name: "Mee Siam",
      price: 6.50,
      image: "/meals/mee-siam.jpg",
      description: "Thin rice vermicelli in spicy, sweet and sour gravy.",
      category: "Noodles"
    },
    {
      id: "meal20",
      name: "Curry Chicken Bee Hoon",
      price: 7.50,
      image: "/meals/curry-chicken-bee-hoon.jpg",
      description: "Rice vermicelli in a rich coconut chicken curry.",
      category: "Noodles"
    },
  ]);

  // State for order details
  const [cartItems, setCartItems] = useState<Record<string, number>>({});
  const [date, setDate] = useState<string>(DEFAULT_DATE);
  const [hospital, setHospital] = useState<string>(DEFAULT_HOSPITAL);
  const [referralCode, setReferralCode] = useState<string>("");
  const [loyaltyPoints, setLoyaltyPoints] = useState<number>(0);

  // Storage for orders by date
  const [ordersByDate, setOrdersByDate] = useState<Record<string, Record<string, number>>>({});

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

  // Save current cart items when they change
  useEffect(() => {
    if (date && Object.keys(cartItems).length > 0) {
      setOrdersByDate(prev => ({
        ...prev,
        [date]: { ...cartItems }
      }));
    }
  }, [cartItems, date]);

  // Add/update item in cart
  const updateCartItem = (id: string, quantity: number) => {
    setCartItems(prev => ({
      ...prev,
      [id]: quantity
    }));
  };

  // Update date
  const updateDate = (newDate: string) => {
    // Save current cart items before changing date
    if (date && Object.keys(cartItems).length > 0) {
      setOrdersByDate(prev => ({
        ...prev,
        [date]: { ...cartItems }
      }));
    }

    // Set the new date
    setDate(newDate);
    
    // Load cart items for the new date or reset cart if no previous orders exist
    setCartItems(ordersByDate[newDate] || {});
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
    
    // Store the order for this date
    if (date) {
      setOrdersByDate(prev => ({
        ...prev,
        [date]: { ...cartItems }
      }));
    }
    
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
