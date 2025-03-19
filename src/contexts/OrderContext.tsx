import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Define meal item type, adapting from both projects
export interface MealItem {
  id: string | number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  calories?: number;
  prepTime?: string;
  dietary?: string[];
  isNew?: boolean;
}

// Define cart item with date
export interface CartItemWithDate {
  quantity: number;
  date: string;
}

// Define order context type
interface OrderContextType {
  meals: MealItem[];
  cartItems: Record<string, number>;
  itemDates: Record<string, string>;
  date: string;
  hospital: string;
  referralCode: string;
  subtotal: number;
  savedAmount: number;
  loyaltyPoints: number;
  updateCartItem: (id: string, quantity: number) => void;
  updateDate: (date: string) => void;
  updateItemDate: (id: string, date: string) => void;
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
  // Initial meals data from meal-flow-hospital
  const [meals] = useState<MealItem[]>([
    {
      id: "meal1",
      name: "Hainanese Chicken Rice",
      price: 6.50,
      image: "/meals/hainanese-chicken-rice.jpg",
      description: "Fragrant rice with tender poached chicken and flavorful sauces.",
      category: "Signature Dishes",
      calories: 520,
      prepTime: "20 min",
      dietary: ["High-Protein", "Comfort Food"]
    },
    {
      id: "meal2",
      name: "Chili Crab",
      price: 10.00,
      image: "/meals/chili-crab.jpg",
      description: "Singapore's iconic dish of crab in sweet and spicy tomato sauce.",
      category: "Seafood",
      calories: 650,
      prepTime: "30 min",
      dietary: ["Seafood", "Protein-Rich"]
    },
    {
      id: "meal3",
      name: "Laksa",
      price: 7.50,
      image: "/meals/laksa.jpg",
      description: "Spicy coconut milk-based noodle soup with prawns and fish cake.",
      category: "Noodles",
      calories: 580,
      prepTime: "15 min",
      dietary: ["Spicy", "Warming"]
    },
    {
      id: "meal4",
      name: "Char Kway Teow",
      price: 6.50,
      image: "/meals/char-kway-teow.jpg",
      description: "Stir-fried flat rice noodles with prawns, lap cheong, and bean sprouts.",
      category: "Noodles",
      calories: 550,
      prepTime: "15 min",
      dietary: ["Comfort Food"]
    },
    {
      id: "meal5",
      name: "Hokkien Mee",
      price: 7.00,
      image: "/meals/hokkien-mee.jpg",
      description: "Braised egg noodles and rice noodles in a rich prawn and pork stock.",
      category: "Noodles",
      calories: 530,
      prepTime: "20 min",
      dietary: ["Seafood", "Protein-Rich"]
    },
    {
      id: "meal6",
      name: "Satay",
      price: 7.50,
      image: "/meals/satay.jpg",
      description: "Grilled skewers of marinated meat served with peanut sauce.",
      category: "Appetizers",
      calories: 480,
      prepTime: "15 min",
      dietary: ["High-Protein", "Grilled"]
    },
    {
      id: "meal7",
      name: "Bak Chor Mee",
      price: 6.50,
      image: "/meals/bak-chor-mee.jpg",
      description: "Minced pork noodles with liver, meatballs, and vinegar.",
      category: "Noodles",
      calories: 520,
      prepTime: "15 min",
      dietary: ["Protein-Rich"]
    },
    {
      id: "meal8",
      name: "Fish Head Curry",
      price: 9.50,
      image: "/meals/fish-head-curry.jpg",
      description: "Red snapper head in a spicy tamarind and coconut curry.",
      category: "Seafood",
      calories: 620,
      prepTime: "30 min",
      dietary: ["Seafood", "Spicy", "Protein-Rich"]
    },
    {
      id: "meal9",
      name: "Nasi Lemak",
      price: 7.00,
      image: "/meals/nasi-lemak.jpg",
      description: "Coconut rice with sambal, fried fish, eggs, peanuts, and cucumber.",
      category: "Rice Dishes",
      calories: 650,
      prepTime: "20 min",
      dietary: ["Comfort Food"]
    },
    {
      id: "meal10",
      name: "Roti Prata",
      price: 6.50,
      image: "/meals/roti-prata.jpg",
      description: "Flaky flatbread served with curry dipping sauce.",
      category: "Appetizers",
      calories: 450,
      prepTime: "10 min",
      dietary: ["Vegetarian"]
    },
    // Added meals from midnight-mealmate with Singapore's local dish style
    {
      id: "meal11",
      name: "Mediterranean Bowl",
      price: 12.99,
      image: "/meals/mediterranean-bowl.jpg",
      description: "Quinoa, grilled chicken, hummus, cucumber, olives, and feta cheese with lemon herb dressing.",
      category: "Bowls",
      calories: 520,
      prepTime: "25 min",
      dietary: ["Protein-Rich", "Low-Carb"]
    },
    {
      id: "meal12",
      name: "Energy Boost Noodles",
      price: 11.49,
      image: "/meals/energy-boost-noodles.jpg",
      description: "Stir-fried rice noodles with tofu, broccoli, carrots and a light soy-ginger sauce.",
      category: "Noodles",
      calories: 480,
      prepTime: "20 min",
      dietary: ["Vegan", "Dairy-Free"],
      isNew: true
    },
    {
      id: "meal13",
      name: "Lean Protein Plate",
      price: 14.99,
      image: "/meals/lean-protein-plate.jpg",
      description: "Grilled salmon, steamed asparagus and wild rice with a lemon butter sauce.",
      category: "Protein Plates",
      calories: 550,
      prepTime: "25 min",
      dietary: ["High-Protein", "Omega-3"]
    },
    {
      id: "meal14",
      name: "Overnight Oats",
      price: 8.99,
      image: "/meals/overnight-oats.jpg",
      description: "Steel-cut oats soaked with almond milk, topped with berries, nuts, and a drizzle of honey.",
      category: "Breakfast",
      calories: 420,
      prepTime: "5 min",
      dietary: ["Fiber-Rich", "Slow-Release Energy"]
    },
    {
      id: "meal15",
      name: "Hearty Lentil Soup",
      price: 9.99,
      image: "/meals/hearty-lentil-soup.jpg",
      description: "Red lentils with carrots, celery, and spices in a warming vegetable broth.",
      category: "Soups",
      calories: 360,
      prepTime: "15 min",
      dietary: ["Vegan", "High-Fiber"]
    }
  ]);

