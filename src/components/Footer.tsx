import { MessageCircle, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-secondary/50 to-muted/60 border-t border-primary/20 traditional-border spice-pattern">
      <div className="container py-12 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-turmeric to-paprika rounded-lg flex items-center justify-center animate-warm-pulse">
                <span className="text-white font-bold text-lg">🌶️</span>
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Shree Spices
              </h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Authentic South Indian homemade spices crafted with love and tradition from our family kitchen in Karnataka. Experience the pure taste of natural ingredients in every bite.
            </p>
            <div className="flex gap-2 flex-wrap">
              <div className="spice-badge bg-turmeric/10 text-turmeric border-turmeric/30">🌿 100% Natural</div>
              <div className="spice-badge bg-paprika/10 text-paprika border-paprika/30">🏠 Homemade</div>
              <div className="spice-badge bg-saffron/10 text-saffron border-saffron/30">🇮🇳 South Indian</div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Contact Information</h4>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                  <Phone className="h-4 w-4" />
                </div>
                <span>+91 99869 18992</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                  <MessageCircle className="h-4 w-4" />
                </div>
                <span>Nalini Dixit's Shree Spices</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                  <MapPin className="h-4 w-4" />
                </div>
                <span>Davangere, Karnataka</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Delivery Information</h4>
            <div className="text-sm text-muted-foreground space-y-2 leading-relaxed">
              <p>• <strong>Davangere:</strong> Collect from Dixit Offset Printers or home delivery available</p>
              <p>• <strong>Other locations:</strong> Courier delivery with 1-2 days processing time</p>
              <p>• <strong>Minimum order:</strong> 500g per product for freshness guarantee</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; 2024 Shree Spices. Made with <span className="text-accent">♥</span> for authentic taste.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;