import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, MessageCircle, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';
import { useOrder } from '@/contexts/OrderContext';
import { useState } from 'react';

interface PaymentQRProps {
  totalAmount?: number;
  customerDetails?: {
    name: string;
    phone: string;
    address: string;
  };
  orderId?: string;
}

const PaymentQR = ({ totalAmount = 0, customerDetails, orderId }: PaymentQRProps) => {
  const { toast } = useToast();
  const { state } = useCart();
  const { addOrder } = useOrder();
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);

  const handleDownloadQR = () => {
    // Create a temporary link to download the QR code
    const link = document.createElement('a');
    link.href = '/lovable-uploads/2ff3c361-c4f3-4e90-9c2c-82eb07c05f3b.png';
    link.download = 'shree-spices-payment-qr.png';
    link.click();
    
    toast({
      title: "QR Code Downloaded",
      description: "Payment QR code has been saved to your device",
    });
  };

  const handleConfirmOrder = async () => {
    if (state.items.length === 0) {
      toast({
        title: "Cart Empty",
        description: "Please add items to cart before ordering",
        variant: "destructive"
      });
      return;
    }

    if (!customerDetails) {
      toast({
        title: "Customer Details Missing",
        description: "Please provide customer details",
        variant: "destructive"
      });
      return;
    }

    setIsConfirming(true);
    
    try {
      const orderItems = state.items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      }));
      
      await addOrder({
        items: orderItems,
        customerInfo: customerDetails,
        total: totalAmount,
        status: 'received'
      });

      setIsOrderConfirmed(true);
      toast({
        title: "Order Confirmed",
        description: "Your order has been confirmed and added to our system",
      });
    } catch (error) {
      console.error('Error creating order:', error);
      toast({
        title: "Error",
        description: "Failed to confirm order. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsConfirming(false);
    }
  };

  const handleWhatsAppOrder = async () => {
    const phoneNumber = "919986918992"; // Mother's WhatsApp number
    const itemsList = state.items.map(item => `${item.name} - ₹${item.price} x ${item.quantity}`).join('\n');
    const message = `Hi! I would like to order the following items:\n\n${itemsList}\n\nTotal Amount: ₹${totalAmount}\n\nCustomer Details:\nName: ${customerDetails?.name || 'Not provided'}\nPhone: ${customerDetails?.phone || 'Not provided'}\nAddress: ${customerDetails?.address || 'Not provided'}`;
    
    // Try multiple WhatsApp URL formats for better compatibility
    const encodedMessage = encodeURIComponent(message);
    
    // Try WhatsApp app first (mobile), then web version
    const whatsappUrls = [
      `whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}`, // Mobile app
      `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`, // Web version
      `https://wa.me/${phoneNumber}?text=${encodedMessage}` // Fallback
    ];
    
    let urlIndex = 0;
    
    const tryNextUrl = () => {
      if (urlIndex < whatsappUrls.length) {
        const url = whatsappUrls[urlIndex];
        console.log(`Trying WhatsApp URL ${urlIndex + 1}:`, url);
        
        try {
          window.location.href = url;
        } catch (error) {
          console.error(`Error with URL ${urlIndex + 1}:`, error);
          urlIndex++;
          if (urlIndex < whatsappUrls.length) {
            setTimeout(tryNextUrl, 1000); // Try next URL after 1 second
          } else {
            // If all fail, copy to clipboard as fallback
            navigator.clipboard?.writeText(message).then(() => {
              toast({
                title: "Message Copied",
                description: "WhatsApp message copied to clipboard. Please paste it manually in WhatsApp.",
              });
            }).catch(() => {
              toast({
                title: "Manual Order",
                description: `Please message ${phoneNumber} manually with your order details.`,
              });
            });
          }
        }
      }
    };
    
    tryNextUrl();
  };

  return (
    <Card className="w-full max-w-xs sm:max-w-sm mx-auto">
      <CardHeader className="text-center pb-3">
        <CardTitle className="text-lg sm:text-xl">Payment via UPI</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4 px-3 sm:px-6">
        <div className="text-center">
          <p className="text-xl sm:text-2xl font-bold text-primary">₹{totalAmount}</p>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">Scan QR code with any UPI app</p>
        </div>

        <div className="text-center space-y-2 sm:space-y-3">
          <div className="flex justify-center">
            <img 
              src="/lovable-uploads/2ff3c361-c4f3-4e90-9c2c-82eb07c05f3b.png" 
              alt="Payment QR Code"
              className="w-36 h-36 sm:w-48 sm:h-48 object-contain border rounded-lg"
            />
          </div>
          
          <Button onClick={handleDownloadQR} variant="outline" size="sm" className="text-xs sm:text-sm px-3 py-2">
            <Download className="mr-1 sm:mr-2 h-3 w-3" />
            Download QR
          </Button>

          <div className="pt-2 sm:pt-3 border-t space-y-2 sm:space-y-3">
            {!isOrderConfirmed ? (
              <Button 
                onClick={handleConfirmOrder}
                className="w-full bg-primary hover:bg-primary/90 text-sm sm:text-base py-2 sm:py-3"
                size="lg"
                disabled={isConfirming}
              >
                {isConfirming ? (
                  "Confirming..."
                ) : (
                  <>
                    <Check className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                    Confirm Order
                  </>
                )}
              </Button>
            ) : (
              <>
                <div className="flex items-center justify-center text-green-600 font-medium">
                  <Check className="mr-2 h-4 w-4" />
                  Order Confirmed!
                </div>
                <Button 
                  onClick={handleWhatsAppOrder}
                  className="w-full bg-green-600 hover:bg-green-700 text-sm sm:text-base py-2 sm:py-3"
                  size="lg"
                >
                  <MessageCircle className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  Send Order via WhatsApp
                </Button>
              </>
            )}
            <p className="text-xs text-muted-foreground mt-2">
              {!isOrderConfirmed 
                ? "Confirm your order to proceed with WhatsApp"
                : "Send your order details directly to us"
              }
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentQR;