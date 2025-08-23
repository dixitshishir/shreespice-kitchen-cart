import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [razorpayOrder, setRazorpayOrder] = useState(null);
  const [isPaymentCompleted, setIsPaymentCompleted] = useState(false);

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


  const handleCreateRazorpayOrder = async () => {
    if (!customerDetails || !orderId) {
      toast({
        title: "Order Information Missing",
        description: "Customer details and order ID are required for payment.",
        variant: "destructive"
      });
      return;
    }

    setIsCreatingOrder(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('create-razorpay-order', {
        body: {
          orderId,
          amount: totalAmount,
          customerName: customerDetails.name,
          customerPhone: customerDetails.phone
        }
      });

      if (error) throw error;

      if (data.success) {
        setRazorpayOrder(data.razorpayOrder);
        
        toast({
          title: "Payment Order Created",
          description: "You can now proceed with the payment using UPI or any payment method.",
        });
      }
    } catch (error) {
      console.error('Payment order creation error:', error);
      toast({
        title: "Order Creation Failed",
        description: "Failed to create payment order. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsCreatingOrder(false);
    }
  };

  const handlePayWithRazorpay = () => {
    if (!razorpayOrder) return;

    const options = {
      key: 'rzp_test_YOUR_KEY_ID', // Will be replaced with actual key
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      name: 'Shree Spices',
      description: `Order #${orderId?.slice(-8)}`,
      order_id: razorpayOrder.id,
      handler: function (response: any) {
        setIsPaymentCompleted(true);
        toast({
          title: "Payment Successful! ✅",
          description: "Your payment has been confirmed. Order will be processed shortly.",
        });
      },
      prefill: {
        name: customerDetails?.name,
        contact: customerDetails?.phone,
      },
      theme: {
        color: '#f59e0b'
      }
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader className="text-center">
        <CardTitle>
          {isPaymentCompleted ? "Payment Completed ✅" : "Pay with Razorpay"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">₹{totalAmount}</p>
          <p className="text-sm text-muted-foreground mt-1">Secure payment with Razorpay</p>
        </div>

        {!isPaymentCompleted ? (
          <div className="space-y-3">
            {!razorpayOrder ? (
              <Button 
                onClick={handleCreateRazorpayOrder}
                disabled={isCreatingOrder}
                className="w-full"
                size="lg"
              >
                {isCreatingOrder ? (
                  "Creating Order..."
                ) : (
                  "Proceed to Payment"
                )}
              </Button>
            ) : (
              <div className="space-y-3">
                <Button 
                  onClick={handlePayWithRazorpay}
                  className="w-full bg-[#3395FF] hover:bg-[#3395FF]/90"
                  size="lg"
                >
                  <Smartphone className="mr-2 h-4 w-4" />
                  Pay Now with Razorpay
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Supports UPI, Cards, Net Banking & Wallets
                </p>
              </div>
            )}
            
            <div className="text-center space-y-2 pt-4 border-t">
              <p className="text-xs text-muted-foreground">
                Or scan the QR code below with any UPI app
              </p>
              <div className="flex justify-center">
                <img 
                  src="/lovable-uploads/2ff3c361-c4f3-4e90-9c2c-82eb07c05f3b.png" 
                  alt="Payment QR Code"
                  className="w-32 h-32 object-contain border rounded-lg"
                />
              </div>
              <Button onClick={handleDownloadQR} variant="outline" size="sm">
                <Download className="mr-2 h-3 w-3" />
                Download QR
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-4 space-y-2">
            <CheckCircle className="h-8 w-8 text-green-600 mx-auto" />
            <p className="text-sm text-green-600 font-medium">
              Payment completed successfully!
            </p>
            <p className="text-xs text-muted-foreground">
              Your order is being processed and you'll receive updates soon.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PaymentQR;