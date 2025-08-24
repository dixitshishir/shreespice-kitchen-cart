import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CustomerDetails {
  name: string;
  phone: string;
  address: string;
}

interface CustomerDetailsFormProps {
  onSubmit: (details: CustomerDetails) => void;
  onBack: () => void;
}

const CustomerDetailsForm = ({ onSubmit, onBack }: CustomerDetailsFormProps) => {
  const [formData, setFormData] = useState<CustomerDetails>({
    name: '',
    phone: '',
    address: ''
  });

  const [errors, setErrors] = useState<Partial<CustomerDetails>>({});

  const validateForm = () => {
    const newErrors: Partial<CustomerDetails> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (field: keyof CustomerDetails, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <Card className="w-full max-w-sm sm:max-w-md mx-auto">
      <CardHeader className="pb-4 sm:pb-6">
        <CardTitle className="text-lg sm:text-xl font-semibold text-center">
          Customer Details
        </CardTitle>
        <p className="text-xs sm:text-sm text-muted-foreground text-center">
          Please provide your details to complete the order
        </p>
      </CardHeader>
      
      <CardContent className="px-4 sm:px-6">
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <div className="space-y-1 sm:space-y-2">
            <Label htmlFor="name" className="text-sm">Full Name *</Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter your full name"
              className={`text-sm sm:text-base ${errors.name ? 'border-destructive' : ''}`}
            />
            {errors.name && (
              <p className="text-xs sm:text-sm text-destructive">{errors.name}</p>
            )}
          </div>

          <div className="space-y-1 sm:space-y-2">
            <Label htmlFor="phone" className="text-sm">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="Enter 10-digit phone number"
              maxLength={10}
              className={`text-sm sm:text-base ${errors.phone ? 'border-destructive' : ''}`}
            />
            {errors.phone && (
              <p className="text-xs sm:text-sm text-destructive">{errors.phone}</p>
            )}
          </div>

          <div className="space-y-1 sm:space-y-2">
            <Label htmlFor="address" className="text-sm">Delivery Address *</Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="Enter your complete address for delivery"
              rows={3}
              className={`text-sm sm:text-base ${errors.address ? 'border-destructive' : ''}`}
            />
            {errors.address && (
              <p className="text-xs sm:text-sm text-destructive">{errors.address}</p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-3 sm:pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="w-full sm:flex-1 text-sm sm:text-base py-2 sm:py-3"
            >
              Back to Cart
            </Button>
            <Button
              type="submit"
              className="w-full sm:flex-1 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-sm sm:text-base py-2 sm:py-3"
            >
              Confirm Order
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CustomerDetailsForm;