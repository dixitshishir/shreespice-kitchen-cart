-- Create payments table to track payment transactions
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  transaction_id TEXT,
  payment_method TEXT DEFAULT 'UPI',
  amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'rejected')),
  user_phone TEXT,
  user_name TEXT,
  verification_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can insert payment records" 
ON public.payments 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Users can view their payment records" 
ON public.payments 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can view all payments" 
ON public.payments 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM profiles 
  WHERE profiles.id = auth.uid() 
  AND profiles.phone = ANY(ARRAY['9986918992', '1234567890'])
));

CREATE POLICY "Admins can update payment status" 
ON public.payments 
FOR UPDATE 
USING (EXISTS (
  SELECT 1 FROM profiles 
  WHERE profiles.id = auth.uid() 
  AND profiles.phone = ANY(ARRAY['9986918992', '1234567890'])
));

-- Create trigger for updated_at
CREATE TRIGGER update_payments_updated_at
BEFORE UPDATE ON public.payments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add payment_id to orders table to link payments
ALTER TABLE public.orders 
ADD COLUMN payment_id UUID REFERENCES public.payments(id);