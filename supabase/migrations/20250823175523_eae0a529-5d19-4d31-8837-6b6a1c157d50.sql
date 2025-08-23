-- Remove transaction_id column from payments table
ALTER TABLE public.payments DROP COLUMN IF EXISTS transaction_id;