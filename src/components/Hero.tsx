import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import heroImage from '@/assets/south-indian-spices-hero.jpg';
import ProductAssistant from './ProductAssistant';

interface HeroProps {
  onShopNow: () => void;
}

const Hero = ({ onShopNow }: HeroProps) => {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-black/40" />
      </div>
      
      <div className="relative z-10 container text-center text-white max-w-5xl px-6">
        <div className="space-y-8 animate-fade-in">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-primary/15 backdrop-blur-sm border border-primary/30 rounded-full px-4 py-2 text-sm font-medium text-primary animate-warm-pulse">
              <span>🌿</span>
              <span>100% Natural & Homemade South Indian Spices</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight">
              Authentic Spices from
              <span className="block bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Our Family Kitchen
              </span>
            </h1>
          </div>
          
          <p className="text-lg sm:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Experience the rich flavors of traditional homemade spice powders, 
            crafted with love using time-honored family recipes.
          </p>
          
          <div className="flex flex-col gap-4 justify-center items-center max-w-md mx-auto sm:max-w-none pt-4">
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Button
                onClick={() => window.open('https://chat.whatsapp.com/K2G6FniggftGsF7G1fh51D?mode=ems_copy_h_t', '_blank')}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white border border-blue-500/20 px-6 py-4 rounded-xl font-medium"
              >
                <MessageCircle className="h-5 w-5" />
                <span>Join Community</span>
              </Button>
              
              <Button
                onClick={() => {
                  const motherPhone = '9986918992';
                  const message = '👋 Hello! I would like to know more about Shree Spices and Snacks products and place an order.';
                  window.open(`https://wa.me/${motherPhone}?text=${encodeURIComponent(message)}`, '_blank');
                }}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white border border-green-500/20 px-6 py-4 rounded-xl font-medium"
              >
                <MessageCircle className="h-5 w-5" />
                <span>Contact Us</span>
              </Button>
            </div>
            
            <Button 
              size="lg" 
              onClick={() => navigate('/story')}
              className="w-full sm:w-auto btn-primary font-semibold text-base px-8 py-4 rounded-xl"
            >
              Learn Our Story
            </Button>
          </div>
          
          {/* AI Product Assistant */}
          <div className="pt-8">
            <ProductAssistant />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;