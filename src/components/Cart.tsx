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
      `${item.product.name} - ${item.quantity} unit(s) (${item.quantity * 500}g) = ₹${item.product.price * item.quantity}`
    ).join('\n');

    const orderMessage = `🛒 *New Order - Shree Spices*

📦 *Order Items:*
${orderItems}

💰 *Total Amount:* ₹${getTotal()}

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
        <DialogContent className="w-[85vw] max-w-xs max-h-[75vh] overflow-y-auto p-4">
          <DialogHeader>
            <DialogTitle>Customer Details</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="bg-muted p-3 rounded-lg">
              <p className="font-medium">Order Summary</p>
              <div className="text-sm space-y-1 mt-2">
                {items.map(item => (
                  <div key={item.product.id} className="flex justify-between">
                    <span>{item.product.name} x{item.quantity}</span>
                    <span>₹{item.product.price * item.quantity}</span>
                  </div>
                ))}
                <div className="border-t pt-1 font-medium flex justify-between">
                  <span>Total:</span>
                  <span>₹{getTotal()}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
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
                <p className="text-sm text-blue-800 font-medium">📍 Delivery Information:</p>
                <p className="text-xs text-blue-700 mt-1">
                  <strong>Non-Davangere customers:</strong> Orders will be couriered to your address. Courier charges vary by location and will be confirmed separately. Order preparation takes 1-2 days.
                </p>
                <p className="text-xs text-blue-700 mt-2 font-medium">
                  ✅ <strong>Davangere customers:</strong> You can collect from Dixit Offset Printers or home delivery available.
                </p>
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button variant="outline" onClick={() => setShowCustomerForm(false)} className="flex-1">
                Back to Cart
              </Button>
              <Button onClick={handleSubmitOrder} className="flex-1 bg-green-600 hover:bg-green-700">
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
      <DialogContent className="w-[85vw] max-w-xs max-h-[75vh] overflow-y-auto p-4">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Your Cart ({items.length} items)
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingCart className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Your cart is empty</p>
              <p className="text-sm text-muted-foreground">Add some delicious items to get started!</p>
            </div>
          ) : (
            <>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {items.map(item => (
                  <div key={item.product.id} className="flex items-center gap-2 p-2 border rounded-lg text-xs">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name}
                      className="w-8 h-8 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-xs truncate">{item.product.name}</h4>
                      <p className="text-xs text-muted-foreground">₹{item.product.price}/500g</p>
                      <p className="text-xs text-primary font-medium">
                        {item.quantity * 500}g = ₹{item.product.price * item.quantity}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="h-6 w-6 p-0"
                      >
                        <Minus className="h-2 w-2" />
                      </Button>
                      <span className="text-xs font-medium w-6 text-center">{item.quantity}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="h-6 w-6 p-0"
                      >
                        <Plus className="h-2 w-2" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => removeFromCart(item.product.id)}
                        className="h-6 w-6 p-0"
                      >
                        <Trash2 className="h-2 w-2" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-3">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-medium text-sm">Total:</span>
                  <span className="text-lg font-bold text-primary">₹{getTotal()}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  Total weight: {items.reduce((total, item) => total + (item.quantity * 500), 0)}g
                </p>
                <Button onClick={handleProceedToOrder} className="w-full bg-green-600 hover:bg-green-700 text-sm py-2">
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