import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-spices.jpg';

interface HeroProps {
  onShopNow: () => void;
}

const Hero = ({ onShopNow }: HeroProps) => {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
      </div>
      
      <div className="relative z-10 container text-center text-white max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Authentic Spices from
          <span className="block bg-gradient-to-r from-saffron to-accent bg-clip-text text-transparent">
            Our Family Kitchen
          </span>
        </h1>
        
        <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
          Experience the rich flavors of traditional homemade spice powders, 
          crafted with love using time-honored family recipes.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            onClick={onShopNow}
            className="bg-gradient-to-r from-saffron to-accent hover:from-saffron/90 hover:to-accent/90 text-white shadow-lg"
          >
            Shop Our Spices
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-primary"
          >
            Learn Our Story
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;