import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';

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

  const handleWhatsAppOrder = () => {
    const phoneNumber = "919876543210"; // Replace with mother's number
    const itemsList = state.items.map(item => `${item.name} - ₹${item.price} x ${item.quantity}`).join('\n');
    const message = `Hi! I would like to order the following items:\n\n${itemsList}\n\nTotal Amount: ₹${totalAmount}\n\nCustomer Details:\nName: ${customerDetails?.name}\nPhone: ${customerDetails?.phone}\nAddress: ${customerDetails?.address}`;
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader className="text-center">
        <CardTitle>Payment via UPI</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">₹{totalAmount}</p>
          <p className="text-sm text-muted-foreground mt-1">Scan QR code with any UPI app</p>
        </div>

        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <img 
              src="/lovable-uploads/2ff3c361-c4f3-4e90-9c2c-82eb07c05f3b.png" 
              alt="Payment QR Code"
              className="w-48 h-48 object-contain border rounded-lg"
            />
          </div>
          
          <Button onClick={handleDownloadQR} variant="outline" size="sm" className="mr-2">
            <Download className="mr-2 h-3 w-3" />
            Download QR
          </Button>

          <div className="pt-3 border-t">
            <Button 
              onClick={handleWhatsAppOrder}
              className="w-full bg-green-600 hover:bg-green-700"
              size="lg"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Send Order via WhatsApp
            </Button>
            <p className="text-xs text-muted-foreground mt-2">
              Send your order details directly to us
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentQR;