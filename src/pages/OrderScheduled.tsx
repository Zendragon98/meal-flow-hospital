
import React from 'react';
import { Clock, MapPin, Calendar, ChevronRight } from 'lucide-react';
import Header from '@/components/Header';
import CalendarView from '@/components/CalendarView';
import { formatDateForDisplay, SCHEDULED_ORDERS } from '@/lib/constants';

const OrderScheduled = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <section className="animate-fade-in">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Scheduled Orders</h1>
          <p className="text-gray-600 mb-8">
            View your upcoming meal deliveries and scheduled orders.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order List */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-semibold mb-4">Upcoming Deliveries</h2>
              
              <div className="space-y-4">
                {SCHEDULED_ORDERS.map((order, index) => (
                  <div 
                    key={index} 
                    className="bg-white rounded-xl shadow-elegant p-5 border border-gray-100 transition-all hover:shadow-card"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium mb-2">{order.meal}</h3>
                        <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-500 space-y-2 sm:space-y-0 sm:space-x-4">
                          <div className="flex items-center">
                            <Calendar size={14} className="mr-1.5 text-gray-400" />
                            <span>{formatDateForDisplay(order.date)}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock size={14} className="mr-1.5 text-gray-400" />
                            <span>{order.time}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin size={14} className="mr-1.5 text-gray-400" />
                            <span>{order.hospital}</span>
                          </div>
                        </div>
                      </div>
                      <button className="group p-2 rounded-full hover:bg-gray-100">
                        <ChevronRight size={18} className="text-gray-400 group-hover:text-gray-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Calendar View */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Calendar</h2>
              <CalendarView />
            </div>
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

export default OrderScheduled;
