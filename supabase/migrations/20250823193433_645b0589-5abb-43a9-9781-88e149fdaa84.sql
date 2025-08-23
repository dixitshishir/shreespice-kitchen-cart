-- Drop the conflicting policy that requires user_id to match auth.uid()
DROP POLICY IF EXISTS "Users can insert their own orders" ON public.orders;

-- Also ensure we have proper select policies for anonymous orders
DROP POLICY IF EXISTS "Users can view their own orders" ON public.orders;

-- Create a policy that allows viewing orders for both authenticated users and admins
CREATE POLICY "Users can view orders" 
ON public.orders 
FOR SELECT 
USING (
  auth.uid() = user_id OR  -- Users can see their own orders
  user_id IS NULL OR       -- Anyone can see anonymous orders  
  EXISTS (                 -- Admins can see all orders
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.phone = ANY (ARRAY['9986918992'::text, '1234567890'::text])
  )
);