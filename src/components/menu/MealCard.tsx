import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Flame, Heart, Plus, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { useOrder, MealItem } from '@/contexts/OrderContext';

interface MealCardProps {
  meal: MealItem;
  index: number;
}

const MealCard: React.FC<MealCardProps> = ({ meal, index }) => {
  const { cartItems, updateCartItem } = useOrder();
  
  const isInCart = cartItems[meal.id.toString()] && cartItems[meal.id.toString()] > 0;
  
  const handleAddToCart = () => {
    const currentQuantity = cartItems[meal.id.toString()] || 0;
    updateCartItem(meal.id.toString(), currentQuantity + 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          delay: index * 0.1,
          ease: [0.22, 1, 0.36, 1]
        }
      }}
      className="glass-card rounded-xl overflow-hidden hover-scale"
    >
      <div className="relative h-48 overflow-hidden group">
        <img
          src={meal.image}
          alt={meal.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4">
          <Badge variant="secondary" className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm text-xs font-medium">
            ${meal.price.toFixed(2)}
          </Badge>
        </div>

        {meal.isNew && (
          <div className="absolute top-4 left-4">
            <Badge className="bg-brand-500 text-white text-xs">New</Badge>
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg">{meal.name}</h3>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-rose-500">
            <Heart className="h-5 w-5" />
          </Button>
        </div>

        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {meal.description}
        </p>

        {meal.dietary && meal.dietary.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {meal.dietary.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs bg-brand-50/50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 border-brand-100 dark:border-brand-800">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <div className="flex justify-between items-center text-sm text-muted-foreground mb-5">
          {meal.prepTime && (
            <div className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              {meal.prepTime}
            </div>
          )}
          {meal.calories && (
            <div className="flex items-center">
              <Flame className="mr-1 h-4 w-4" />
              {meal.calories} cal
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex-1"
            asChild
          >
            <Link to={`/meal/${meal.id}`}>
              View Details
            </Link>
          </Button>

          <Button
            variant={isInCart ? "secondary" : "default"}
            className={isInCart ? "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400" : "bg-brand-500 hover:bg-brand-600"}
            onClick={handleAddToCart}
          >
            {isInCart ? (
              <>
                <Check className="h-4 w-4 mr-1" />
                In Cart
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" />
                Add to Order
              </>
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default MealCard; 