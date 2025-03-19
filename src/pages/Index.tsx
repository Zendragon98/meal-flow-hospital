import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Flame, Star, CheckCircle2 } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { useOrder } from '@/contexts/OrderContext';

const Index = () => {
  const { meals } = useOrder();
  
  // Featured meals (first 3 from the order context)
  const featuredMeals = meals.slice(0, 3);
  
  // Benefits of using the service
  const benefits = [
    {
      title: 'Convenient Delivery',
      description: 'Meals delivered directly to your hospital, saving you time during busy shifts.',
      icon: <Clock className="h-10 w-10 text-brand-500" />
    },
    {
      title: 'Nutritionally Balanced',
      description: 'Each meal is designed to provide sustained energy for healthcare professionals.',
      icon: <Flame className="h-10 w-10 text-brand-500" />
    },
    {
      title: 'Local Favorites',
      description: 'Enjoy Singapore\'s most beloved dishes, prepared fresh for medical staff.',
      icon: <Star className="h-10 w-10 text-brand-500" />
    }
  ];

  return (
    <PageLayout fullWidth>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-500/10 via-background to-background py-20 sm:py-32">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="inline-block bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 px-4 py-1 rounded-full text-sm font-medium mb-2">
                For Healthcare Professionals
              </div>
              <div className="mb-4">
                <img src="/KCKLogo.svg" alt="KCK Logo" className="h-16 w-auto" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
                Delicious Meals Delivered to Your Hospital
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Specially crafted meals for night shift healthcare workers, delivered right to your hospital when you need them most.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <Link to="/menu">
                    Browse Menu
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/checkout">
                    Schedule Delivery
                  </Link>
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="/meals/hainanese-chicken-rice.jpg" 
                  alt="Featured meal" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-900 p-4 rounded-lg shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="h-12 w-12 rounded-full bg-brand-500/10 flex items-center justify-center">
                    <CheckCircle2 className="h-6 w-6 text-brand-500" />
                  </div>
                  <div>
                    <p className="font-medium">Trusted by</p>
                    <p className="text-brand-500 font-bold">500+ Healthcare Workers</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Featured Meals Section */}
      <section className="py-20 container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Meals</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our most popular dishes, perfect for enjoying during your breaks.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredMeals.map((meal, index) => (
            <motion.div
              key={meal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="aspect-[4/3] relative">
                <img 
                  src={meal.image} 
                  alt={meal.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm px-3 py-1 rounded-full font-medium">
                  ${meal.price.toFixed(2)}
                </div>
              </div>
              
              <div className="p-5">
                <h3 className="font-bold text-lg mb-2">{meal.name}</h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {meal.description}
                </p>
                
                <div className="flex justify-between items-center">
                  <div className="flex gap-3 text-sm text-muted-foreground">
                    {meal.prepTime && (
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {meal.prepTime}
                      </div>
                    )}
                    {meal.calories && (
                      <div className="flex items-center">
                        <Flame className="h-4 w-4 mr-1" />
                        {meal.calories} cal
                      </div>
                    )}
                  </div>
                  
                  <Button asChild variant="outline" size="sm">
                    <Link to={`/meal/${meal.id}`}>
                      View Details
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Button asChild>
            <Link to="/menu">
              View All Meals
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Healthcare Workers Love Us</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We understand the unique challenges of hospital work schedules. Our service is designed specifically for healthcare professionals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-background rounded-xl p-6 shadow-sm"
              >
                <div className="mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Button size="lg" asChild>
              <Link to="/menu">
                Start Ordering Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hear from healthcare professionals who rely on KCK for their shifts.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              name: "Dr. Sarah Tan",
              role: "Emergency Physician",
              text: "KCK has been a lifesaver during my overnight shifts. The food is delicious and delivered right to the hospital."
            },
            {
              name: "Nurse Ahmad",
              role: "ICU Nurse",
              text: "I appreciate having access to quality meals during night shifts. The ordering process is simple, and the food always arrives on time."
            },
            {
              name: "Dr. Li Wei",
              role: "Resident Doctor",
              text: "Having nutritious food options delivered to the hospital has improved my energy levels during long shifts. Highly recommended!"
            }
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card p-6 rounded-xl shadow-sm border"
            >
              <div className="flex items-center mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="italic text-muted-foreground mb-4">"{testimonial.text}"</p>
              <div className="font-medium">{testimonial.name}</div>
              <div className="text-sm text-muted-foreground">{testimonial.role}</div>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-brand-500 text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Order?</h2>
          <p className="max-w-2xl mx-auto mb-8 text-white/80">
            Join hundreds of healthcare professionals who trust KCK for their hospital meal deliveries.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/menu">
              Get Started Today
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </PageLayout>
  );
};

export default Index;
