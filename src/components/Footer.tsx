import { Phone, MapPin, Truck } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-secondary/50 to-muted/60 border-t border-primary/20">
      <div className="container py-6 px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Contact */}
          <div className="flex items-center gap-6 flex-wrap text-sm text-muted-foreground">
            <a href="tel:+919986918992" className="flex items-center gap-2 hover:text-foreground transition-colors">
              <Phone className="h-4 w-4 text-primary" />
              <span>+91 99869 18992</span>
            </a>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span>Davangere, Karnataka</span>
            </div>
          </div>
          
          {/* Delivery Info */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Truck className="h-4 w-4 text-primary" />
            <span>Local pickup or courier • Min 500g order</span>
          </div>
        </div>
        
        <div className="border-t border-border mt-4 pt-4 text-center">
          <p className="text-xs text-muted-foreground">
            &copy; 2024 Shree Spices and Snacks. Made with <span className="text-accent">♥</span> for authentic taste.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
