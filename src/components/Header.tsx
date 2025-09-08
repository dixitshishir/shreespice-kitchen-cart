import { MessageCircle, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';
import Cart from './Cart';

const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { getItemCount } = useCart();
  
  const handleWhatsAppContact = () => {
    const motherPhone = '9986918992';
    const message = '👋 Hello! I would like to know more about Shree Spices products and place an order.';
    const waUrl = `https://wa.me/${motherPhone}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <header className="sticky top-0 z-50 w-full glass-effect border-b border-border/50">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">
                Shree Spices
              </h1>
              <p className="text-xs text-muted-foreground hidden sm:block">
                Authentic Homemade
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            onClick={() => setIsCartOpen(true)}
            variant="outline"
            size="sm"
            className="relative h-10 px-3 rounded-lg border-border hover:bg-secondary/80"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline ml-2">Cart</span>
            {getItemCount() > 0 && (
              <div className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                {getItemCount()}
              </div>
            )}
          </Button>
        </div>
      </div>
      
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
};

export default Header;