import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import ProductDetailsModal from './ProductDetailsModal';

export interface Product {
  id: string;
  name: string;
  kannadaName?: string;
  price: number;
  image: string;
  description: string;
  weight: string;
}

interface ProductCardProps {
  product: Product;
  delay?: number;
}

const ProductCard = ({ product, delay = 0 }: ProductCardProps) => {
  const { items, addToCart, updateQuantity, removeFromCart } = useCart();
  const { toast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Find if product is in cart and get quantity
  const cartItem = items.find(item => item.product.id === product.id);
  const quantity = cartItem?.quantity || 0;

  // Parse weight for calculations (e.g., "100g" -> 100)
  const parseWeight = (weightStr: string): number => {
    const match = weightStr.match(/(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  };

  const baseWeight = parseWeight(product.weight);
  const totalWeight = baseWeight * quantity;
  const totalAmount = product.price * quantity;

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Added to Cart! 🛒",
      description: `${product.name} added to your cart.`,
    });
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    } else {
      removeFromCart(product.id);
    }
  };

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div 
              className="product-card h-full flex flex-col cursor-pointer group"
              style={{animationDelay: `${delay}s`}}
              onClick={handleCardClick}
            >
        {/* Image section - more compact */}
        <div className="relative aspect-square overflow-hidden rounded-t-lg">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* New item badge */}
          {product.id.startsWith('n') && (
            <div className="absolute top-2 left-2 bg-accent text-white px-1.5 py-0.5 rounded text-[10px] font-semibold shadow-md">
              New
            </div>
          )}
          
          {/* Price tag */}
          <div className="absolute bottom-2 right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-1 rounded shadow-lg">
            <span className="font-bold text-sm">₹{product.price}</span>
          </div>

          {/* Quantity badge when in cart */}
          {quantity > 0 && (
            <div className="absolute top-2 right-2 bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-md">
              {quantity}
            </div>
          )}
        </div>
        
        {/* Content - compact */}
        <div className="p-3 flex-1 flex flex-col">
          <h3 className="font-semibold text-sm leading-tight text-foreground line-clamp-2 min-h-[2.5rem]">
            {product.name}
          </h3>
          {product.kannadaName && (
            <p className="text-xs font-medium mt-0.5 bg-gradient-to-r from-yellow-500 to-red-500 bg-clip-text text-transparent line-clamp-1">
              {product.kannadaName}
            </p>
          )}
          
          {/* Add to cart or Quantity controls */}
          {quantity === 0 ? (
            <Button 
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart();
              }}
              size="sm"
              className="btn-primary w-full mt-2 py-1.5 text-xs flex items-center justify-center gap-1.5"
            >
              <ShoppingCart className="h-3 w-3" />
              <span>Add</span>
            </Button>
          ) : (
            <div className="mt-2 space-y-1">
              {/* Quantity controls */}
              <div className="flex items-center justify-between bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 rounded-lg p-1">
                <Button
                  onClick={handleDecrement}
                  size="sm"
                  variant="ghost"
                  className="h-7 w-7 p-0 rounded-full bg-white dark:bg-gray-800 shadow-sm hover:bg-red-100 dark:hover:bg-red-900/50"
                >
                  <Minus className="h-3 w-3 text-red-600" />
                </Button>
                
                <span className="font-bold text-sm text-foreground min-w-[2rem] text-center">
                  {quantity}
                </span>
                
                <Button
                  onClick={handleIncrement}
                  size="sm"
                  variant="ghost"
                  className="h-7 w-7 p-0 rounded-full bg-white dark:bg-gray-800 shadow-sm hover:bg-green-100 dark:hover:bg-green-900/50"
                >
                  <Plus className="h-3 w-3 text-green-600" />
                </Button>
              </div>
              
              {/* Total calculations */}
              <div className="flex justify-between text-[10px] text-muted-foreground px-1">
                <span>{totalWeight}g</span>
                <span className="font-semibold text-green-600 dark:text-green-400">₹{totalAmount}</span>
              </div>
            </div>
          )}
        </div>
            </div>
          </TooltipTrigger>
          <TooltipContent 
            side="top" 
            className="max-w-[280px] p-4 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 border-2 border-amber-200 dark:border-amber-800 shadow-xl rounded-xl"
          >
            <div className="space-y-2">
              <h4 
                className="font-semibold text-base text-amber-900 dark:text-amber-100"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {product.name}
              </h4>
              <p 
                className="text-sm text-amber-800 dark:text-amber-200 leading-relaxed italic"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {product.description}
              </p>
              <div className="flex items-center gap-2 pt-1 border-t border-amber-200 dark:border-amber-700">
                <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">{product.weight}</span>
                <span className="text-xs text-amber-400">•</span>
                <span className="text-xs font-bold text-green-600 dark:text-green-400">₹{product.price}</span>
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <ProductDetailsModal 
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default ProductCard;
