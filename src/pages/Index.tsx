import { useRef, useCallback, useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';
import Footer from '@/components/Footer';
import ProductAssistant from '@/components/ProductAssistant';
import FloatingEmojis from '@/components/FloatingEmojis';
import MobileCartBar from '@/components/MobileCartBar';
import useVisibilityRefresh from '@/hooks/useVisibilityRefresh';

const Index = () => {
  const productsRef = useRef<HTMLDivElement>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Refresh components when user returns to the page (e.g., after WhatsApp redirect)
  const handleVisibilityChange = useCallback(() => {
    setRefreshKey(prev => prev + 1);
  }, []);

  useVisibilityRefresh(handleVisibilityChange);

  return (
    <div className="min-h-screen bg-background figma-wallpaper flex flex-col" key={refreshKey}>
      <FloatingEmojis />
      <Header />
      <Hero onShopNow={scrollToProducts} />
      <div ref={productsRef} className="flex-1 relative z-10">
        <ProductGrid />
      </div>
      <Footer />
      <ProductAssistant />
      <MobileCartBar />
    </div>
  );
};

export default Index;
