
import React, { useState, useEffect } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MealItem, useOrder } from '@/contexts/OrderContext';

interface MealCardProps {
  meal: MealItem;
}

const MealCard: React.FC<MealCardProps> = ({ meal }) => {
  const { cartItems, updateCartItem } = useOrder();
  const quantity = cartItems[meal.id] || 0;
  const [inputValue, setInputValue] = useState(quantity.toString());

  // Update input value when quantity changes (from date change or other components)
  useEffect(() => {
    setInputValue(quantity.toString());
  }, [quantity]);

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    updateCartItem(meal.id, newQuantity);
    setInputValue(newQuantity.toString());
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      updateCartItem(meal.id, newQuantity);
      setInputValue(newQuantity.toString());
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    
    // Only update context if the value is a valid number
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue) && numValue >= 0) {
      updateCartItem(meal.id, numValue);
    }
  };

  const handleBlur = () => {
    // Ensure the input value is a valid number when the field loses focus
    const numValue = parseInt(inputValue, 10);
    if (isNaN(numValue) || numValue < 0) {
      setInputValue('0');
      updateCartItem(meal.id, 0);
    }
  };

  return (
    <div className="meal-card bg-white rounded-2xl overflow-hidden shadow-card border border-gray-100 transition-all">
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={meal.image} 
          alt={meal.name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-5">
        <div className="space-y-1 mb-3">
          <h3 className="font-medium text-lg tracking-tight">{meal.name}</h3>
          <p className="text-gray-600 text-sm">{meal.description}</p>
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <span className="font-semibold text-lg">${meal.price.toFixed(2)}</span>
          
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8 rounded-full"
              onClick={handleDecrement}
              disabled={quantity === 0}
            >
              <Minus size={16} className={quantity === 0 ? "text-gray-400" : "text-gray-700"} />
            </Button>
            
            <Input
              type="text" 
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className="w-12 h-8 text-center p-0 text-sm font-medium"
              aria-label={`Quantity for ${meal.name}`}
            />
            
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8 rounded-full bg-primary/10 border-primary/20 hover:bg-primary/20"
              onClick={handleIncrement}
            >
              <Plus size={16} className="text-primary" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealCard;
