import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { CartItem } from './CartContext';
import { supabase } from '@/integrations/supabase/client';

export type OrderStatus = 'received' | 'accepted' | 'preparing' | 'ready' | 'out_for_delivery' | 'delivered';

export interface CustomerInfo {
  name: string;
  phone: string;
  address: string;
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  customerInfo: CustomerInfo;
  total: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

interface OrderState {
  orders: Order[];
  loading: boolean;
}

type OrderAction = 
  | { type: 'SET_ORDERS'; payload: Order[] }
  | { type: 'ADD_ORDER'; payload: Order }
  | { type: 'UPDATE_ORDER_STATUS'; payload: { id: string; status: OrderStatus } }
  | { type: 'SET_LOADING'; payload: boolean };

const orderReducer = (state: OrderState, action: OrderAction): OrderState => {
  switch (action.type) {
    case 'SET_ORDERS':
      return { ...state, orders: action.payload };
    
    case 'ADD_ORDER':
      return { ...state, orders: [action.payload, ...state.orders] };
    
    case 'UPDATE_ORDER_STATUS': {
      const updatedOrders = state.orders.map(order =>
        order.id === action.payload.id
          ? { ...order, status: action.payload.status, updatedAt: new Date() }
          : order
      );
      return { ...state, orders: updatedOrders };
    }
    
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    default:
      return state;
  }
};

interface OrderContextType {
  state: OrderState;
  addOrder: (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateOrderStatus: (id: string, status: OrderStatus) => Promise<void>;
  fetchOrders: () => Promise<void>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(orderReducer, { orders: [], loading: false });

  const fetchOrders = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (ordersError) throw ordersError;

      const ordersWithItems = await Promise.all(
        ordersData.map(async (order) => {
          const { data: itemsData, error: itemsError } = await supabase
            .from('order_items')
            .select('*')
            .eq('order_id', order.id);

          if (itemsError) throw itemsError;

          return {
            id: order.id,
            customerInfo: {
              name: order.customer_name,
              phone: order.customer_phone,
              address: order.customer_address,
            },
            total: Number(order.total),
            status: order.status as OrderStatus,
            createdAt: new Date(order.created_at),
            updatedAt: new Date(order.updated_at),
            items: itemsData.map(item => ({
              id: item.id,
              name: item.product_name,
              price: Number(item.price),
              quantity: item.quantity,
            }))
          };
        })
      );

      dispatch({ type: 'SET_ORDERS', payload: ordersWithItems });
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const addOrder = async (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          customer_name: order.customerInfo.name,
          customer_phone: order.customerInfo.phone,
          customer_address: order.customerInfo.address,
          total: order.total,
          status: order.status,
        })
        .select()
        .single();

      if (orderError) throw orderError;

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(
          order.items.map(item => ({
            order_id: orderData.id,
            product_name: item.name,
            price: item.price,
            quantity: item.quantity,
          }))
        );

      if (itemsError) throw itemsError;

      const newOrder: Order = {
        id: orderData.id,
        items: order.items,
        customerInfo: order.customerInfo,
        total: order.total,
        status: order.status,
        createdAt: new Date(orderData.created_at),
        updatedAt: new Date(orderData.updated_at),
      };

      dispatch({ type: 'ADD_ORDER', payload: newOrder });
    } catch (error) {
      console.error('Error adding order:', error);
    }
  };

  const updateOrderStatus = async (id: string, status: OrderStatus) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      dispatch({ type: 'UPDATE_ORDER_STATUS', payload: { id, status } });
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <OrderContext.Provider value={{ state, addOrder, updateOrderStatus, fetchOrders }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};