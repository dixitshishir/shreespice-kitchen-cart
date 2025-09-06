import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import heroImage from '@/assets/hero-spices.jpg';

interface HeroProps {
  onShopNow: () => void;
}

const Hero = ({ onShopNow }: HeroProps) => {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
      </div>
      
      <div className="relative z-10 container text-center text-white max-w-4xl px-4">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
          Authentic Spices from
          <span className="block bg-gradient-to-r from-saffron to-accent bg-clip-text text-transparent">
            Our Family Kitchen
          </span>
        </h1>
        
        <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-gray-200 max-w-2xl mx-auto">
          Experience the rich flavors of traditional homemade spice powders, 
          crafted with love using time-honored family recipes.
        </p>
        
        <div className="flex flex-col gap-3 sm:gap-4 justify-center items-center max-w-sm mx-auto sm:max-w-none">
          <Button 
            size="lg" 
            onClick={() => navigate('/story')}
            className="w-full sm:w-auto bg-gradient-to-r from-saffron to-accent hover:from-saffron/90 hover:to-accent/90 text-white shadow-lg text-sm sm:text-base px-6 py-3"
          >
            Learn Our Story
          </Button>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Button
              onClick={() => window.open('https://chat.whatsapp.com/K2G6FniggftGsF7G1fh51D?mode=ems_copy_h_t', '_blank')}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Join Community</span>
            </Button>
            
            <Button
              onClick={() => {
                const motherPhone = '9986918992';
                const message = '👋 Hello! I would like to know more about Shree Spices products and place an order.';
                window.open(`https://wa.me/${motherPhone}?text=${encodeURIComponent(message)}`, '_blank');
              }}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Contact Us</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;