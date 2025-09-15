import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart, ChefHat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductDetailsModal from './ProductDetailsModal';
import RecipeModal from './RecipeModal';

export interface Product {
  id: string;
  name: string;
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
  const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false);

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

  const handleRecipeClick = () => {
    setIsRecipeModalOpen(true);
  };

  return (
    <>
      <div 
        className="product-card h-full flex flex-col cursor-pointer group"
        style={{animationDelay: `${delay}s`}}
        onClick={handleCardClick}
      >
        {/* Image section */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-t-xl">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* New item badge */}
          {product.id.startsWith('n') && (
            <div className="absolute top-3 left-3 bg-accent text-white px-2 py-1 rounded-lg text-xs font-semibold shadow-md">
              New
            </div>
          )}
          
          {/* Price tag */}
          <div className="absolute bottom-3 right-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-2 rounded-lg shadow-lg border-2 border-white/20">
            <span className="font-bold text-lg">₹{product.price}</span>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-5 flex-1 flex flex-col">
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-semibold text-base leading-tight flex-1 text-foreground">
              {product.name}
            </h3>
            <div className="modern-badge ml-3 shrink-0 text-xs bg-primary/10 text-primary border border-primary/20">
              {product.weight}
            </div>
          </div>
          
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2 leading-relaxed flex-1">
            {product.description}
          </p>
          
          <div className="text-sm font-medium text-primary mb-4">
            500g per unit
          </div>
          
          {/* Action buttons */}
          <div className="space-y-2">
            {/* Recipe button - only for powder products */}
            {product.name.toLowerCase().includes('powder') && (
              <Button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleRecipeClick();
                }}
                variant="outline"
                className="w-full py-2.5 text-sm flex items-center justify-center gap-2 border-orange-200 hover:bg-orange-50 text-orange-700"
              >
                <ChefHat className="h-4 w-4" />
                <span>Get AI Recipe</span>
              </Button>
            )}
            
            {/* Add to cart button */}
            <Button 
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart();
              }}
              className="btn-primary w-full py-2.5 text-sm flex items-center justify-center gap-2"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Add to Cart</span>
            </Button>
          </div>
        </div>
      </div>

      <ProductDetailsModal 
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      
      <RecipeModal 
        product={product}
        isOpen={isRecipeModalOpen}
        onClose={() => setIsRecipeModalOpen(false)}
      />
    </>
  );
};

export default ProductCard;