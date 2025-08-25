import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    phone: '',
    address: '',
    landmark: '',
    city: '',
    pincode: '',
    quantity: 1
  });

  const handleOrderNow = () => {
    setShowOrderForm(true);
  };

  const handleSubmitOrder = () => {
    if (!customerDetails.name || !customerDetails.phone || !customerDetails.address || !customerDetails.city) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const motherPhone = '9986918992';
    const isDavangere = customerDetails.city.toLowerCase().includes('davangere');
    
    const orderMessage = `🛒 *New Order - Shree Spices*

📦 *Product:* ${product.name}
⚖️ *Quantity:* ${customerDetails.quantity * 500}g (Min: 500g)
💰 *Price:* ₹${product.price * customerDetails.quantity}

👤 *Customer Details:*
Name: ${customerDetails.name}
Phone: ${customerDetails.phone}

📍 *Address:*
${customerDetails.address}
${customerDetails.landmark ? `Landmark: ${customerDetails.landmark}` : ''}
City: ${customerDetails.city}
${customerDetails.pincode ? `PIN: ${customerDetails.pincode}` : ''}

${isDavangere ? 
  '🏠 *Collection Option:* You can collect from Dixit Offset Printers or we can deliver to your home in Davangere.' : 
  '📦 *Delivery:* This order will be couriered to you. Courier charges will be calculated based on your location. Usually takes 1-2 days to prepare the order.'}

---
*Nalini Dixit's Shree Spices* 📱 ${motherPhone}`;

    const waUrl = `https://wa.me/${motherPhone}?text=${encodeURIComponent(orderMessage)}`;
    window.open(waUrl, '_blank');
    
    setShowOrderForm(false);
    setCustomerDetails({
      name: '',
      phone: '',
      address: '',
      landmark: '',
      city: '',
      pincode: '',
      quantity: 1
    });
    
    toast({
      title: "Order Sent! 🎉",
      description: "Your order has been sent via WhatsApp to Nalini Dixit.",
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
          Min Order: 500g
        </div>
        
        {/* Order button */}
        <button 
          onClick={handleOrderNow}
          className="btn-crazy w-full py-2 px-4 rounded-xl relative z-10 text-primary-foreground text-sm"
        >
          <span className="relative z-10">ORDER NOW 📱</span>
        </button>
      </div>

      <Dialog open={showOrderForm} onOpenChange={setShowOrderForm}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Order {product.name}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="bg-muted p-3 rounded-lg">
              <p className="font-medium">{product.name}</p>
              <p className="text-sm text-muted-foreground">₹{product.price} per 500g</p>
              <p className="text-xs text-primary">Minimum order: 500g</p>
            </div>

            <div className="space-y-3">
              <div>
                <Label htmlFor="quantity">Quantity (500g units) *</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={customerDetails.quantity}
                  onChange={(e) => setCustomerDetails({...customerDetails, quantity: parseInt(e.target.value) || 1})}
                  className="mt-1"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Total: {customerDetails.quantity * 500}g = ₹{product.price * customerDetails.quantity}
                </p>
              </div>

              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={customerDetails.name}
                  onChange={(e) => setCustomerDetails({...customerDetails, name: e.target.value})}
                  placeholder="Enter your full name"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={customerDetails.phone}
                  onChange={(e) => setCustomerDetails({...customerDetails, phone: e.target.value})}
                  placeholder="Enter your phone number"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="address">Full Address *</Label>
                <Textarea
                  id="address"
                  value={customerDetails.address}
                  onChange={(e) => setCustomerDetails({...customerDetails, address: e.target.value})}
                  placeholder="House/Flat No, Street, Area"
                  className="mt-1"
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="landmark">Landmark (Optional)</Label>
                <Input
                  id="landmark"
                  value={customerDetails.landmark}
                  onChange={(e) => setCustomerDetails({...customerDetails, landmark: e.target.value})}
                  placeholder="Nearby landmark"
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={customerDetails.city}
                    onChange={(e) => setCustomerDetails({...customerDetails, city: e.target.value})}
                    placeholder="City"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="pincode">PIN Code</Label>
                  <Input
                    id="pincode"
                    value={customerDetails.pincode}
                    onChange={(e) => setCustomerDetails({...customerDetails, pincode: e.target.value})}
                    placeholder="PIN Code"
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-blue-800 font-medium">📍 For Non-Davangere Customers:</p>
                <p className="text-xs text-blue-700 mt-1">
                  Orders will be couriered to your address. Courier charges vary by location and will be confirmed separately. Order preparation takes 1-2 days.
                </p>
                <p className="text-xs text-blue-700 mt-2 font-medium">
                  ✅ Davangere customers can collect from Dixit Offset Printers or home delivery available.
                </p>
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button variant="outline" onClick={() => setShowOrderForm(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleSubmitOrder} className="flex-1 bg-green-600 hover:bg-green-700">
                Send Order via WhatsApp
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductCard;