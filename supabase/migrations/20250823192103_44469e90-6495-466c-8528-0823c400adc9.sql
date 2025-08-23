-- Add policy to allow public order insertion for anonymous customers
CREATE POLICY "Allow public order insertion for anonymous customers" 
ON public.orders 
FOR INSERT 
WITH CHECK (user_id IS NULL);