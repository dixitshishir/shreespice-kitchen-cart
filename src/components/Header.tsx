import { ShoppingCart, Sparkles, Phone, BookOpen, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cart from './Cart';

const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { getItemCount } = useCart();
  const navigate = useNavigate();

  const handleWhatsAppContact = () => {
    const motherPhone = '9986918992';
    const message = '👋 Hello! I would like to know more about Shree Spices and Snacks products and place an order.';
    window.open(`https://wa.me/${motherPhone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleJoinCommunity = () => {
    window.open('https://chat.whatsapp.com/K2G6FniggftGsF7G1fh51D?mode=ems_copy_h_t', '_blank');
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top bar with navigation */}
      <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 backdrop-blur-md border-b border-border/30">
        <div className="container flex items-center justify-between h-10 px-4">
          <div className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground">
            <Sparkles className="h-3 w-3 text-accent" />
            <span className="font-medium">Authentic Homemade Spices</span>
          </div>
          
          <nav className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
            <button 
              onClick={handleJoinCommunity}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full bg-blue-500/15 hover:bg-blue-500/25 text-blue-600 hover:text-blue-700 transition-all duration-200 font-semibold border border-blue-500/30"
            >
              <Users className="h-3.5 w-3.5" />
              <span className="hidden xs:inline">Join</span> Community
            </button>
            <button 
              onClick={handleWhatsAppContact}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full bg-green-500/15 hover:bg-green-500/25 text-green-600 hover:text-green-700 transition-all duration-200 font-semibold border border-green-500/30"
            >
              <Phone className="h-3.5 w-3.5" />
              Contact Us
            </button>
            <button 
              onClick={() => navigate('/story')}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full bg-amber-500/15 hover:bg-amber-500/25 text-amber-600 hover:text-amber-700 transition-all duration-200 font-semibold border border-amber-500/30"
            >
              <BookOpen className="h-3.5 w-3.5" />
              Our Story
            </button>
          </nav>
        </div>
      </div>

      {/* Main header with logo */}
      <div className="glass-effect border-b border-border/50">
        <div className="container flex h-14 sm:h-16 items-center justify-between px-4">
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => navigate('/')}
          >
            {/* Logo mark */}
            <div className="relative">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                <span className="text-lg sm:text-xl">🌶️</span>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-accent rounded-full border-2 border-background animate-pulse" />
            </div>
            
            {/* Brand text */}
            <div className="flex flex-col -space-y-0.5">
              <span className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-muted-foreground">
                Nalini Dixit's
              </span>
              <h1 className="text-lg sm:text-xl lg:text-2xl font-black tracking-tight">
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  Shree Spices
                </span>
              </h1>
            </div>
          </div>
          
          {/* Cart button */}
          <Button 
            onClick={() => setIsCartOpen(true)} 
            variant="outline" 
            size="sm" 
            className="relative h-10 sm:h-11 px-3 sm:px-4 rounded-xl border-border bg-card/50 hover:bg-card hover:border-primary/30 transition-all duration-200 group"
          >
            <div className="flex items-center gap-2">
              <div className="relative">
                <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 text-foreground group-hover:text-primary transition-colors" />
                {getItemCount() > 0 && (
                  <div className="absolute -top-2 -right-2 bg-gradient-to-br from-accent to-primary text-[10px] rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center font-bold text-white shadow-md">
                    {getItemCount()}
                  </div>
                )}
              </div>
              <span className="hidden sm:inline text-sm font-medium text-foreground">Cart</span>
            </div>
          </Button>
        </div>
      </div>
      
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
};

export default Header;