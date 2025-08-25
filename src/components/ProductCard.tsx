import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart } from 'lucide-react';

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

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Added to Cart! 🛒",
      description: `${product.name} added to your cart.`,
    });
  };

  return (
    <div 
      className="card-crazy h-full flex flex-col rounded-2xl overflow-hidden"
      style={{animationDelay: `${delay}s`}}
    >
      {/* Compact image section */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Crazy new item badge */}
        {product.id.startsWith('n') && (
          <div className="absolute top-2 left-2 bg-gradient-to-r from-primary to-accent text-primary-foreground px-3 py-1 rounded-full text-xs font-black animate-pulse shadow-lg">
            🔥 HOT!
          </div>
        )}
        
        {/* Price overlay */}
        <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full">
          <span className="text-lg font-black">₹{product.price}</span>
        </div>
      </div>
      
      {/* Compact content */}
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-black text-base leading-tight flex-1 text-foreground">{product.name}</h3>
          <div className="badge-crazy ml-2 shrink-0 text-xs px-2 py-1 rounded-full">
            {product.weight}
          </div>
        </div>
        
        <p className="text-muted-foreground text-xs mb-2 line-clamp-2 leading-relaxed flex-1">
          {product.description}
        </p>
        
        <div className="text-xs text-primary font-semibold mb-3">
          500g per unit
        </div>
        
        {/* Add to cart button */}
        <button 
          onClick={handleAddToCart}
          className="btn-crazy w-full py-2 px-4 rounded-xl relative z-10 text-primary-foreground text-sm flex items-center justify-center gap-2"
        >
          <ShoppingCart className="h-4 w-4" />
          <span className="relative z-10">ADD TO CART</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;