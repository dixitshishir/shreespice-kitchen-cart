import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
  const { addToCart } = useCart();
  const { toast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Added to Cart! 🛒",
      description: `${product.name} added to your cart.`,
    });
  };

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
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
        </div>
        
        {/* Content - compact */}
        <div className="p-3 flex-1 flex flex-col">
          <h3 className="font-semibold text-sm leading-tight text-foreground line-clamp-1">
            {product.name}
          </h3>
          {product.kannadaName && (
            <p className="text-xs font-medium mt-0.5 bg-gradient-to-r from-yellow-500 to-red-500 bg-clip-text text-transparent line-clamp-1">
              {product.kannadaName}
            </p>
          )}
          
          {/* Add to cart button */}
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
        </div>
      </div>

      <ProductDetailsModal 
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default ProductCard;