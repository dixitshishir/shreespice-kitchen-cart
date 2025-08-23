import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Minus, Plus, Trash2, CreditCard, Smartphone, CheckCircle, QrCode } from 'lucide-react';
import PaymentQR from './PaymentQR';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { useOrder } from '@/contexts/OrderContext';
import CustomerDetailsForm from './CustomerDetailsForm';

interface CartProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const Cart = ({ isOpen, onOpenChange }: CartProps) => {
  const { state, updateQuantity, removeItem, clearCart } = useCart();
  const { addOrder } = useOrder();
  const { toast } = useToast();
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [customerDetails, setCustomerDetails] = useState<{ name: string; phone: string; address: string } | null>(null);
  const [currentOrderId, setCurrentOrderId] = useState<string | null>(null);

  // Reset states when cart opens
  const handleCartOpen = (open: boolean) => {
    if (open) {
      setShowCustomerForm(false);
      setShowPayment(false);
      setCustomerDetails(null);
      setCurrentOrderId(null);
    }
    onOpenChange(open);
  };

  const handleProceedToCheckout = () => {
    setShowCustomerForm(true);
  };

  const generateUPILink = (amount: number, customerName: string, orderId: string) => {
    const upiId = 'sdixit2301@okhdfcbank';
    const payeeName = 'Shishir Dixit';
    const note = `Order ${orderId} - ${customerName} - Shree Spices`;
    
    // UPI payment URL format
    const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;
    
    return upiUrl;
  };

  const handlePayNow = () => {
    if (!customerDetails) return;
    
    const totalAmount = state.total + 50;
    const orderId = Date.now().toString().slice(-8);
    const upiLink = generateUPILink(totalAmount, customerDetails.name, orderId);
    
    // Try to open UPI app
    window.location.href = upiLink;
    
    // Show fallback instructions
    setTimeout(() => {
      toast({
        title: "Payment Instructions 💳",
        description: "If payment app didn't open, scan QR code or use UPI ID: sdixit2301@okhdfcbank",
        duration: 10000,
      });
    }, 2000);
  };

  const handlePaymentComplete = () => {
    if (!customerDetails) return;

    // Convert cart items to order items
    const orderItems = state.items.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity
    }));
    
    // Create order without user_id
    addOrder({
      items: orderItems,
      customerInfo: customerDetails,
      total: state.total,
      status: 'received'
    });

    // Send WhatsApp notification to mother
    sendWhatsAppNotification();

    toast({
      title: "Payment Received! 🎉",
      description: `Thank you ${customerDetails.name}! Your order will be processed and we'll contact you soon.`,
      duration: 5000,
    });
    
    clearCart();
    setShowCustomerForm(false);
    setShowPayment(false);
    setCustomerDetails(null);
    onOpenChange(false);
  };

  const sendWhatsAppNotification = () => {
    const motherPhone = '9986918992';
    const message = `🔔 New Order Alert from Shree Spices!\n\nPlease check the admin dashboard - there's a new order waiting for your review.`;
    
    // Open WhatsApp directly
    const waUrl = `https://wa.me/${motherPhone}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
    
    toast({
      title: "Admin Notified! 📱",
      description: "WhatsApp notification sent to admin to check new order.",
      duration: 5000,
    });
  };

  const handleCustomerDetailsSubmit = async (details: { name: string; phone: string; address: string }) => {
    setCustomerDetails(details);
    
    // Create the order first to get an order ID
    const orderItems = state.items.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity
    }));
    
    try {
      // Create order and get the ID
      await addOrder({
        items: orderItems,
        customerInfo: details,
        total: state.total,
        status: 'received'
      });
      
      // Generate a unique order ID for tracking
      const orderId = `ORD-${Date.now()}`;
      setCurrentOrderId(orderId);
      
      setShowCustomerForm(false);
      setShowPayment(true);
    } catch (error) {
      console.error('Error creating order:', error);
      toast({
        title: "Error",
        description: "Failed to create order. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleBackToCart = () => {
    setShowCustomerForm(false);
    setShowPayment(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleCartOpen}>
      <SheetContent className="w-full max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            {showPayment ? 'Complete Payment' : showCustomerForm ? 'Order Details' : 'Shopping Cart'}
            {!showCustomerForm && !showPayment && state.items.length > 0 && (
              <Badge variant="secondary">
                {state.items.reduce((sum, item) => sum + item.quantity, 0)} items
              </Badge>
            )}
          </SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col h-full">
          {showPayment ? (
            <div className="flex-1 py-4">
              <PaymentQR 
                totalAmount={state.total + 50}
                customerDetails={customerDetails}
                orderId={currentOrderId}
              />
              
              <div className="mt-4">
                <Button 
                  variant="ghost" 
                  onClick={handleBackToCart}
                  className="w-full"
                >
                  Back to Cart
                </Button>
              </div>
            </div>
          ) : showCustomerForm ? (
            <div className="flex-1 flex items-center justify-center py-8">
              <CustomerDetailsForm
                onSubmit={handleCustomerDetailsSubmit}
                onBack={handleBackToCart}
              />
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto py-4">
                {state.items.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Your cart is empty</p>
                    <Button 
                      variant="outline" 
                      onClick={() => onOpenChange(false)}
                      className="mt-4"
                    >
                      Continue Shopping
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {state.items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">{item.weight}</p>
                          <p className="font-semibold text-primary">₹{item.price}</p>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          
                          <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                          
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeItem(item.id)}
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {state.items.length > 0 && (
                <div className="border-t pt-4 space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>₹{state.total}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Delivery</span>
                      <span>₹50</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>₹{state.total + 50}</span>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleProceedToCheckout}
                    className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                  >
                    Proceed to Checkout
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;