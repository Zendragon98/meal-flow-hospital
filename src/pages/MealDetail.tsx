import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, Clock, Flame, Plus, Minus, Check } from 'lucide-react';
import { useOrder } from '@/contexts/OrderContext';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';

const MealDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { meals, cartItems, updateCartItem } = useOrder();
  const { toast } = useToast();
  
  // Find the meal by ID
  const meal = meals.find(m => m.id.toString() === id);
  
  // Handle if meal not found
  if (!meal) {
    return (
      <PageLayout>
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold mb-4">Meal Not Found</h2>
          <p className="text-muted-foreground mb-8">
            Sorry, we couldn't find the meal you're looking for.
          </p>
          <Button onClick={() => navigate('/menu')}>
            Back to Menu
          </Button>
        </div>
      </PageLayout>
    );
  }
  
  // Get current quantity in cart
  const currentQty = cartItems[meal.id.toString()] || 0;
  
  // State for quantity selection
  const [quantity, setQuantity] = useState<number>(currentQty > 0 ? currentQty : 1);
  
  // Handle quantity change
  const handleQuantityChange = (qty: number) => {
    if (qty >= 1) {
      setQuantity(qty);
    }
  };
  
  // Handle add to cart
  const handleAddToCart = () => {
    updateCartItem(meal.id.toString(), quantity);
    
    toast({
      title: `${meal.name} added to cart`,
      description: `${quantity} x ${meal.name} added to your order.`,
      duration: 3000
    });
  };
  
  // Nutritional facts (mock data)
  const nutritionalFacts = [
    { name: 'Protein', value: '24g' },
    { name: 'Carbs', value: '38g' },
    { name: 'Fats', value: '12g' },
    { name: 'Fiber', value: '4g' },
    { name: 'Sodium', value: '420mg' }
  ];
  
  return (
    <PageLayout>
      <Button 
        variant="ghost" 
        className="mb-8 -ml-3 text-muted-foreground"
        onClick={() => navigate('/menu')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Menu
      </Button>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-xl overflow-hidden bg-muted/20"
        >
          <img 
            src={meal.image} 
            alt={meal.name} 
            className="w-full h-full object-cover aspect-[4/3]"
          />
        </motion.div>
        
        {/* Content Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-6"
        >
          {/* Header */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="bg-brand-50 text-brand-600 border-brand-200">
                {meal.category}
              </Badge>
              {meal.isNew && (
                <Badge className="bg-brand-500 text-white">New</Badge>
              )}
            </div>
            
            <h1 className="text-3xl font-bold">{meal.name}</h1>
            
            <div className="flex items-center gap-6 mt-3">
              <div className="flex items-center">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
                <span className="font-medium">4.8</span>
                <span className="text-muted-foreground ml-1">(124)</span>
              </div>
              
              {meal.prepTime && (
                <div className="flex items-center text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  {meal.prepTime}
                </div>
              )}
              
              {meal.calories && (
                <div className="flex items-center text-muted-foreground">
                  <Flame className="h-4 w-4 mr-1" />
                  {meal.calories} cal
                </div>
              )}
            </div>
          </div>
          
          {/* Price and Add to Cart */}
          <div className="py-4 border-y">
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">${meal.price.toFixed(2)}</div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded-md">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-9 w-9 rounded-r-none"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  
                  <div className="w-12 text-center font-medium">
                    {quantity}
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-9 w-9 rounded-l-none"
                    onClick={() => handleQuantityChange(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                <Button 
                  onClick={handleAddToCart}
                  className="bg-brand-500 hover:bg-brand-600"
                >
                  {currentQty > 0 ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Update Cart
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                      Add to Cart
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
          
          {/* Description */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-muted-foreground">
              {meal.description}
            </p>
          </div>
          
          {/* Dietary Tags */}
          {meal.dietary && meal.dietary.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-2">Dietary Notes</h2>
              <div className="flex flex-wrap gap-2">
                {meal.dietary.map((tag, index) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className="bg-brand-50/50 text-brand-600 border-brand-200"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {/* Nutritional Information */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Nutritional Information</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {nutritionalFacts.map((fact, index) => (
                <div key={index} className="bg-muted/30 p-3 rounded-lg">
                  <div className="text-muted-foreground text-sm mb-1">{fact.name}</div>
                  <div className="font-semibold">{fact.value}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Related Meals */}
      <div className="mt-16">
        <Separator className="mb-8" />
        <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {meals.filter(m => m.id.toString() !== id && m.category === meal.category).slice(0, 3).map((relatedMeal) => (
            <motion.div
              key={relatedMeal.id}
              className="group cursor-pointer"
              onClick={() => navigate(`/meal/${relatedMeal.id}`)}
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="rounded-lg overflow-hidden mb-3 aspect-video">
                <img 
                  src={relatedMeal.image} 
                  alt={relatedMeal.name} 
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <h3 className="font-medium group-hover:text-brand-500 transition-colors">{relatedMeal.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">${relatedMeal.price.toFixed(2)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default MealDetail; 