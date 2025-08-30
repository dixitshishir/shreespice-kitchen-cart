import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ShoppingCart, X } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  weight: string;
}

interface ProductDetailsModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductDetailsModal = ({ product, isOpen, onClose }: ProductDetailsModalProps) => {
  const { addToCart } = useCart();

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto bg-background border border-border">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground">
            {product.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg bg-muted">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="space-y-3">
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>
            
            <div className="bg-muted/50 p-3 rounded-lg">
              <p className="text-sm font-medium text-foreground">Package Details:</p>
              <p className="text-sm text-muted-foreground">Minimum order: 500g</p>
              <p className="text-sm text-muted-foreground">Freshly ground and packed</p>
              <p className="text-sm font-semibold text-primary">Price: ₹{product.price}</p>
            </div>
          </div>
          
          <div className="flex gap-2 pt-2">
            <Button
              onClick={handleAddToCart}
              className="flex-1 bg-gradient-to-r from-saffron to-accent hover:from-saffron/90 hover:to-accent/90 text-white"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
            <Button variant="outline" onClick={onClose} size="icon">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailsModal;