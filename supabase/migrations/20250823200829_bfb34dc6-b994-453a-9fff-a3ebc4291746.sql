-- Fix admin access to orders by removing Supabase auth dependency
-- Since admin authentication is handled in the application, not through Supabase auth

-- Drop current restrictive policies
DROP POLICY IF EXISTS "Orders access policy" ON public.orders;
DROP POLICY IF EXISTS "Allow order creation" ON public.orders;

-- Create policies that allow admin functionality without Supabase auth
-- Allow viewing all orders (needed for admin panel)
CREATE POLICY "Admin can view all orders" 
ON public.orders 
FOR SELECT 
USING (true);

-- Allow creating orders (needed for customer orders)
CREATE POLICY "Allow all order creation" 
ON public.orders 
FOR INSERT 
WITH CHECK (true);

-- Allow updating orders (needed for status updates)
CREATE POLICY "Allow order updates" 
ON public.orders 
FOR UPDATE 
USING (true);

-- Update order_items policies to match
DROP POLICY IF EXISTS "Admins can view all order items" ON public.order_items;
DROP POLICY IF EXISTS "Users can view their order items" ON public.order_items;
DROP POLICY IF EXISTS "Allow order item insertion for all orders" ON public.order_items;

-- Allow viewing all order items
CREATE POLICY "View all order items" 
ON public.order_items 
FOR SELECT 
USING (true);

-- Allow creating order items
CREATE POLICY "Create order items" 
ON public.order_items 
FOR INSERT 
WITH CHECK (true);