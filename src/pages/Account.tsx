
import React, { useState } from 'react';
import { User, Settings, CreditCard, LogOut, Gift, History } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { useOrder } from '@/contexts/OrderContext';

const Account = () => {
  const { loyaltyPoints } = useOrder();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      setIsLoggedIn(true);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setName('');
    setPassword('');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <section className="animate-fade-in">
          <h1 className="text-3xl font-bold tracking-tight mb-6">Your Account</h1>
          
          {isLoggedIn ? (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-elegant border border-gray-100 p-6 mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mb-4 sm:mb-0 sm:mr-4">
                    <User size={32} className="text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold">{name}</h2>
                    <p className="text-gray-600">Member since {new Date().toLocaleDateString()}</p>
                  </div>
                  <div className="sm:ml-auto mt-4 sm:mt-0">
                    <Button variant="outline" size="sm" onClick={handleLogout} className="space-x-2">
                      <LogOut size={16} />
                      <span>Sign Out</span>
                    </Button>
                  </div>
                </div>
              </div>
              
              <Tabs defaultValue="loyaltyPoints">
                <TabsList className="grid grid-cols-3 mb-8">
                  <TabsTrigger value="loyaltyPoints">Loyalty Points</TabsTrigger>
                  <TabsTrigger value="orderHistory">Order History</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                
                <TabsContent value="loyaltyPoints" className="bg-white rounded-2xl shadow-elegant p-6 border border-gray-100">
                  <div className="flex items-center mb-6">
                    <Gift size={20} className="mr-3 text-primary" />
                    <h2 className="text-xl font-semibold">Your Loyalty Points</h2>
                  </div>
                  
                  <div className="flex items-center justify-center py-8 mb-6">
                    <div className="bg-gray-50 h-36 w-36 rounded-full flex items-center justify-center border-8 border-primary/20">
                      <div className="text-center">
                        <span className="block text-4xl font-bold text-primary">{loyaltyPoints}</span>
                        <span className="text-sm text-gray-500">points</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 text-center">
                      <h3 className="font-medium">100 Points</h3>
                      <p className="text-sm text-gray-600 mt-1">10% discount</p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-2" 
                        disabled={loyaltyPoints < 100}
                      >
                        Redeem
                      </Button>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 text-center">
                      <h3 className="font-medium">250 Points</h3>
                      <p className="text-sm text-gray-600 mt-1">Free dessert</p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-2" 
                        disabled={loyaltyPoints < 250}
                      >
                        Redeem
                      </Button>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 text-center">
                      <h3 className="font-medium">500 Points</h3>
                      <p className="text-sm text-gray-600 mt-1">Free meal</p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-2" 
                        disabled={loyaltyPoints < 500}
                      >
                        Redeem
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="orderHistory" className="bg-white rounded-2xl shadow-elegant p-6 border border-gray-100">
                  <div className="flex items-center mb-6">
                    <History size={20} className="mr-3 text-primary" />
                    <h2 className="text-xl font-semibold">Order History</h2>
                  </div>
                  
                  <div className="py-8 text-center text-gray-500">
                    <p>You don't have any past orders yet.</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="settings" className="bg-white rounded-2xl shadow-elegant p-6 border border-gray-100">
                  <div className="flex items-center mb-6">
                    <Settings size={20} className="mr-3 text-primary" />
                    <h2 className="text-xl font-semibold">Account Settings</h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Personal Information</h3>
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label className="text-sm text-gray-500">Full Name</label>
                          <Input value={name} onChange={(e) => setName(e.target.value)} className="mt-1" />
                        </div>
                        <div>
                          <label className="text-sm text-gray-500">Email</label>
                          <Input type="email" className="mt-1" />
                        </div>
                        <div>
                          <label className="text-sm text-gray-500">Phone</label>
                          <Input type="tel" className="mt-1" />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-2">Payment Methods</h3>
                      <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between border border-gray-100">
                        <div className="flex items-center">
                          <CreditCard size={20} className="mr-3 text-gray-500" />
                          <span>Add a payment method</span>
                        </div>
                        <Button variant="outline" size="sm">Add</Button>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button>Save Changes</Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            <div className="max-w-md mx-auto bg-white rounded-2xl shadow-elegant p-8 border border-gray-100 animate-fade-in">
              <h2 className="text-2xl font-semibold mb-6 text-center">Sign In</h2>
              
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Name</label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="mt-1"
                    required
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Password</label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="mt-1"
                  />
                </div>
                
                <Button type="submit" className="w-full">
                  Sign In
                </Button>
              </form>
            </div>
          )}
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

export default Account;