  // State for order details
  const [cartItems, setCartItems] = useState<Record<string, number>>({});
  const [itemDates, setItemDates] = useState<Record<string, string>>({});
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
      const meal = meals.find(m => m.id.toString() === id);
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

  // Keep track of items in session storage
  useEffect(() => {
    if (date && Object.keys(cartItems).length > 0) {
      setOrdersByDate(prev => ({
        ...prev,
        [date]: { ...cartItems }
      }));
    }
  }, [cartItems, date]);

  // Update a cart item
  const updateCartItem = (id: string, quantity: number) => {
    setCartItems(prev => ({
      ...prev,
      [id]: quantity
    }));
    
    // Initialize the item date if it doesn't exist yet
    if (quantity > 0 && !itemDates[id]) {
      setItemDates(prev => ({
        ...prev,
        [id]: date
      }));
    }
  };

  // Update the global date
  const updateDate = (newDate: string) => {
    setDate(newDate);
    
    // Update all item dates that haven't been individually set
    setItemDates(prev => {
      const updatedDates = { ...prev };
      
      // For each item in the cart
      Object.keys(cartItems).forEach(itemId => {
        if (cartItems[itemId] > 0) {
          updatedDates[itemId] = newDate;
        }
      });
      
      return updatedDates;
    });
  };
  
  // Update date for a specific item
  const updateItemDate = (id: string, newDate: string) => {
    setItemDates(prev => ({
      ...prev,
      [id]: newDate
    }));
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
    setItemDates({});
  };

  // Place order
  const placeOrder = () => {
    // Simulate order placement
    console.log("Order placed:", {
      items: cartItems,
      itemDates,
      hospital,
      totalAmount: subtotal,
      discount: savedAmount,
      finalAmount: subtotal - savedAmount
    });
    
    // Add loyalty points (10 points per dollar spent)
    const points = Math.round((subtotal - savedAmount) * 10);
    setLoyaltyPoints(prev => prev + points);
    
    // Clear cart after order
    clearCart();
  };

  // Provide context value
  const value: OrderContextType = {
    meals,
    cartItems,
    itemDates,
    date,
    hospital,
    referralCode,
    subtotal,
    savedAmount,
    loyaltyPoints,
    updateCartItem,
    updateDate,
    updateItemDate,
    updateHospital,
    updateReferralCode,
    clearCart,
    placeOrder
  };

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};

// Hook to use the order context
export const useOrder = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
};
