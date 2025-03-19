import React from 'react';
import { motion } from 'framer-motion';
import { User, Award, Clock, CreditCard, ShoppingBag } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { useOrder } from '@/contexts/OrderContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';

const Profile = () => {
  const { loyaltyPoints } = useOrder();
  
  // Calculate tier based on loyalty points
  const getTier = () => {
    if (loyaltyPoints >= 500) return { name: 'Platinum', progress: 100 };
    if (loyaltyPoints >= 200) return { name: 'Gold', progress: 40 + (loyaltyPoints - 200) / 300 * 60 };
    if (loyaltyPoints >= 50) return { name: 'Silver', progress: loyaltyPoints / 200 * 40 };
    return { name: 'Bronze', progress: loyaltyPoints / 50 * 10 };
  };
  
  const tier = getTier();
  
  // Mock order history
  const recentOrders = [
    { id: 'ORD-001', date: '2023-10-15', items: 3, total: 32.99 },
    { id: 'ORD-002', date: '2023-09-28', items: 2, total: 26.50 },
    { id: 'ORD-003', date: '2023-09-10', items: 4, total: 44.75 }
  ];

  return (
    <PageLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Profile</h1>
        <p className="text-muted-foreground">
          View your profile information and order history
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Info */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="bg-brand-500/10 text-brand-500">
                  <User className="h-8 w-8" />
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>Jane Smith</CardTitle>
                <CardDescription>Healthcare Professional</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Email</p>
                <p>jane.smith@hospital.com</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Phone</p>
                <p>+65 9123 4567</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Default Hospital</p>
                <p>Sengkang General Hospital</p>
              </div>
            </CardContent>
          </Card>
          
          {/* Loyalty Card */}
          <Card className="mt-6 bg-gradient-to-br from-brand-500 to-brand-700 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Loyalty Program
              </CardTitle>
              <CardDescription className="text-white/80">
                Earn points with every order
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{tier.name} Member</span>
                  <span className="text-sm">{loyaltyPoints} points</span>
                </div>
                <Progress value={tier.progress} className="h-2 bg-white/20" />
              </div>
              
              <div className="text-sm text-white/80">
                {loyaltyPoints >= 500 ? (
                  "You've reached our highest tier! Enjoy maximum benefits."
                ) : (
                  `${loyaltyPoints >= 200 ? 300 - (loyaltyPoints - 200) : 200 - loyaltyPoints} more points until ${loyaltyPoints >= 200 ? 'Platinum' : 'Gold'} tier`
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Recent Orders */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                Recent Orders
              </CardTitle>
              <CardDescription>
                Your order history from the past 90 days
              </CardDescription>
            </CardHeader>
            <CardContent>
              {recentOrders.length > 0 ? (
                <div className="space-y-4">
                  {recentOrders.map(order => (
                    <div key={order.id} className="bg-muted/50 p-4 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium">{order.id}</h3>
                          <div className="flex items-center text-sm text-muted-foreground gap-2">
                            <Clock className="h-3 w-3" />
                            <span>{new Date(order.date).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">${order.total.toFixed(2)}</div>
                          <div className="text-sm text-muted-foreground">{order.items} item{order.items !== 1 && 's'}</div>
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 mt-2">
                        <button className="text-sm font-medium text-brand-500 hover:text-brand-600">
                          View Details
                        </button>
                        <button className="text-sm font-medium text-brand-500 hover:text-brand-600">
                          Reorder
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-2">No recent orders</p>
                  <p className="text-sm text-muted-foreground">
                    Your order history will appear here once you place orders.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Payment Methods */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Methods
              </CardTitle>
              <CardDescription>
                Manage your payment options
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/50 p-4 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-14 bg-gray-900 rounded flex items-center justify-center text-white text-xs font-bold">
                    VISA
                  </div>
                  <div>
                    <p className="font-medium">Visa ending in 4242</p>
                    <p className="text-sm text-muted-foreground">Expires 12/25</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="text-sm font-medium text-muted-foreground hover:text-foreground">
                    Edit
                  </button>
                  <span className="text-muted-foreground">|</span>
                  <button className="text-sm font-medium text-destructive hover:text-destructive/80">
                    Remove
                  </button>
                </div>
              </div>
              
              <button className="w-full mt-4 text-sm font-medium text-brand-500 hover:text-brand-600">
                + Add new payment method
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default Profile; 