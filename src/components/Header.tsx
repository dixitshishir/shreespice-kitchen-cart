import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const handleWhatsAppContact = () => {
    const motherPhone = '9986918992';
    const message = '👋 Hello! I would like to know more about Shree Spices products and place an order.';
    const waUrl = `https://wa.me/${motherPhone}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container flex flex-col gap-3 py-3 sm:flex-row sm:h-16 sm:items-center sm:justify-between sm:py-0">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-saffron to-paprika bg-clip-text text-transparent">
            Shree Spices
          </h1>
          <span className="text-sm text-muted-foreground hidden sm:inline">
            Authentic Homemade Spices
          </span>
        </div>
        
        <div className="flex justify-center sm:justify-end">
          <Button
            onClick={handleWhatsAppContact}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white"
          >
            <MessageCircle className="h-4 w-4" />
            <span>Contact Us</span>
          </Button>
        </div>
      </div>

    </header>
  );
};

export default Header;