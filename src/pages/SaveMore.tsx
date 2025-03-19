import React from 'react';
import { Award, Percent, Users, Gift } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { VALID_REFERRAL_CODE } from '@/lib/constants';

const SaveMore = () => {
  return (
    <PageLayout>
      <section className="animate-fade-in">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Save More</h1>
          <p className="text-gray-600">
            Discover ways to save on your meal orders with our special offers and loyalty program.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Referral Program */}
          <div className="bg-white rounded-2xl shadow-elegant p-8 border border-gray-100 transition-all hover:shadow-card">
            <div className="flex items-center mb-6">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <Users size={24} className="text-blue-600" />
              </div>
              <h2 className="text-2xl font-semibold">Referral Program</h2>
            </div>
            
            <p className="text-gray-600 mb-6">
              Invite your friends and family to use our meal delivery service and both of you will receive a 10% discount on your orders.
            </p>
            
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <p className="text-blue-800 font-medium">
                Your referral code:
              </p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-2xl font-bold text-blue-700">{VALID_REFERRAL_CODE}</span>
                <button className="text-sm text-blue-700 font-medium hover:text-blue-900 transition-colors">
                  Copy
                </button>
              </div>
            </div>
          </div>
          
          {/* Bulk Order Discount */}
          <div className="bg-white rounded-2xl shadow-elegant p-8 border border-gray-100 transition-all hover:shadow-card">
            <div className="flex items-center mb-6">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <Percent size={24} className="text-green-600" />
              </div>
              <h2 className="text-2xl font-semibold">Bulk Order Discount</h2>
            </div>
            
            <p className="text-gray-600 mb-6">
              Order more than 10 meals in a single order and automatically receive a 5% discount on your entire order.
            </p>
            
            <div className="bg-green-50 rounded-lg p-4 border border-green-100">
              <p className="text-green-800 font-medium">
                5% off
              </p>
              <p className="text-green-700 text-sm mt-1">
                Automatically applied to orders with more than 10 items
              </p>
            </div>
          </div>
        </div>
        
        {/* Loyalty Program */}
        <div className="bg-white rounded-2xl shadow-elegant p-8 border border-gray-100 max-w-3xl mx-auto">
          <div className="flex items-center mb-6">
            <div className="bg-purple-100 p-3 rounded-full mr-4">
              <Award size={24} className="text-purple-600" />
            </div>
            <h2 className="text-2xl font-semibold">Loyalty Program</h2>
          </div>
          
          <p className="text-gray-600 mb-8">
            Earn points with every purchase and unlock exclusive rewards. For every dollar spent, you'll earn one loyalty point.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 text-center">
              <div className="bg-white h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                <Gift size={20} className="text-gray-700" />
              </div>
              <h3 className="font-medium">100 Points</h3>
              <p className="text-sm text-gray-600 mt-1">10% discount</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 text-center">
              <div className="bg-white h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                <Gift size={20} className="text-gray-700" />
              </div>
              <h3 className="font-medium">250 Points</h3>
              <p className="text-sm text-gray-600 mt-1">Free dessert</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 text-center">
              <div className="bg-white h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                <Gift size={20} className="text-gray-700" />
              </div>
              <h3 className="font-medium">500 Points</h3>
              <p className="text-sm text-gray-600 mt-1">Free meal</p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default SaveMore;
