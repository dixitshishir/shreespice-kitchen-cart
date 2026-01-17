import { MessageCircle, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';
import Cart from './Cart';
const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const {
    getItemCount
  } = useCart();
  const handleWhatsAppContact = () => {
    const motherPhone = '9986918992';
    const message = '👋 Hello! I would like to know more about Shree Spices and Snacks products and place an order.';
    const waUrl = `https://wa.me/${motherPhone}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
  };
  return <header className="sticky top-0 z-50 w-full glass-effect border-b border-border/50">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-3">
          <h1 className="text-2xl lg:text-3xl font-black tracking-tight">
            <span className="bg-gradient-to-r from-amber-600 via-orange-500 to-red-600 bg-clip-text text-transparent drop-shadow-lg">
              Nalini Dixit's
            </span>
            {' '}
            <span className="bg-gradient-to-r from-yellow-600 via-amber-500 to-orange-600 bg-clip-text text-transparent drop-shadow-lg">
              Shree Spices and Snacks
            </span>
          </h1>
        </div>
        
        <div className="flex items-center gap-3">
          <Button onClick={() => setIsCartOpen(true)} variant="outline" size="sm" className="relative h-10 px-3 rounded-lg border-border hover:bg-secondary/80">
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline ml-2">Cart</span>
            {getItemCount() > 0 && <div className="absolute -top-2 -right-2 bg-accent text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium text-paprika">
                {getItemCount()}
              </div>}
          </Button>
        </div>
      </div>
      
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>;
};
export default Header;