import { ShoppingCart, ArrowRight } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import Cart from './Cart';

const MobileCartBar = () => {
  const { items, getTotal } = useCart();
  const isMobile = useIsMobile();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = getTotal();

  // Only show on mobile when there are items in cart
  if (!isMobile || totalItems === 0) {
    return null;
  }

  return (
    <>
      {/* Sticky bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-3 bg-gradient-to-t from-background via-background to-background/80 backdrop-blur-lg border-t border-border/50 safe-area-bottom">
        <Button
          onClick={() => setIsCartOpen(true)}
          className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-xl shadow-lg shadow-orange-500/25 flex items-center justify-between px-4 active:scale-[0.98] transition-transform"
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 bg-white text-orange-600 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            </div>
            <span className="font-semibold">
              {totalItems} {totalItems === 1 ? 'item' : 'items'}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg">₹{totalPrice}</span>
            <ArrowRight className="h-5 w-5" />
          </div>
        </Button>
      </div>

      {/* Spacer to prevent content from being hidden behind the bar */}
      <div className="h-20 md:hidden" />

      {/* Cart Sheet */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default MobileCartBar;
