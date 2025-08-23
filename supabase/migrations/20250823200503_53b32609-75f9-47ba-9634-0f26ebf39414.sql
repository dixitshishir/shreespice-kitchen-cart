-- Fix order creation and viewing for guest customers while maintaining security
-- This allows guest orders (user_id IS NULL) but prevents unauthorized access

-- Drop the current secure policy that's too restrictive
DROP POLICY IF EXISTS "Secure order access" ON public.orders;

-- Create a new policy that allows:
-- 1. Admin users to view all orders
-- 2. Authenticated users to view their own orders  
-- 3. Guest orders (user_id IS NULL) to be viewed only by admins
CREATE POLICY "Orders access policy" 
ON public.orders 
FOR SELECT 
USING (
  -- Admin users can view all orders (including guest orders)
  EXISTS ( 
    SELECT 1
    FROM profiles
    WHERE (profiles.id = auth.uid()) 
    AND (profiles.phone = ANY (ARRAY['9986918992'::text, '1234567890'::text]))
  )
  OR
  -- Authenticated users can view their own orders (when user_id is not null)
  (user_id IS NOT NULL AND auth.uid() = user_id)
);

-- Update the insert policy to properly handle guest orders
DROP POLICY IF EXISTS "Allow order insertion for all users" ON public.orders;

CREATE POLICY "Allow order creation" 
ON public.orders 
FOR INSERT 
WITH CHECK (
  -- Allow guest orders (user_id IS NULL)
  user_id IS NULL
  OR
  -- Allow authenticated users to create orders for themselves
  auth.uid() = user_id
  OR
  -- Allow admin users to create orders for anyone
  EXISTS ( 
    SELECT 1
    FROM profiles
    WHERE (profiles.id = auth.uid()) 
    AND (profiles.phone = ANY (ARRAY['9986918992'::text, '1234567890'::text]))
  )
);