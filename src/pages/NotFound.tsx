import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Search } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  return (
    <PageLayout>
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mb-8"
        >
          <div className="w-40 h-40 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center">
            <Search className="h-20 w-20 text-brand-500" />
          </div>
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, -5, 5, -5, 5, 0] }}
            transition={{ delay: 0.5, duration: 1, times: [0, 0.2, 0.4, 0.6, 0.8, 1] }}
            className="absolute -bottom-4 -right-4 bg-red-100 dark:bg-red-900/30 h-16 w-16 rounded-full flex items-center justify-center"
          >
            <span className="text-3xl font-bold text-red-500">?</span>
          </motion.div>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl font-bold mb-4"
        >
          Page Not Found
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-muted-foreground mb-8 max-w-md"
        >
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Button asChild size="lg">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Home
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/menu">
              Browse Menu
            </Link>
          </Button>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default NotFound;
