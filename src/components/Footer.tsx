import { MessageCircle, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-saffron to-paprika bg-clip-text text-transparent mb-4">
              Shree Spices
            </h3>
            <p className="text-muted-foreground mb-4">
              Authentic homemade spices crafted with love and tradition. Experience the pure taste of natural ingredients.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact Information</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+91 99869 18992</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                <span>Nalini Dixit's Shree Spices</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Davangere, Karnataka</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Delivery Information</h4>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>• Davangere: Collect from Dixit Offset Printers or home delivery</p>
              <p>• Other locations: Courier delivery (1-2 days processing)</p>
              <p>• Minimum order: 500g per product</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Shree Spices. Made with ❤️ for authentic taste.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;