
import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog';
import { useOrder } from '@/contexts/OrderContext';
import { formatDateForDisplay } from '@/lib/constants';

const DateSelector = () => {
  const { date, updateDate } = useOrder();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    date ? new Date(date) : undefined
  );

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  const handleSave = () => {
    if (selectedDate) {
      updateDate(format(selectedDate, 'yyyy-MM-dd'));
    }
  };

  return (
    <Dialog>
      <div className="bg-white rounded-2xl shadow-elegant p-5 border border-gray-100 flex flex-col h-full transition-all hover:shadow-card">
        <div className="flex items-center mb-2">
          <Calendar size={18} className="mr-2 text-primary" />
          <span className="font-medium text-sm text-gray-500">Delivery Date</span>
        </div>
        <div className="mt-1 mb-4">
          <h3 className="font-medium text-lg">{formatDateForDisplay(date)}</h3>
        </div>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="mt-auto">
            Change Date
          </Button>
        </DialogTrigger>
      </div>
      
      <DialogContent className="sm:max-w-md glassmorphism">
        <DialogHeader>
          <DialogTitle>Select Delivery Date</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-4 py-4">
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
        </div>
        <div className="flex justify-end">
          <DialogClose asChild>
            <Button onClick={handleSave}>Save</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DateSelector;
