import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart, Plus, Minus, Trash2, ArrowRight, ArrowLeft, Send, Package, User, MapPin, AlertCircle } from 'lucide-react';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 'cart' | 'summary' | 'details';

const Cart = ({ isOpen, onClose }: CartProps) => {
  const { items, updateQuantity, removeFromCart, clearCart, getTotal } = useCart();
  const { toast } = useToast();
  const [step, setStep] = useState<Step>('cart');
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    countryCode: '+91',
    phone: '',
    address: '',
    landmark: '',
    city: '',
    pincode: ''
  });

  const countryCodes = [
    { code: '+91', country: '🇮🇳 India', name: 'India', digits: 10, gradient: 'linear-gradient(135deg, #FF9933 0%, #FFFFFF 50%, #138808 100%)' },
    { code: '+1-US', country: '🇺🇸 USA', name: 'United States', digits: 10, gradient: 'linear-gradient(135deg, #3C3B6E 0%, #FFFFFF 50%, #B22234 100%)' },
    { code: '+44', country: '🇬🇧 UK', name: 'United Kingdom', digits: 10, gradient: 'linear-gradient(135deg, #012169 0%, #FFFFFF 50%, #C8102E 100%)' },
    { code: '+971', country: '🇦🇪 Dubai/UAE', name: 'United Arab Emirates', digits: 9, gradient: 'linear-gradient(135deg, #00732F 0%, #FFFFFF 40%, #000000 70%, #FF0000 100%)' },
    { code: '+49', country: '🇩🇪 Germany', name: 'Germany', digits: 11, gradient: 'linear-gradient(135deg, #000000 0%, #DD0000 50%, #FFCC00 100%)' },
    { code: '+61', country: '🇦🇺 Australia', name: 'Australia', digits: 9, gradient: 'linear-gradient(135deg, #00008B 0%, #FFFFFF 50%, #FF0000 100%)' },
    { code: '+65', country: '🇸🇬 Singapore', name: 'Singapore', digits: 8, gradient: 'linear-gradient(135deg, #ED2939 0%, #FFFFFF 100%)' },
    { code: '+1-CA', country: '🇨🇦 Canada', name: 'Canada', digits: 10, gradient: 'linear-gradient(135deg, #FF0000 0%, #FFFFFF 50%, #FF0000 100%)' },
  ];

  const getActualCode = (code: string) => code.replace(/-US|-CA/, '');

  const getPhoneDigitLimit = () => {
    const country = countryCodes.find(c => c.code === customerDetails.countryCode);
    return country?.digits || 10;
  };

  const getCountryGradient = () => {
    const country = countryCodes.find(c => c.code === customerDetails.countryCode);
    return country?.gradient || 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)';
  };

  const handlePhoneChange = (value: string) => {
    const digitsOnly = value.replace(/\D/g, '');
    const limitedDigits = digitsOnly.slice(0, getPhoneDigitLimit());
    setCustomerDetails({ ...customerDetails, phone: limitedDigits });
  };

  const handleCountryCodeChange = (newCode: string) => {
    const newCountry = countryCodes.find(c => c.code === newCode);
    const maxDigits = newCountry?.digits || 10;
    const trimmedPhone = customerDetails.phone.slice(0, maxDigits);
    setCustomerDetails({ ...customerDetails, countryCode: newCode, phone: trimmedPhone });
  };

  const handleProceedToSummary = () => {
    if (items.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Please add items to cart before ordering.",
        variant: "destructive"
      });
      return;
    }
    setStep('summary');
  };

  const handleSubmitOrder = () => {
    if (!customerDetails.name || !customerDetails.phone || !customerDetails.address || !customerDetails.city) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const motherPhone = '9986918992';
    const isDavangere = customerDetails.city.toLowerCase().includes('davangere');
    
    const orderItems = items.map(item => 
      `${item.product.name} - ${item.quantity} unit(s) (${item.quantity * 500}g)`
    ).join('\n');

    const orderMessage = `🛒 *New Order - Shree Spices and Snacks*

📦 *Order Items:*
${orderItems}

👤 *Customer Details:*
Name: ${customerDetails.name}
Phone: ${getActualCode(customerDetails.countryCode)} ${customerDetails.phone}

📍 *Address:*
${customerDetails.address}
${customerDetails.landmark ? `Landmark: ${customerDetails.landmark}` : ''}
City: ${customerDetails.city}
${customerDetails.pincode ? `PIN: ${customerDetails.pincode}` : ''}

${isDavangere ? 
  '🏠 *Collection:* Collect from Dixit Offset Printers or from our home.' : 
  '📦 *Delivery:* This order will be couriered to you. Courier charges will be calculated based on your location. Usually takes 1-2 days to prepare the order.'}

---
*Nalini Dixit's Shree Spices and Snacks* 📱 ${motherPhone}`;

    const waUrl = `https://wa.me/${motherPhone}?text=${encodeURIComponent(orderMessage)}`;
    window.open(waUrl, '_blank');
    
    clearCart();
    setCustomerDetails({
      name: '',
      countryCode: '+91',
      phone: '',
      address: '',
      landmark: '',
      city: '',
      pincode: ''
    });
    setStep('cart');
    onClose();
    
    toast({
      title: "Order Sent! 🎉",
      description: "Your order has been sent via WhatsApp to Nalini Dixit.",
    });
  };

  const resetAndClose = () => {
    setStep('cart');
    onClose();
  };

  const totalWeight = items.reduce((total, item) => total + (item.quantity * 500), 0);

  // Step indicator component
  const StepIndicator = () => (
    <div className="flex items-center justify-center gap-2 mb-4">
      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
        step === 'summary' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
      }`}>
        <Package className="h-3.5 w-3.5" />
        <span>Order</span>
      </div>
      <div className="w-6 h-0.5 bg-muted rounded" />
      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
        step === 'details' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
      }`}>
        <User className="h-3.5 w-3.5" />
        <span>Details</span>
      </div>
    </div>
  );

  // Step 2: Order Summary
  if (step === 'summary') {
    return (
      <Dialog open={isOpen} onOpenChange={resetAndClose}>
        <DialogContent className="w-[92vw] max-w-md max-h-[85vh] overflow-y-auto p-5 rounded-2xl border-border/50 bg-card/98 backdrop-blur-md shadow-xl">
          <DialogHeader className="pb-2">
            <DialogTitle className="text-xl font-bold text-center">Review Your Order</DialogTitle>
          </DialogHeader>
          
          <StepIndicator />
          
          <div className="space-y-4">
            {/* Order Items */}
            <div className="bg-gradient-to-br from-secondary/80 to-muted/60 rounded-xl p-4 space-y-3">
              <h3 className="font-semibold text-sm flex items-center gap-2">
                <Package className="h-4 w-4 text-primary" />
                Order Items ({items.length})
              </h3>
              
              <div className="space-y-2.5 max-h-[35vh] overflow-y-auto pr-1">
                {items.map(item => (
                  <div key={item.product.id} className="flex items-center gap-3 bg-background/80 rounded-lg p-2.5 shadow-sm">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm leading-tight line-clamp-1">{item.product.name}</h4>
                      <p className="text-xs text-muted-foreground">{item.quantity} × {item.quantity * 500}g</p>
                    </div>
                    <span className="font-bold text-sm text-primary">₹{item.product.price * item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Total Card */}
            <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-xl p-4 border border-primary/20">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">Total Weight</span>
                <span className="font-medium">{totalWeight}g</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Order Total</span>
                <span className="text-2xl font-bold text-primary">₹{getTotal()}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button 
                variant="outline" 
                onClick={() => setStep('cart')} 
                className="flex-1 rounded-xl border-border hover:bg-secondary h-12"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Edit Cart
              </Button>
              <Button 
                onClick={() => setStep('details')} 
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl h-12 font-semibold"
              >
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Step 3: Customer Details
  if (step === 'details') {
    return (
      <Dialog open={isOpen} onOpenChange={resetAndClose}>
        <DialogContent className="w-[92vw] max-w-md max-h-[85vh] overflow-y-auto p-5 rounded-2xl border-border/50 bg-card/98 backdrop-blur-md shadow-xl">
          <DialogHeader className="pb-2">
            <DialogTitle className="text-xl font-bold text-center">Your Details</DialogTitle>
          </DialogHeader>
          
          <StepIndicator />
          
          <div className="space-y-4">
            {/* Personal Info Section */}
            <div className="space-y-3">
              <div>
                <Label htmlFor="name" className="text-sm font-medium flex items-center gap-1">
                  <User className="h-3.5 w-3.5 text-primary" />
                  Full Name *
                </Label>
                <Input
                  id="name"
                  value={customerDetails.name}
                  onChange={(e) => setCustomerDetails({...customerDetails, name: e.target.value})}
                  placeholder="Enter your full name"
                  className="mt-1.5 h-11 rounded-xl border-border focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-sm font-medium">Phone Number *</Label>
                <div className="flex gap-2 mt-1.5">
                  <select
                    value={customerDetails.countryCode}
                    onChange={(e) => handleCountryCodeChange(e.target.value)}
                    style={{ background: getCountryGradient() }}
                    className="h-11 px-2 rounded-xl border border-border text-sm w-24 flex-shrink-0 font-bold text-gray-800 shadow-sm cursor-pointer"
                  >
                    {countryCodes.map(({ code, country, name }) => (
                      <option key={code} value={code} title={name} className="bg-white text-gray-800">{getActualCode(code)}</option>
                    ))}
                  </select>
                  <Input
                    id="phone"
                    type="tel"
                    inputMode="numeric"
                    value={customerDetails.phone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    placeholder={`${getPhoneDigitLimit()} digit number`}
                    maxLength={getPhoneDigitLimit()}
                    className="h-11 rounded-xl border-border flex-1"
                  />
                </div>
                {customerDetails.phone.length > 0 && customerDetails.phone.length < getPhoneDigitLimit() && (
                  <p className="text-xs text-amber-600 mt-1">Enter {getPhoneDigitLimit()} digit phone number</p>
                )}
              </div>
            </div>

            {/* Address Section with Highlight */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-3">
                <AlertCircle className="h-4 w-4 text-amber-600 flex-shrink-0" />
                <p className="text-xs text-amber-700 dark:text-amber-400">
                  <strong>Note:</strong> This address will be used for courier delivery for non-Davangere orders.
                </p>
              </div>

              <div>
                <Label htmlFor="address" className="text-sm font-medium flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-primary" />
                  Full Address *
                </Label>
                <Textarea
                  id="address"
                  value={customerDetails.address}
                  onChange={(e) => setCustomerDetails({...customerDetails, address: e.target.value})}
                  placeholder="House/Flat No, Street, Area"
                  className="mt-1.5 rounded-xl border-border resize-none focus:ring-2 focus:ring-primary/20"
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="city" className="text-sm font-medium">City *</Label>
                  <Input
                    id="city"
                    value={customerDetails.city}
                    onChange={(e) => setCustomerDetails({...customerDetails, city: e.target.value})}
                    placeholder="City"
                    className="mt-1.5 h-11 rounded-xl border-border"
                  />
                </div>
                <div>
                  <Label htmlFor="pincode" className="text-sm font-medium">PIN Code</Label>
                  <Input
                    id="pincode"
                    value={customerDetails.pincode}
                    onChange={(e) => setCustomerDetails({...customerDetails, pincode: e.target.value})}
                    placeholder="PIN Code"
                    className="mt-1.5 h-11 rounded-xl border-border"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="landmark" className="text-sm font-medium">Landmark (Optional)</Label>
                <Input
                  id="landmark"
                  value={customerDetails.landmark}
                  onChange={(e) => setCustomerDetails({...customerDetails, landmark: e.target.value})}
                  placeholder="Nearby landmark"
                  className="mt-1.5 h-11 rounded-xl border-border"
                />
              </div>
            </div>

            {/* Delivery Info */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-xl p-4 border border-blue-100 dark:border-blue-900">
              <p className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-2">
                <Package className="h-4 w-4" />
                Delivery Information
              </p>
              <div className="space-y-2 text-xs text-blue-700 dark:text-blue-400">
                <p className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">Davangere:</span>
                  <span>Collect from Dixit Offset Printers or from our home.</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-orange-600 font-bold">Other Cities:</span>
                  <span>Orders will be couriered. Charges vary by location. 1-2 days preparation time.</span>
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button 
                variant="outline" 
                onClick={() => setStep('summary')} 
                className="flex-1 rounded-xl border-border hover:bg-secondary h-12"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <Button 
                onClick={handleSubmitOrder} 
                className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-xl h-12 font-semibold shadow-lg shadow-green-600/20"
              >
                <Send className="h-4 w-4 mr-2" />
                Send via WhatsApp
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Step 1: Cart View
  return (
    <Dialog open={isOpen} onOpenChange={resetAndClose}>
      <DialogContent className="w-[92vw] max-w-md max-h-[85vh] overflow-y-auto p-5 rounded-2xl border-border/50 bg-card/98 backdrop-blur-md shadow-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-bold">
            <ShoppingCart className="h-5 w-5 text-primary" />
            Your Cart
            {items.length > 0 && (
              <span className="ml-auto text-sm font-normal text-muted-foreground">
                {items.length} item{items.length > 1 ? 's' : ''}
              </span>
            )}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="h-10 w-10 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground font-medium">Your cart is empty</p>
              <p className="text-sm text-muted-foreground mt-1">Add some delicious items to get started!</p>
            </div>
          ) : (
            <>
              <div className="space-y-3 max-h-[45vh] overflow-y-auto pr-1">
                {items.map(item => (
                  <div key={item.product.id} className="bg-gradient-to-br from-secondary/60 to-muted/40 rounded-xl p-3 shadow-sm">
                    {/* Top row: Image, Name, Delete */}
                    <div className="flex items-start gap-3 mb-2">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name}
                        className="w-14 h-14 object-cover rounded-lg flex-shrink-0 shadow-sm"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm leading-tight line-clamp-2">{item.product.name}</h4>
                        <p className="text-xs text-muted-foreground mt-0.5">₹{item.product.price}/500g</p>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeFromCart(item.product.id)}
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50 flex-shrink-0 rounded-full"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {/* Bottom row: Quantity controls + Total */}
                    <div className="flex items-center justify-between bg-background/70 rounded-lg p-2">
                      <div className="flex items-center gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="h-8 w-8 p-0 rounded-full bg-white shadow-sm"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </Button>
                        <span className="text-sm font-bold w-10 text-center">{item.quantity}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="h-8 w-8 p-0 rounded-full bg-white shadow-sm"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">{item.quantity * 500}g</p>
                        <p className="text-sm font-bold text-green-600">₹{item.product.price * item.quantity}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total Section */}
              <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-xl p-4 border border-primary/20">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-muted-foreground">Total Weight: {totalWeight}g</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-2xl font-bold text-primary">₹{getTotal()}</span>
                </div>
              </div>

              <Button 
                onClick={handleProceedToSummary} 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 h-12 rounded-xl font-semibold shadow-lg shadow-primary/20"
              >
                Continue to Checkout
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Cart;
