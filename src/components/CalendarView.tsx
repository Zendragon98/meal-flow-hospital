
import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { SCHEDULED_ORDERS, generateCalendarDays } from '@/lib/constants';

const CalendarView = () => {
  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  
  const { daysInMonth, firstDayOfMonth, highlightedDays } = generateCalendarDays(currentMonth, currentYear);
  
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  // Navigate to previous month
  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };
  
  // Navigate to next month
  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };
  
  // Find order for a specific day
  const getOrderForDay = (day: number) => {
    const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return SCHEDULED_ORDERS.find(order => order.date === dateString);
  };

  return (
    <div className="bg-white rounded-xl shadow-elegant p-6 border border-gray-100">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-medium text-lg flex items-center">
          <CalendarIcon size={18} className="mr-2 text-primary" />
          {monthNames[currentMonth]} {currentYear}
        </h3>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={prevMonth}
            className="h-8 w-8"
          >
            <ChevronLeft size={16} />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={nextMonth}
            className="h-8 w-8"
          >
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>
      
      {/* Calendar Grid */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-gray-500 text-xs">
              {daysOfWeek.map(day => (
                <th key={day} className="py-2 text-center font-medium">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: Math.ceil((daysInMonth + firstDayOfMonth) / 7) }).map((_, weekIndex) => (
              <tr key={weekIndex}>
                {Array.from({ length: 7 }).map((_, dayIndex) => {
                  const dayNumber = weekIndex * 7 + dayIndex + 1 - firstDayOfMonth;
                  const isToday = 
                    dayNumber === currentDate.getDate() && 
                    currentMonth === currentDate.getMonth() && 
                    currentYear === currentDate.getFullYear();
                  
                  const isHighlighted = highlightedDays.includes(dayNumber);
                  const order = getOrderForDay(dayNumber);
                  
                  if (dayNumber <= 0 || dayNumber > daysInMonth) {
                    return <td key={dayIndex} className="p-2 text-center"></td>;
                  }
                  
                  return (
                    <td 
                      key={dayIndex} 
                      className={`h-12 w-12 p-0 text-center relative
                        ${isToday ? 'bg-primary/10 text-primary font-medium' : ''}
                        ${order ? 'bg-green-50' : ''}
                      `}
                    >
                      {order ? (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button className="w-full h-full flex items-center justify-center rounded-md hover:bg-green-100">
                                <span className="relative">
                                  {dayNumber}
                                  <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-500 rounded-full"></span>
                                </span>
                              </button>
                            </TooltipTrigger>
                            <TooltipContent side="right" className="p-3 max-w-xs bg-white border border-gray-200 shadow-lg rounded-lg">
                              <div className="space-y-1">
                                <p className="font-medium">{order.meal}</p>
                                <p className="text-sm text-gray-600">{order.time} • {order.hospital}</p>
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ) : (
                        <span className={`w-full h-full flex items-center justify-center ${isHighlighted ? 'text-blue-600 font-medium' : ''}`}>
                          {dayNumber}
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CalendarView;
