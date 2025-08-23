import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Copy, Smartphone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useOrder } from '@/contexts/OrderContext';

interface PaymentQRProps {
  totalAmount?: number;
}

const PaymentQR = ({ totalAmount = 0 }: PaymentQRProps) => {
  const { toast } = useToast();
  const { addOrder } = useOrder();
  const upiId = 'sdixit2301@okhdfcbank';

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

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(upiId);
    toast({
      title: "UPI ID Copied",
      description: "UPI ID copied to clipboard",
    });
  };

  const handlePayWithUPI = () => {
    const upiUrl = `upi://pay?pa=${upiId}&pn=Shree Spices&am=${totalAmount}&cu=INR`;
    
    // Try to open UPI app
    window.location.href = upiUrl;
    
    // Simulate payment notification to admin (in real app, this would be triggered by payment confirmation)
    setTimeout(() => {
      toast({
        title: "Payment Initiated",
        description: "Please complete the payment in your UPI app. Admin will be notified once payment is confirmed.",
      });
    }, 1000);
  };

  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader className="text-center">
        <CardTitle>Scan to Pay</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center">
          <img 
            src="/lovable-uploads/2ff3c361-c4f3-4e90-9c2c-82eb07c05f3b.png" 
            alt="Payment QR Code"
            className="w-48 h-48 object-contain border rounded-lg"
          />
        </div>
        
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">UPI ID</p>
          <div className="flex items-center justify-center gap-2">
            <p className="font-mono text-sm">{upiId}</p>
            <Button size="sm" variant="ghost" onClick={handleCopyUPI}>
              <Copy className="h-3 w-3" />
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col gap-2">
          <Button onClick={handlePayWithUPI} className="w-full">
            <Smartphone className="mr-2 h-4 w-4" />
            Pay with UPI
          </Button>
          <Button onClick={handleDownloadQR} variant="outline" className="w-full">
            <Download className="mr-2 h-4 w-4" />
            Download QR
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentQR;