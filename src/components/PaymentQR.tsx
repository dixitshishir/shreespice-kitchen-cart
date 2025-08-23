import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Download, Copy, Smartphone, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

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
  const [transactionId, setTransactionId] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
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
    
    toast({
      title: "Payment Initiated",
      description: "Complete the payment in your UPI app, then enter the transaction ID below.",
    });
  };

  const handleVerifyPayment = async () => {
    if (!transactionId.trim()) {
      toast({
        title: "Transaction ID Required",
        description: "Please enter your transaction ID to verify payment.",
        variant: "destructive"
      });
      return;
    }

    if (!customerDetails || !orderId) {
      toast({
        title: "Order Information Missing",
        description: "Customer details and order ID are required for verification.",
        variant: "destructive"
      });
      return;
    }

    setIsVerifying(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('verify-payment', {
        body: {
          orderId,
          transactionId: transactionId.trim(),
          amount: totalAmount,
          customerName: customerDetails.name,
          customerPhone: customerDetails.phone
        }
      });

      if (error) throw error;

      if (data.success) {
        setIsVerified(true);
        
        // Open WhatsApp to notify admin
        if (data.whatsappUrl) {
          window.open(data.whatsappUrl, '_blank');
        }

        toast({
          title: "Payment Verification Submitted! ✅",
          description: "Admin has been notified and will verify your payment soon.",
        });
      }
    } catch (error) {
      console.error('Payment verification error:', error);
      toast({
        title: "Verification Failed",
        description: "Failed to submit payment verification. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader className="text-center">
        <CardTitle>
          {isVerified ? "Payment Submitted ✅" : "Scan to Pay"}
        </CardTitle>
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
        
        <div className="text-center">
          <p className="text-lg font-bold">₹{totalAmount}</p>
        </div>

        {!isVerified ? (
          <>
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

            <div className="space-y-2 pt-4 border-t">
              <Label htmlFor="transactionId">Enter Transaction ID after payment:</Label>
              <Input
                id="transactionId"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                placeholder="e.g., 123456789012"
                disabled={isVerifying}
              />
              <Button 
                onClick={handleVerifyPayment}
                disabled={isVerifying || !transactionId.trim()}
                className="w-full"
                variant="default"
              >
                {isVerifying ? (
                  "Verifying..."
                ) : (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    I have completed payment
                  </>
                )}
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-4 space-y-2">
            <CheckCircle className="h-8 w-8 text-green-600 mx-auto" />
            <p className="text-sm text-green-600 font-medium">
              Payment verification submitted successfully!
            </p>
            <p className="text-xs text-muted-foreground">
              Admin will verify and confirm your payment shortly.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PaymentQR;