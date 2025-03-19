
import React, { useState, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { format, isToday, isSameDay } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { useOrder } from '@/contexts/OrderContext';
import { formatDateForDisplay } from '@/lib/constants';

const DateSelector = () => {
  const { date, updateDate, cartItems, meals } = useOrder();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    date ? new Date(date) : undefined
  );
  const [dailyOrders, setDailyOrders] = useState<{[key: string]: {name: string, quantity: number}[]}>({});

  // Calculate orders for each date
  useEffect(() => {
    const ordersByDate: {[key: string]: {name: string, quantity: number}[]} = {};
    
    if (date && Object.keys(cartItems).length > 0) {
      const currentDate = format(new Date(date), 'yyyy-MM-dd');
      const orders = Object.entries(cartItems).map(([mealId, quantity]) => {
        const meal = meals.find(m => m.id === mealId);
        return { 
          name: meal ? meal.name : 'Unknown Meal',
          quantity 
        };
      }).filter(order => order.quantity > 0);
      
      if (orders.length > 0) {
        ordersByDate[currentDate] = orders;
      }
    }
    
    setDailyOrders(ordersByDate);
  }, [cartItems, date, meals]);

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      updateDate(format(date, 'yyyy-MM-dd'));
    }
  };

  // Format current orders for display
  const getCurrentOrders = () => {
    if (!date) return [];
    
    const currentDate = format(new Date(date), 'yyyy-MM-dd');
    return dailyOrders[currentDate] || [];
  };

  const currentOrders = getCurrentOrders();

  return (
    <div className="bg-white rounded-2xl shadow-elegant p-5 border border-gray-100 flex flex-col h-full transition-all hover:shadow-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Calendar size={18} className="mr-2 text-primary" />
          <span className="font-medium text-sm text-gray-500">Delivery Date</span>
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 px-2">
              <Calendar size={14} className="mr-1" />
              Change
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <CalendarComponent
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              disabled={(date) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return date < today;
              }}
              className="p-3 pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex items-center justify-between mb-3">
        <Button 
          variant="outline" 
          size="icon" 
          className="h-7 w-7" 
          onClick={() => {
            if (selectedDate) {
              const prevDay = new Date(selectedDate);
              prevDay.setDate(prevDay.getDate() - 1);
              
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              
              if (prevDay >= today) {
                handleDateSelect(prevDay);
              }
            }
          }}
        >
          <ChevronLeft size={14} />
        </Button>
        
        <h3 className="font-medium text-base">
          {date ? formatDateForDisplay(date) : 'Select a date'}
          {selectedDate && isToday(selectedDate) && (
            <Badge variant="outline" className="ml-2 text-xs bg-blue-50 border-blue-200 text-blue-600">Today</Badge>
          )}
        </h3>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="h-7 w-7"
          onClick={() => {
            if (selectedDate) {
              const nextDay = new Date(selectedDate);
              nextDay.setDate(nextDay.getDate() + 1);
              handleDateSelect(nextDay);
            }
          }}
        >
          <ChevronRight size={14} />
        </Button>
      </div>

      <div className="mt-2 border-t pt-3">
        <h4 className="text-sm font-medium mb-2 flex items-center text-gray-600">
          <Clock size={14} className="mr-1" /> Orders for this day
        </h4>
        
        {currentOrders.length > 0 ? (
          <ul className="space-y-2 text-sm max-h-28 overflow-y-auto pr-1">
            {currentOrders.map((order, index) => (
              <li key={index} className="flex justify-between bg-gray-50 p-2 rounded-md">
                <span className="truncate mr-2">{order.name}</span>
                <Badge variant="secondary" className="shrink-0">x{order.quantity}</Badge>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500 italic">No orders yet</p>
        )}
      </div>
    </div>
  );
};

export default DateSelector;
