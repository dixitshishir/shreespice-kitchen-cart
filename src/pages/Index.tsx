import { useRef } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';

const Index = () => {
  const productsRef = useRef<HTMLDivElement>(null);

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero onShopNow={scrollToProducts} />
      <div ref={productsRef}>
        <ProductGrid />
      </div>
    </div>
  );
};

export default Index;
