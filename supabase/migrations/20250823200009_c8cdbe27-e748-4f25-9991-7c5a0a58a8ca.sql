-- Fix security vulnerability: Restrict payment access to owner only
-- This prevents unauthorized access to sensitive financial information

-- Drop the existing insecure policy that allows all users to view all payments
DROP POLICY IF EXISTS "Users can view their payment records" ON public.payments;

-- Create a secure policy that only allows users to view their own payment records
-- by linking payments to orders through order_id and checking user ownership
CREATE POLICY "Users can view own payment records" 
ON public.payments 
FOR SELECT 
USING (
  -- Users can only view payments for orders they own
  EXISTS (
    SELECT 1 
    FROM orders 
    WHERE orders.id = payments.order_id 
    AND orders.user_id = auth.uid()
  )
  OR
  -- Admin users can view all payment records
  EXISTS ( 
    SELECT 1
    FROM profiles
    WHERE (profiles.id = auth.uid()) 
    AND (profiles.phone = ANY (ARRAY['9986918992'::text, '1234567890'::text]))
  )
);

-- Ensure the existing admin update policy is secure
-- Verify admin users can still update payment status
DROP POLICY IF EXISTS "Admins can update payment status" ON public.payments;

CREATE POLICY "Admins can update payment status" 
ON public.payments 
FOR UPDATE 
USING (
  EXISTS ( 
    SELECT 1
    FROM profiles
    WHERE (profiles.id = auth.uid()) 
    AND (profiles.phone = ANY (ARRAY['9986918992'::text, '1234567890'::text]))
  )
);

-- Keep the existing insert policy for payment creation
-- The "Users can insert payment records" policy allows creation which is needed