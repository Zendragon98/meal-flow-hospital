import React, { useState } from 'react';
import { Toaster } from '@/components/ui/toaster';
import DateSelector from '@/components/DateSelector';
import HospitalSelector from '@/components/HospitalSelector';
import MealCard from '@/components/MealCard';
import OrderSummary from '@/components/OrderSummary';
import Header from '@/components/Header';
import { useOrder } from '@/contexts/OrderContext';
import { Button } from '@/components/ui/button';

const Index = () => {
  const { meals } = useOrder();
  const [displayedMeals, setDisplayedMeals] = useState(meals.slice(0, 6));
  const [showAllMeals, setShowAllMeals] = useState(false);

  const handleShowMore = () => {
    if (showAllMeals) {
      setDisplayedMeals(meals.slice(0, 6));
    } else {
      setDisplayedMeals(meals);
    }
    setShowAllMeals(!showAllMeals);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <div className="space-y-6 animate-fade-in">
          {/* Welcome Section with Background */}
          <section 
            className="relative text-center py-16 px-6 rounded-2xl overflow-hidden mb-8"
            style={{
              backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(/hospital-food-bg.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="relative z-10 max-w-2xl mx-auto">
              <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">Hospital Meal Delivery</h1>
              <p className="text-gray-200">
                Authentic Singaporean cuisine delivered directly to your hospital.
              </p>
            </div>
          </section>
          
          {/* Delivery Details */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <DateSelector />
            <HospitalSelector />
          </section>
          
          {/* Meals Section */}
          <section className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Today's Menu</h2>
              <Button 
                variant="outline" 
                onClick={() => window.location.href = '/menu'}
              >
                View Full Menu
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedMeals.map((meal) => (
                <MealCard key={meal.id} meal={meal} />
              ))}
            </div>
            {meals.length > 6 && (
              <div className="text-center mt-8">
                <Button onClick={handleShowMore}>
                  {showAllMeals ? "Show Less" : "Show More"}
                </Button>
              </div>
            )}
          </section>
          
          {/* Order Summary */}
          <section className="max-w-md mx-auto">
            <OrderSummary />
          </section>
        </div>
      </main>
      
      <footer className="py-8 mt-auto border-t bg-white">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} KCK Food. All rights reserved.
        </div>
      </footer>
      
      <Toaster />
    </div>
  );
};

export default Index;
