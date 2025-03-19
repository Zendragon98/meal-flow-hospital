import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import MealCard from '@/components/menu/MealCard';
import CategoryFilter from '@/components/menu/CategoryFilter';
import { Input } from '@/components/ui/input';
import { useOrder } from '@/contexts/OrderContext';

const Menu = () => {
  const { meals } = useOrder();
  const [filteredMeals, setFilteredMeals] = useState(meals);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // Extract unique categories from meals
  const categories = ['All', ...Array.from(new Set(meals.map(meal => meal.category)))];

  // Filter meals based on search term and category
  useEffect(() => {
    let filtered = meals;

    if (searchTerm) {
      filtered = filtered.filter(meal =>
        meal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        meal.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (meal.dietary && meal.dietary.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
      );
    }

    if (activeCategory !== 'All') {
      filtered = filtered.filter(meal => meal.category === activeCategory);
    }

    setFilteredMeals(filtered);
  }, [searchTerm, activeCategory, meals]);

  return (
    <PageLayout>
      <div className="mb-12">
        <h1 className="text-3xl font-bold mb-4">Our Menu</h1>
        <p className="text-muted-foreground max-w-3xl">
          Specially crafted meals designed with night shift healthcare professionals in mind.
          All meals are nutritious, easy to digest during odd hours, and deliver sustained energy.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search meals, ingredients, or dietary..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-gray-50 dark:bg-gray-800/30 border-gray-200 dark:border-gray-700"
            />
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <CategoryFilter
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {/* Results */}
      {filteredMeals.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center py-16 bg-gray-50 dark:bg-gray-800/30 rounded-lg"
        >
          <p className="text-xl font-medium mb-2">No meals found</p>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search or filter criteria
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setActiveCategory('All');
            }}
            className="text-brand-500 hover:text-brand-600 font-medium"
          >
            Reset filters
          </button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMeals.map((meal, index) => (
            <MealCard key={meal.id} meal={meal} index={index} />
          ))}
        </div>
      )}
    </PageLayout>
  );
};

export default Menu;
