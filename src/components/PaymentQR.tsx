import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PaymentQR = () => {
  const { toast } = useToast();
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
        
        <div className="flex gap-2">
          <Button onClick={handleDownloadQR} variant="outline" className="flex-1">
            <Download className="mr-2 h-4 w-4" />
            Download QR
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentQR;