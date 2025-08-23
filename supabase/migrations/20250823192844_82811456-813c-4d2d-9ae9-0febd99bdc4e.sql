-- Drop existing policy and create a new one that allows public order insertion
DROP POLICY IF EXISTS "Allow public order insertion for anonymous customers" ON public.orders;

-- Create a more permissive policy for order insertion that allows both authenticated and anonymous users
CREATE POLICY "Allow order insertion for all users" 
ON public.orders 
FOR INSERT 
WITH CHECK (true);

-- Also ensure order_items can be inserted by anyone
DROP POLICY IF EXISTS "Users can insert their order items" ON public.order_items;

CREATE POLICY "Allow order item insertion for all orders" 
ON public.order_items 
FOR INSERT 
WITH CHECK (true);