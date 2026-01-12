# Shree Spices and Snacks - Technical Documentation

## 📋 Table of Contents
1. [Application Overview](#-application-overview)
2. [Architecture Diagram](#-architecture-diagram)
3. [Technology Stack](#-technology-stack)
4. [What's Actually Used](#-whats-actually-used)
5. [Component Flow](#-component-flow)
6. [Database Schema](#-database-schema)
7. [Edge Functions](#-edge-functions)
8. [Security Implementation](#-security-implementation)
9. [End-to-End User Flow](#-end-to-end-user-flow)

---

## 🏠 Application Overview

**Shree Spices and Snacks** is a family-owned e-commerce web application selling authentic homemade South Indian spices, sweets, and snacks. 

### What's Live & Active:
- ✅ **Product Catalog**: 25+ products across 5 categories
- ✅ **Shopping Cart**: Full cart management with quantity controls
- ✅ **WhatsApp Ordering**: Primary order method - sends orders directly to business owner
- ✅ **AI Assistant (SpiceSage)**: Chatbot for product queries using Lovable AI
- ⚠️ **Razorpay Integration**: Available but secondary to WhatsApp ordering

---

## 🏗️ Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              FRONTEND (React + Vite)                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │    Header    │  │     Hero     │  │ ProductGrid  │  │    Footer    │    │
│  │  (Cart Icon) │  │   (Banner)   │  │  (Products)  │  │   (Links)    │    │
│  └──────┬───────┘  └──────────────┘  └──────┬───────┘  └──────────────┘    │
│         │                                    │                              │
│         │         ┌──────────────────────────┤                              │
│         │         │                          │                              │
│  ┌──────▼─────────▼──┐    ┌──────────────────▼───┐    ┌──────────────────┐ │
│  │   CartContext     │    │    ProductCard       │    │ ProductAssistant │ │
│  │ (Global State)    │    │   (Flip Card UI)     │    │   (AI Chatbot)   │ │
│  └──────────┬────────┘    └──────────────────────┘    └────────┬─────────┘ │
│             │                                                   │           │
└─────────────┼───────────────────────────────────────────────────┼───────────┘
              │                                                   │
              ▼                                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           SUPABASE BACKEND                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌────────────────────────────────────────────────────────────────────┐    │
│  │                        EDGE FUNCTIONS                               │    │
│  ├────────────────────┬───────────────────┬───────────────────────────┤    │
│  │ product-assistant  │  verify-payment   │  create-razorpay-order    │    │
│  │ ✅ ACTIVE          │ ⚠️ AVAILABLE      │  ⚠️ AVAILABLE             │    │
│  │ (AI Chat - Public) │ (Auth Required)   │  (Payment Processing)     │    │
│  └────────────────────┴───────────────────┴───────────────────────────┘    │
│                                                                             │
│  ┌────────────────────────────────────────────────────────────────────┐    │
│  │                         DATABASE TABLES                             │    │
│  ├────────────────┬────────────────┬──────────────┬──────────────────┤    │
│  │    profiles    │     orders     │ order_items  │    payments      │    │
│  │  (User Info)   │  (Order Data)  │(Line Items)  │ (Payment Logs)   │    │
│  └────────────────┴────────────────┴──────────────┴──────────────────┘    │
│                                                                             │
│  ┌────────────────────────────────────────────────────────────────────┐    │
│  │                      SECURITY (RLS + RBAC)                          │    │
│  ├────────────────────────────────────────────────────────────────────┤    │
│  │  user_roles table + has_role() function for admin access control   │    │
│  └────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          EXTERNAL SERVICES                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌──────────────────┐    ┌──────────────────┐    ┌──────────────────┐      │
│  │     WhatsApp     │    │     Razorpay     │    │  Lovable AI API  │      │
│  │  ✅ PRIMARY      │    │  ⚠️ AVAILABLE    │    │  ✅ ACTIVE       │      │
│  └──────────────────┘    └──────────────────┘    └──────────────────┘      │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose | Status |
|-------|------------|---------|--------|
| **Frontend** | React 18 + TypeScript | UI Components & Logic | ✅ Active |
| **Build Tool** | Vite | Fast development & bundling | ✅ Active |
| **Styling** | Tailwind CSS + shadcn/ui | Design system & components | ✅ Active |
| **State Management** | React Context API | Cart state management | ✅ Active |
| **Routing** | React Router v6 | Client-side navigation | ✅ Active |
| **Backend** | Supabase | Database, Auth, Edge Functions | ✅ Active |
| **Database** | PostgreSQL (Supabase) | Data persistence | ✅ Active |
| **Edge Functions** | Deno (Supabase) | Serverless backend logic | ✅ Active |
| **AI** | Lovable AI Gateway (Gemini) | Product assistant chatbot | ✅ Active |
| **Payments** | Razorpay | Payment processing | ⚠️ Available |
| **Hosting** | Vercel | Frontend deployment | ✅ Active |
| **Mobile** | Capacitor | Native app wrapper | ⚠️ Configured |

---

## 🎯 What's Actually Used

### ✅ ACTIVELY USED

| Feature | Component/File | Description |
|---------|---------------|-------------|
| **Product Display** | `ProductGrid.tsx`, `ProductCard.tsx` | 25+ products with flip card hover effect |
| **Shopping Cart** | `CartContext.tsx`, `Cart.tsx` | Add/remove items, quantity management |
| **WhatsApp Ordering** | `Cart.tsx` (handleSubmitOrder) | Primary ordering method |
| **AI Chatbot** | `ProductAssistant.tsx` + `product-assistant/` | SpiceSage for product Q&A |
| **Voice Input** | `ProductAssistant.tsx` | Web Speech API for voice queries |
| **Tab Refresh Hook** | `useVisibilityRefresh.ts` | Prevents stale state after WhatsApp redirect |

### ⚠️ AVAILABLE BUT SECONDARY

| Feature | Files | Description |
|---------|-------|-------------|
| **Razorpay Payments** | `create-razorpay-order/`, `razorpay-webhook/` | Full payment flow ready |
| **Payment Verification** | `verify-payment/` | JWT-protected payment creation |
| **Database Orders** | `orders`, `order_items`, `payments` tables | Schema ready for future use |
| **User Authentication** | Supabase Auth configured | Available but not required for WhatsApp flow |

### ❌ NOT CURRENTLY USED

| Feature | Reason |
|---------|--------|
| `OrderContext.tsx` | File doesn't exist (mentioned in old docs) |
| Admin Dashboard | No admin page currently implemented |
| `PaymentQR.tsx` | File doesn't exist |

---

## 🔄 Component Flow

### Active Component Tree

```
App.tsx
├── CartProvider (Context)                    # Global cart state
│   └── Routes
│       ├── "/" → Index.tsx
│       │   ├── Header.tsx                    # Logo + Cart icon
│       │   ├── Hero.tsx                      # Banner with tagline
│       │   ├── ProductGrid.tsx               # Product categories
│       │   │   └── ProductCard.tsx (×25+)    # Individual products
│       │   ├── ProductAssistant.tsx          # SpiceSage AI chatbot
│       │   └── Footer.tsx                    # Contact info
│       │
│       ├── "/story" → Story.tsx              # About page
│       └── "*" → NotFound.tsx                # 404 page
│
└── Cart.tsx (Modal)                          # Shopping cart drawer
    ├── Cart Items List
    ├── Customer Details Form
    └── WhatsApp Submit Button
```

### Data Flow Diagram

```
┌──────────────────────────────────────────────────────────────────┐
│                        USER INTERACTIONS                          │
└──────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────────┐
│  ProductCard                                                      │
│  ├─ Click "Add" → addToCart(product)                              │
│  ├─ Click "+" → updateQuantity(id, qty+1)                         │
│  └─ Click "-" → updateQuantity(id, qty-1)                         │
└──────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────────┐
│  CartContext (Global State)                                       │
│  ├─ items: CartItem[]                                             │
│  ├─ addToCart(product)                                            │
│  ├─ removeFromCart(productId)                                     │
│  ├─ updateQuantity(productId, quantity)                           │
│  ├─ clearCart()                                                   │
│  ├─ getTotal() → number                                           │
│  └─ getItemCount() → number                                       │
└──────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────────┐
│  Cart.tsx (Modal)                                                 │
│  ├─ Display cart items with quantities                            │
│  ├─ Customer form (name, phone, address)                          │
│  └─ handleSubmitOrder()                                           │
│      ├─ Validate form fields                                      │
│      ├─ Build WhatsApp message                                    │
│      ├─ window.open(waUrl, '_blank')                              │
│      ├─ clearCart()                                               │
│      └─ Show success toast                                        │
└──────────────────────────────────────────────────────────────────┘
```

---

## 🗄️ Database Schema

### Entity Relationship Diagram

```
┌──────────────┐         ┌──────────────┐         ┌─────────────┐
│   profiles   │         │    orders    │         │ order_items │
│──────────────│         │──────────────│         │─────────────│
│ id (PK, FK)  │◄────────│ user_id (FK) │         │ id (PK)     │
│ full_name    │         │ id (PK)      │◄────────│ order_id(FK)│
│ phone        │         │ customer_*   │         │ product_name│
│ created_at   │         │ total        │         │ quantity    │
│ updated_at   │         │ status       │         │ price       │
└──────────────┘         │ payment_id───│──┐      │ created_at  │
                         │ created_at   │  │      └─────────────┘
                         │ updated_at   │  │
                         └──────────────┘  │
                                           │
┌──────────────┐                           │      ┌─────────────┐
│  user_roles  │                           └─────►│  payments   │
│──────────────│                                  │─────────────│
│ id (PK)      │                                  │ id (PK)     │
│ user_id (FK) │                                  │ order_id(FK)│
│ role (enum)  │                                  │ amount      │
│ created_at   │                                  │ status      │
└──────────────┘                                  │ user_name   │
                                                  │ user_phone  │
                                                  └─────────────┘
```

### Table Details

#### `profiles` - User Information
```sql
id           UUID    PK, FK → auth.users(id)
full_name    TEXT    User's display name
phone        TEXT    Phone number
created_at   TIMESTAMPTZ
updated_at   TIMESTAMPTZ
```

#### `user_roles` - RBAC System
```sql
id           UUID    PK
user_id      UUID    FK → auth.users(id) ON DELETE CASCADE
role         app_role ('admin' | 'user')
created_at   TIMESTAMPTZ
UNIQUE(user_id, role)
```

#### `orders` - Customer Orders
```sql
id               UUID    PK
user_id          UUID    FK → auth.users (nullable)
payment_id       UUID    FK → payments
customer_name    TEXT    NOT NULL
customer_phone   TEXT    NOT NULL
customer_address TEXT    NOT NULL
total            NUMERIC NOT NULL
status           TEXT    DEFAULT 'received'
created_at       TIMESTAMPTZ
updated_at       TIMESTAMPTZ
```

#### `order_items` - Order Line Items
```sql
id           UUID    PK
order_id     UUID    FK → orders
product_name TEXT    NOT NULL
quantity     INTEGER NOT NULL
price        NUMERIC NOT NULL
created_at   TIMESTAMPTZ
```

#### `payments` - Payment Records
```sql
id                 UUID    PK
order_id           UUID    FK → orders
amount             NUMERIC NOT NULL
status             TEXT    DEFAULT 'pending'
user_name          TEXT
user_phone         TEXT
payment_method     TEXT    DEFAULT 'UPI'
verification_notes TEXT
created_at         TIMESTAMPTZ
updated_at         TIMESTAMPTZ
```

---

## ⚡ Edge Functions

### 1. product-assistant ✅ ACTIVE
**Path**: `supabase/functions/product-assistant/index.ts`  
**Authentication**: None required (public)  
**Purpose**: AI-powered customer service chatbot

**How It Works**:
```
1. User types question in SpiceSage chat
2. Frontend calls supabase.functions.invoke('product-assistant', { body: { question } })
3. Edge Function sends request to Lovable AI Gateway
4. System prompt includes full product catalog (prices, descriptions)
5. Gemini model generates contextual response
6. Response returned to frontend and displayed
```

**Request**:
```json
{ "question": "What's the price of Mysore Pak?" }
```

**Response**:
```json
{ "answer": "Mysore Pak costs ₹250 for 500g. It's made with pure ghee..." }
```

---

### 2. verify-payment ⚠️ AVAILABLE
**Path**: `supabase/functions/verify-payment/index.ts`  
**Authentication**: JWT required  
**Purpose**: Create payment verification records

**Security Features**:
- ✅ JWT token verification
- ✅ Order ownership check (user_id must match)
- ✅ Amount validation (must match order total)
- ✅ Duplicate prevention (checks if payment_id already exists)

**Flow**:
```
1. Verify Authorization header has valid JWT
2. Extract user ID from token
3. Validate order exists and belongs to user
4. Check order doesn't already have a payment
5. Verify amount matches order total
6. Create payment record with status='pending'
7. Update order with payment_id
8. Generate WhatsApp notification URL for admin
9. Return success response
```

---

### 3. create-razorpay-order ⚠️ AVAILABLE
**Path**: `supabase/functions/create-razorpay-order/index.ts`  
**Authentication**: None (should be added)  
**Purpose**: Create Razorpay payment orders

**Flow**:
```
1. Receive order details (orderId, amount, customerName, customerPhone)
2. Create Razorpay order via API (amount converted to paise)
3. Store payment record in database
4. Update order with payment_id
5. Return Razorpay order details for frontend checkout
```

---

### 4. razorpay-webhook ⚠️ AVAILABLE
**Path**: `supabase/functions/razorpay-webhook/index.ts`  
**Authentication**: Webhook signature verification  
**Purpose**: Handle Razorpay payment confirmations

**Flow**:
```
1. Receive webhook from Razorpay
2. Verify HMAC SHA256 signature
3. Parse payment.captured event
4. Extract order_id from payment notes
5. Update payment status to 'completed'
6. Update order status to 'confirmed'
```

---

## 🔐 Security Implementation

### Role-Based Access Control (RBAC)

```sql
-- Role enum
CREATE TYPE app_role AS ENUM ('admin', 'user');

-- User roles table (separate from profiles to prevent privilege escalation)
CREATE TABLE user_roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    UNIQUE (user_id, role)
);

-- Security definer function (prevents RLS recursion)
CREATE OR REPLACE FUNCTION has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;
```

### RLS Policy Summary

| Table | SELECT | INSERT | UPDATE | DELETE |
|-------|--------|--------|--------|--------|
| **profiles** | Own only | Own only | Own only | ❌ |
| **orders** | Own + Admin | Authenticated | Admin only | ❌ |
| **order_items** | Own orders + Admin | Authenticated | ❌ | ❌ |
| **payments** | Own orders + Admin | Authenticated | Admin only | ❌ |
| **user_roles** | Admin only | ❌ | ❌ | ❌ |

### Granting Admin Access

```sql
-- Find the user's ID first
SELECT id, email FROM auth.users WHERE email = 'admin@example.com';

-- Grant admin role
INSERT INTO user_roles (user_id, role)
VALUES ('user-uuid-here', 'admin');
```

---

## 🛒 End-to-End User Flow

### Primary Flow: WhatsApp Ordering (ACTIVE)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         CUSTOMER JOURNEY                                    │
└─────────────────────────────────────────────────────────────────────────────┘

STEP 1: BROWSE PRODUCTS
━━━━━━━━━━━━━━━━━━━━━━━
User visits site → Sees Hero banner → Scrolls to ProductGrid
Products organized by category: New Items, Powders, Sweets, Ready to Eat, Snacks

┌────────────────────────────────────────┐
│         ProductCard (Flip Card)        │
│ ┌─────────────────┐ ┌────────────────┐ │
│ │     FRONT       │ │     BACK       │ │
│ │   [Image]       │ │ Description    │ │
│ │   Name (EN)     │ │ in Playfair    │ │
│ │   Name (KN)     │ │ Display font   │ │
│ │   ₹Price        │ │                │ │
│ │   [+ Add]       │ │ Weight: 500g   │ │
│ └─────────────────┘ └────────────────┘ │
│           ← HOVER TO FLIP →            │
└────────────────────────────────────────┘


STEP 2: ADD TO CART
━━━━━━━━━━━━━━━━━━━
Click "+ Add" button on ProductCard
  │
  ├─► CartContext.addToCart(product)
  │     └─► Updates items[] state
  │
  └─► Header cart icon updates count


STEP 3: MANAGE CART
━━━━━━━━━━━━━━━━━━━
Click cart icon → Cart modal opens
  │
  ├─► View all items with quantities
  ├─► Adjust quantities with +/- buttons
  ├─► Remove items with trash icon
  └─► See running total


STEP 4: CUSTOMER DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━
Click "Proceed to Order" → Customer form appears

┌──────────────────────────────────────┐
│ Full Name *         [____________]   │
│                                      │
│ Phone *  [🇮🇳 +91 ▼] [__________]   │
│          (Country-specific digits)   │
│                                      │
│ Address *           [____________]   │
│                     [____________]   │
│                                      │
│ Landmark (Optional) [____________]   │
│                                      │
│ City *  [________]  PIN [______]     │
│                                      │
│ 📍 Delivery Info:                    │
│ • Davangere: Pickup or home delivery │
│ • Others: Courier (1-2 days prep)    │
└──────────────────────────────────────┘


STEP 5: SUBMIT ORDER
━━━━━━━━━━━━━━━━━━━━
Click "Send Order via WhatsApp"
  │
  ├─► Validate required fields
  │
  ├─► Build formatted message:
  │   ┌──────────────────────────────────────┐
  │   │ 🛒 *New Order - Shree Spices*        │
  │   │                                      │
  │   │ 📦 *Order Items:*                    │
  │   │ Mysore Pak - 2 units (1000g)         │
  │   │ Rasam Powder - 1 unit (500g)         │
  │   │                                      │
  │   │ 👤 *Customer Details:*               │
  │   │ Name: John Doe                       │
  │   │ Phone: +91 9876543210                │
  │   │                                      │
  │   │ 📍 *Address:*                        │
  │   │ 123 Main Street                      │
  │   │ Landmark: Near Park                  │
  │   │ City: Bangalore                      │
  │   │ PIN: 560001                          │
  │   │                                      │
  │   │ 📦 *Delivery:* Courier (1-2 days)    │
  │   └──────────────────────────────────────┘
  │
  ├─► Generate WhatsApp URL:
  │   https://wa.me/9986918992?text={encoded_message}
  │
  ├─► window.open(waUrl, '_blank')
  │
  ├─► clearCart()
  │
  └─► Show success toast: "Order Sent! 🎉"


STEP 6: WHATSAPP HANDOFF
━━━━━━━━━━━━━━━━━━━━━━━━
WhatsApp opens with pre-filled message
  │
  ├─► Customer reviews and sends message
  │
  └─► Business owner (Nalini Dixit) receives order
      └─► Manual fulfillment process begins
```

### AI Assistant Flow (ACTIVE)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         SPICESAGE CHATBOT                                   │
└─────────────────────────────────────────────────────────────────────────────┘

1. User clicks floating 🌿 button (bottom-right corner)
   └─► Chat window slides up with animation

2. Suggested questions shown:
   • "What spices do you have?"
   • "Tell me about Mysore Pak"
   • "What's good for rasam?"

3. User types question OR clicks mic for voice input
   └─► Web Speech API converts speech to text

4. handleSubmit() triggered:
   └─► supabase.functions.invoke('product-assistant', {
         body: { question: userQuestion }
       })

5. Edge Function processes:
   ├─► Loads product catalog (hardcoded in function)
   ├─► Builds system prompt with context
   ├─► Calls Lovable AI Gateway (Gemini model)
   └─► Returns AI-generated answer

6. Response displayed in chat with typing animation
```

### Payment Flow (AVAILABLE - Secondary)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         RAZORPAY PAYMENT FLOW                               │
└─────────────────────────────────────────────────────────────────────────────┘

1. Order created in database
   └─► INSERT INTO orders (...)

2. Frontend calls create-razorpay-order Edge Function
   └─► Creates Razorpay order via API
   └─► Returns Razorpay order_id

3. Razorpay checkout UI displayed
   └─► Customer enters card/UPI details

4. Payment completed
   └─► Razorpay sends webhook

5. razorpay-webhook Edge Function:
   ├─► Verifies HMAC signature
   ├─► Updates payment status → 'completed'
   └─► Updates order status → 'confirmed'

6. Customer sees confirmation
```

---

## 📁 File Structure

```
shree-spices/
├── public/
│   └── lovable-uploads/              # Product images (PNG)
├── src/
│   ├── assets/                       # Local images (JPG)
│   ├── components/
│   │   ├── ui/                       # shadcn/ui components
│   │   ├── Cart.tsx                  # ✅ Shopping cart + checkout
│   │   ├── Header.tsx                # ✅ Navigation bar
│   │   ├── Hero.tsx                  # ✅ Hero banner
│   │   ├── ProductCard.tsx           # ✅ Flip card product
│   │   ├── ProductGrid.tsx           # ✅ Product categories
│   │   ├── ProductAssistant.tsx      # ✅ SpiceSage chatbot
│   │   ├── Footer.tsx                # ✅ Footer
│   │   ├── FloatingEmojis.tsx        # ✅ Decorative emojis
│   │   └── ErrorBoundary.tsx         # ✅ Error handling
│   ├── contexts/
│   │   └── CartContext.tsx           # ✅ Cart state management
│   ├── hooks/
│   │   ├── use-toast.ts              # ✅ Toast notifications
│   │   ├── use-mobile.tsx            # ✅ Mobile detection
│   │   └── useVisibilityRefresh.ts   # ✅ Tab visibility handler
│   ├── integrations/supabase/
│   │   ├── client.ts                 # ✅ Supabase client
│   │   └── types.ts                  # ✅ Auto-generated types
│   ├── lib/
│   │   ├── supabase.ts               # ⚠️ Duplicate client
│   │   └── utils.ts                  # ✅ Utility functions
│   ├── pages/
│   │   ├── Index.tsx                 # ✅ Main page
│   │   ├── Story.tsx                 # ✅ About page
│   │   └── NotFound.tsx              # ✅ 404 page
│   ├── App.tsx                       # ✅ Root component
│   ├── main.tsx                      # ✅ Entry point
│   └── index.css                     # ✅ Styles + flip card CSS
├── supabase/
│   ├── config.toml                   # ✅ Supabase config
│   └── functions/
│       ├── product-assistant/        # ✅ AI chatbot
│       ├── verify-payment/           # ⚠️ Available
│       ├── create-razorpay-order/    # ⚠️ Available
│       ├── razorpay-webhook/         # ⚠️ Available
│       └── generate-recipe/          # ❓ Unknown status
├── capacitor.config.ts               # ⚠️ Mobile app config
├── tailwind.config.ts                # ✅ Tailwind config
├── vite.config.ts                    # ✅ Vite config
└── vercel.json                       # ✅ Vercel routing
```

---

## 🔧 Environment & Secrets

### Supabase Edge Function Secrets

| Secret | Purpose | Status |
|--------|---------|--------|
| `SUPABASE_URL` | Supabase project URL | ✅ Set |
| `SUPABASE_ANON_KEY` | Public API key | ✅ Set |
| `SUPABASE_SERVICE_ROLE_KEY` | Admin API key | ✅ Set |
| `LOVABLE_API_KEY` | AI Gateway access | ✅ Set |
| `RAZORPAY_KEY_ID` | Razorpay public key | ✅ Set |
| `RAZORPAY_KEY_SECRET` | Razorpay secret | ✅ Set |
| `GROK_API_KEY` | Alternative AI | ✅ Set |
| `OPENAI_API_KEY` | Alternative AI | ✅ Set |

### Frontend Configuration
- Supabase URL/key embedded in `src/integrations/supabase/client.ts`
- No VITE_* variables (Supabase edge functions don't support them)

---

## 📞 Business Information

- **Business Name**: Shree Spices and Snacks
- **Owner**: Nalini Dixit
- **WhatsApp**: 9986918992
- **Location**: Davangere, Karnataka, India
- **Speciality**: Homemade South Indian spices, sweets & snacks
- **All Products**: 500g packaging, made with pure ghee

---

## 🚀 Deployment

### Frontend (Vercel)
- Auto-deploys on git push
- `vercel.json` handles SPA routing:
  ```json
  { "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
  ```

### Backend (Supabase)
- Edge Functions auto-deploy on code changes
- Database migrations via Supabase dashboard
- RLS policies applied via SQL migrations

---

*Last Updated: January 2026*
