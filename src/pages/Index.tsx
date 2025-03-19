
import React from 'react';
import { Toaster } from '@/components/ui/toaster';
import DateSelector from '@/components/DateSelector';
import HospitalSelector from '@/components/HospitalSelector';
import MealCard from '@/components/MealCard';
import OrderSummary from '@/components/OrderSummary';
import Header from '@/components/Header';
import { useOrder } from '@/contexts/OrderContext';

const Index = () => {
  const { meals } = useOrder();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <div className="space-y-6 animate-fade-in">
          {/* Welcome Section */}
          <section className="text-center max-w-2xl mx-auto mb-8">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Hospital Meal Delivery</h1>
            <p className="text-gray-600">
              Delicious, nutritious meals delivered directly to your hospital.
            </p>
          </section>
          
          {/* Delivery Details */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <DateSelector />
            <HospitalSelector />
          </section>
          
          {/* Meals Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-6">Today's Menu</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {meals.map((meal) => (
                <MealCard key={meal.id} meal={meal} />
              ))}
            </div>
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
