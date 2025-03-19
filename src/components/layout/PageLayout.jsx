import React from 'react';
import Header from '@/components/Header';

const PageLayout = ({ children, fullWidth = false }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className={`flex-1 py-6 ${fullWidth ? '' : 'container mx-auto px-4'}`}>
        {children}
      </main>
      <footer className="py-6 bg-muted/30 border-t">
        <div className="container mx-auto px-4">
          <div className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} KCK Food Delivery. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PageLayout; 