import { Button } from '@/components/ui/button';
import { ArrowDown, ShoppingBag } from 'lucide-react';
import heroImage from '@/assets/south-indian-spices-hero.jpg';

interface HeroProps {
  onShopNow: () => void;
}

const Hero = ({ onShopNow }: HeroProps) => {
  return (
    <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/50" />
      </div>
      
      <div className="relative z-10 container text-center text-white max-w-4xl px-6">
        <div className="space-y-6 animate-fade-in">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2.5 text-sm font-medium">
              <span className="text-base">🌿</span>
              <span className="text-white/95">100% Natural & Homemade South Indian Spices</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Authentic Spices from
              <span className="block bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent mt-1">
                Our Family Kitchen
              </span>
            </h1>
          </div>
          
          <p className="text-base sm:text-lg lg:text-xl text-white/85 max-w-2xl mx-auto leading-relaxed">
            Experience the rich flavors of traditional homemade spice powders, 
            crafted with love using time-honored family recipes.
          </p>
          
        </div>
      </div>
    </section>
  );
};

export default Hero;