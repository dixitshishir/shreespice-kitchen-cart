import { useState, useRef } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';
import Cart from '@/components/Cart';

const Index = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const productsRef = useRef<HTMLDivElement>(null);

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onCartClick={() => setIsCartOpen(true)} />
      <Hero onShopNow={scrollToProducts} />
      <div ref={productsRef}>
        <ProductGrid />
      </div>
      <Cart isOpen={isCartOpen} onOpenChange={setIsCartOpen} />
    </div>
  );
};

export default Index;
