
import React, { useState } from 'react';
import Header from '@/components/Header';
import MealCard from '@/components/MealCard';
import { useOrder } from '@/contexts/OrderContext';
import { Button } from '@/components/ui/button';

const Menu = () => {
  const { meals } = useOrder();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Extract unique categories
  const categories = Array.from(new Set(meals.map(meal => meal.category || 'Other')));
  
  // Filter meals by selected category
  const filteredMeals = selectedCategory 
    ? meals.filter(meal => meal.category === selectedCategory)
    : meals;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <section className="animate-fade-in">
          <h1 className="text-3xl font-bold tracking-tight mb-6">Our Menu</h1>
          <p className="text-gray-600 max-w-3xl mb-8">
            Explore our selection of authentic Singaporean cuisine, specially designed for hospital deliveries. 
            Each meal is prepared with fresh ingredients and balanced nutrition in mind.
          </p>
          
          <div className="flex flex-wrap gap-2 mb-8">
            <Button 
              variant={selectedCategory === null ? "default" : "outline"} 
              onClick={() => setSelectedCategory(null)}
            >
              All
            </Button>
            {categories.map(category => (
              <Button 
                key={category} 
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMeals.map((meal) => (
              <MealCard key={meal.id} meal={meal} />
            ))}
          </div>
        </section>
      </main>
      
      <footer className="py-8 mt-auto border-t bg-white">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} KCK Food. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Menu;
