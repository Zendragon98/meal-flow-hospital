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

interface DateSelectorProps {
  onDateSelected?: (date: string) => void;
  initialDate?: string;
}

const DateSelector = ({ onDateSelected, initialDate }: DateSelectorProps = {}) => {
  const { date: contextDate, updateDate, cartItems, itemDates, meals } = useOrder();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    initialDate ? new Date(initialDate) : contextDate ? new Date(contextDate) : undefined
  );
  const [currentOrders, setCurrentOrders] = useState<{name: string, quantity: number}[]>([]);
  
  const activeDate = initialDate || contextDate;

  // Calculate current orders for this date
  useEffect(() => {
    if (activeDate && Object.keys(cartItems).length > 0) {
      // Filter items that are scheduled for this date
      const ordersForSelectedDate = Object.entries(cartItems)
        .filter(([mealId, quantity]) => {
          // Check if this item has a delivery date matching the active date
          const itemDate = itemDates[mealId] || contextDate;
          return quantity > 0 && itemDate === activeDate;
        })
        .map(([mealId, quantity]) => {
          const meal = meals.find(m => m.id.toString() === mealId);
          return { 
            name: meal ? meal.name : 'Unknown Meal',
            quantity 
          };
        });
      
      setCurrentOrders(ordersForSelectedDate);
    } else {
      setCurrentOrders([]);
    }
  }, [cartItems, activeDate, meals, itemDates, contextDate]);

  const handleDateSelect = (newDate: Date | undefined) => {
    if (newDate) {
      const formattedDate = format(newDate, 'yyyy-MM-dd');
      setSelectedDate(newDate);
      
      if (onDateSelected) {
        onDateSelected(formattedDate);
      } else {
        updateDate(formattedDate);
      }
    }
  };

  const handlePreviousDay = () => {
    if (selectedDate) {
      const prevDay = new Date(selectedDate);
      prevDay.setDate(prevDay.getDate() - 1);
      
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (prevDay >= today) {
        handleDateSelect(prevDay);
      }
    }
  };

  const handleNextDay = () => {
    if (selectedDate) {
      const nextDay = new Date(selectedDate);
      nextDay.setDate(nextDay.getDate() + 1);
      handleDateSelect(nextDay);
    }
  };

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
          onClick={handlePreviousDay}
        >
          <ChevronLeft size={14} />
        </Button>
        
        <h3 className="font-medium text-base">
          {activeDate ? formatDateForDisplay(activeDate) : 'Select a date'}
          {selectedDate && isToday(selectedDate) && (
            <Badge variant="outline" className="ml-2 text-xs bg-blue-50 border-blue-200 text-blue-600">Today</Badge>
          )}
        </h3>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="h-7 w-7"
          onClick={handleNextDay}
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
