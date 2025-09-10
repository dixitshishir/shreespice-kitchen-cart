import { useRef } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';
import Footer from '@/components/Footer';

const Index = () => {
  const productsRef = useRef<HTMLDivElement>(null);

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background spice-pattern traditional-border flex flex-col">
      <Header />
      <Hero onShopNow={scrollToProducts} />
      <div ref={productsRef} className="flex-1">
        <ProductGrid />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
