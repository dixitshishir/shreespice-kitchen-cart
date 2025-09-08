import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart = ({ isOpen, onClose }: CartProps) => {
  const { items, updateQuantity, removeFromCart, clearCart, getTotal } = useCart();
  const { toast } = useToast();
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    phone: '',
    address: '',
    landmark: '',
    city: '',
    pincode: ''
  });
  const [showCustomerForm, setShowCustomerForm] = useState(false);

  const handleProceedToOrder = () => {
    if (items.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Please add items to cart before ordering.",
        variant: "destructive"
      });
      return;
    }
    setShowCustomerForm(true);
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
    
    const orderItems = items.map(item => 
      `${item.product.name} - ${item.quantity} unit(s) (${item.quantity * 500}g)`
    ).join('\n');

    const orderMessage = `🛒 *New Order - Shree Spices*

📦 *Order Items:*
${orderItems}

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
    
    clearCart();
    setCustomerDetails({
      name: '',
      phone: '',
      address: '',
      landmark: '',
      city: '',
      pincode: ''
    });
    setShowCustomerForm(false);
    onClose();
    
    toast({
      title: "Order Sent! 🎉",
      description: "Your order has been sent via WhatsApp to Nalini Dixit.",
    });
  };

  if (showCustomerForm) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="w-[92vw] max-w-sm max-h-[85vh] overflow-y-auto p-4 rounded-xl border-border/50 bg-card/95 backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">Customer Details</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="figma-card p-4">
              <p className="font-medium text-sm mb-3">Order Summary</p>
              <div className="text-sm space-y-2">
                {items.map(item => (
                  <div key={item.product.id} className="flex justify-between items-center">
                    <span className="text-muted-foreground">{item.product.name} x{item.quantity}</span>
                    <span className="font-medium">₹{item.product.price * item.quantity}</span>
                  </div>
                ))}
                <div className="border-t pt-2 font-semibold flex justify-between">
                  <span>Total:</span>
                  <span className="text-primary">₹{getTotal()}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <Label htmlFor="name" className="text-sm font-medium">Full Name *</Label>
                <Input
                  id="name"
                  value={customerDetails.name}
                  onChange={(e) => setCustomerDetails({...customerDetails, name: e.target.value})}
                  placeholder="Enter your full name"
                  className="mt-1 h-10 rounded-lg border-border"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-sm font-medium">Phone Number *</Label>
                <Input
                  id="phone"
                  value={customerDetails.phone}
                  onChange={(e) => setCustomerDetails({...customerDetails, phone: e.target.value})}
                  placeholder="Enter your phone number"
                  className="mt-1 h-10 rounded-lg border-border"
                />
              </div>

              <div>
                <Label htmlFor="address" className="text-sm font-medium">Full Address *</Label>
                <Textarea
                  id="address"
                  value={customerDetails.address}
                  onChange={(e) => setCustomerDetails({...customerDetails, address: e.target.value})}
                  placeholder="House/Flat No, Street, Area"
                  className="mt-1 rounded-lg border-border resize-none"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="landmark" className="text-sm font-medium">Landmark (Optional)</Label>
                <Input
                  id="landmark"
                  value={customerDetails.landmark}
                  onChange={(e) => setCustomerDetails({...customerDetails, landmark: e.target.value})}
                  placeholder="Nearby landmark"
                  className="mt-1 h-10 rounded-lg border-border"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="city" className="text-sm font-medium">City *</Label>
                  <Input
                    id="city"
                    value={customerDetails.city}
                    onChange={(e) => setCustomerDetails({...customerDetails, city: e.target.value})}
                    placeholder="City"
                    className="mt-1 h-10 rounded-lg border-border"
                  />
                </div>
                <div>
                  <Label htmlFor="pincode" className="text-sm font-medium">PIN Code</Label>
                  <Input
                    id="pincode"
                    value={customerDetails.pincode}
                    onChange={(e) => setCustomerDetails({...customerDetails, pincode: e.target.value})}
                    placeholder="PIN Code"
                    className="mt-1 h-10 rounded-lg border-border"
                  />
                </div>
              </div>

              <div className="figma-card p-4 bg-blue-50/50 border-blue-200/50">
                <p className="text-sm font-medium text-blue-800 mb-2">📍 Delivery Information</p>
                <div className="space-y-1 text-xs text-blue-700">
                  <p><strong>Non-Davangere customers:</strong> Orders will be couriered. Charges vary by location.</p>
                  <p><strong>Davangere customers:</strong> Collect from Dixit Offset Printers or home delivery available.</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button 
                variant="outline" 
                onClick={() => setShowCustomerForm(false)} 
                className="flex-1 rounded-lg border-border hover:bg-secondary"
              >
                Back to Cart
              </Button>
              <Button 
                onClick={handleSubmitOrder} 
                className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-lg"
              >
                Send Order via WhatsApp
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[92vw] max-w-sm max-h-[85vh] overflow-y-auto p-4 rounded-xl border-border/50 bg-card/95 backdrop-blur-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg font-semibold">
            <ShoppingCart className="h-5 w-5" />
            Your Cart ({items.length} items)
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-muted-foreground font-medium">Your cart is empty</p>
              <p className="text-sm text-muted-foreground">Add some delicious items to get started!</p>
            </div>
          ) : (
            <>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {items.map(item => (
                  <div key={item.product.id} className="figma-card p-3 flex items-center gap-3">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">{item.product.name}</h4>
                      <p className="text-xs text-muted-foreground">₹{item.product.price}/500g</p>
                      <p className="text-sm font-medium text-primary">
                        {item.quantity * 500}g = ₹{item.product.price * item.quantity}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="h-8 w-8 p-0 rounded-lg"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="h-8 w-8 p-0 rounded-lg"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => removeFromCart(item.product.id)}
                        className="h-8 w-8 p-0 rounded-lg"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-medium">Total:</span>
                  <span className="text-xl font-bold text-primary">₹{getTotal()}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Total weight: {items.reduce((total, item) => total + (item.quantity * 500), 0)}g
                </p>
                <Button 
                  onClick={handleProceedToOrder} 
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium"
                >
                  Proceed to Order
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Cart;