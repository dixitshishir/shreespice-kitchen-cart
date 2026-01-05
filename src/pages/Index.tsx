import { useRef } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';
import Footer from '@/components/Footer';
import ProductAssistant from '@/components/ProductAssistant';

const Index = () => {
  const productsRef = useRef<HTMLDivElement>(null);

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background figma-wallpaper flex flex-col">
      <Header />
      <Hero onShopNow={scrollToProducts} />
      <div ref={productsRef} className="flex-1">
        <ProductGrid />
      </div>
      <Footer />
      <ProductAssistant />
    </div>
  );
};

export default Index;
