-- Clean up remaining overly permissive policies

-- Drop redundant/old admin policies on orders that we didn't catch
DROP POLICY IF EXISTS "Admins can view all orders" ON public.orders;
DROP POLICY IF EXISTS "Admins can update orders" ON public.orders;

-- Fix order_items INSERT policy - should require authenticated user
DROP POLICY IF EXISTS "Create order items" ON public.order_items;
CREATE POLICY "Authenticated users can create order items"
ON public.order_items
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Fix orders INSERT policy - should require authentication  
DROP POLICY IF EXISTS "Allow all order creation" ON public.orders;
CREATE POLICY "Authenticated users can create orders"
ON public.orders
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Fix payments INSERT policy - should require authentication
DROP POLICY IF EXISTS "Users can insert payment records" ON public.payments;
CREATE POLICY "Authenticated users can insert payments"
ON public.payments
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Clean up old phone-based admin policies on payments and use role-based
DROP POLICY IF EXISTS "Admins can view all payments" ON public.payments;
DROP POLICY IF EXISTS "Users can view own payment records" ON public.payments;
DROP POLICY IF EXISTS "Admins can update payment status" ON public.payments;

-- New role-based policies for payments
CREATE POLICY "Users can view own payments"
ON public.payments
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.orders 
    WHERE orders.id = payments.order_id 
    AND orders.user_id = auth.uid()
  )
  OR public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Only admins can update payments"
ON public.payments
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));