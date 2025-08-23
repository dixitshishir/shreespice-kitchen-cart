-- Fix security vulnerability: Remove public access to orders with NULL user_id
-- This prevents unauthorized access to customer personal information

-- Drop the existing policy that allows public access
DROP POLICY IF EXISTS "Users can view orders" ON public.orders;

-- Create a new secure policy that only allows:
-- 1. Users to view their own orders (when user_id matches auth.uid())
-- 2. Admin users to view all orders (phone number based admin check)
CREATE POLICY "Secure order access" 
ON public.orders 
FOR SELECT 
USING (
  -- Users can view their own orders
  (auth.uid() = user_id) 
  OR 
  -- Admin users can view all orders
  (EXISTS ( 
    SELECT 1
    FROM profiles
    WHERE (profiles.id = auth.uid()) 
    AND (profiles.phone = ANY (ARRAY['9986918992'::text, '1234567890'::text]))
  ))
);

-- Ensure admin users can still update orders
-- This policy should already exist but let's verify it's secure
DROP POLICY IF EXISTS "Admins can update orders" ON public.orders;

CREATE POLICY "Admins can update orders" 
ON public.orders 
FOR UPDATE 
USING (
  EXISTS ( 
    SELECT 1
    FROM profiles
    WHERE (profiles.id = auth.uid()) 
    AND (profiles.phone = ANY (ARRAY['9986918992'::text, '1234567890'::text]))
  )
);

-- Keep the existing insert policy as it's needed for order creation
-- The "Allow order insertion for all users" policy is fine as it only allows creation