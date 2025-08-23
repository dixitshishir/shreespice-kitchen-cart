import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, Trash2 } from 'lucide-react';
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

  const handleProceedToCheckout = () => {
    setShowCustomerForm(true);
  };

  const sendWhatsAppNotification = (customerDetails: { name: string; phone: string; address: string }) => {
    const motherPhone = '9986918992';
    const itemsList = state.items.map(item => `${item.name} (${item.quantity}x)`).join(', ');
    const message = `🔔 New Order Alert!\n\nCustomer: ${customerDetails.name}\nPhone: ${customerDetails.phone}\nAddress: ${customerDetails.address}\nItems: ${itemsList}\nTotal: ₹${state.total + 50}\n\nPlease go to admin dashboard and accept the order.`;
    
    const whatsappUrl = `https://wa.me/${motherPhone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCustomerDetailsSubmit = (details: { name: string; phone: string; address: string }) => {
    // Create order
    addOrder({
      items: state.items,
      customerInfo: details,
      total: state.total,
      status: 'received'
    });

    // Send WhatsApp notification to mother
    sendWhatsAppNotification(details);

    toast({
      title: "Order Confirmed! 🎉",
      description: `Thank you ${details.name}! Your order has been notified to our team. We'll contact you at ${details.phone} shortly.`,
      duration: 5000,
    });
    clearCart();
    setShowCustomerForm(false);
    onOpenChange(false);
  };

  const handleBackToCart = () => {
    setShowCustomerForm(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-full max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            {showCustomerForm ? 'Order Details' : 'Shopping Cart'}
            {!showCustomerForm && state.items.length > 0 && (
              <Badge variant="secondary">
                {state.items.reduce((sum, item) => sum + item.quantity, 0)} items
              </Badge>
            )}
          </SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col h-full">
          {showCustomerForm ? (
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