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
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container flex flex-col gap-3 py-3 sm:flex-row sm:h-16 sm:items-center sm:justify-between sm:py-0">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-saffron to-paprika bg-clip-text text-transparent">
            Shree Spices
          </h1>
          <span className="text-sm text-muted-foreground hidden sm:inline">
            Authentic Homemade Spices
          </span>
        </div>
        
        <div className="flex items-center gap-2 justify-center sm:justify-end">
          <Button
            onClick={() => setIsCartOpen(true)}
            variant="outline"
            className="flex items-center gap-2 relative"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">Cart</span>
            {getItemCount() > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                {getItemCount()}
              </span>
            )}
          </Button>
        </div>
      </div>
      
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
};

export default Header;