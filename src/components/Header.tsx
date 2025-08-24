import { useState } from 'react';
import { ShoppingCart, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface HeaderProps {
  onCartClick: () => void;
}

const Header = ({ onCartClick }: HeaderProps) => {
  const { state } = useCart();
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const [showSecretDialog, setShowSecretDialog] = useState(false);
  const [secretKey, setSecretKey] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAdminClick = () => {
    setShowSecretDialog(true);
  };

  const handleSecretSubmit = () => {
    if (secretKey === 'Admin@3112') {
      setShowSecretDialog(false);
      setSecretKey('');
      navigate('/admin');
      toast({
        title: "Access Granted",
        description: "Welcome to admin panel!",
      });
    } else {
      toast({
        title: "Access Denied",
        description: "Invalid secret key",
        variant: "destructive",
      });
    }
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
        
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleAdminClick}
            className="flex items-center gap-2 w-full sm:w-auto"
          >
            <Settings className="h-4 w-4" />
            <span>Admin</span>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onCartClick}
            className="relative w-full sm:w-auto"
          >
            <ShoppingCart className="h-4 w-4" />
            {itemCount > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
              >
                {itemCount}
              </Badge>
            )}
            <span className="ml-2">Cart</span>
          </Button>
        </div>
      </div>

      <Dialog open={showSecretDialog} onOpenChange={setShowSecretDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Admin Access</DialogTitle>
            <DialogDescription>
              Enter the secret key to access the admin panel
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="secret">Secret Key</Label>
              <Input
                id="secret"
                type="password"
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
                placeholder="Enter secret key"
                onKeyDown={(e) => e.key === 'Enter' && handleSecretSubmit()}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowSecretDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleSecretSubmit}>
                Access Admin
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Header;