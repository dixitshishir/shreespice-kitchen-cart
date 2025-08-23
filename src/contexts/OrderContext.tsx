import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { CartItem } from './CartContext';

export type OrderStatus = 'received' | 'accepted' | 'preparing' | 'ready' | 'out_for_delivery' | 'delivered';

export interface CustomerInfo {
  name: string;
  phone: string;
  address: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  customerInfo: CustomerInfo;
  total: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

interface OrderState {
  orders: Order[];
}

type OrderAction = 
  | { type: 'ADD_ORDER'; payload: Omit<Order, 'id' | 'createdAt' | 'updatedAt'> }
  | { type: 'UPDATE_ORDER_STATUS'; payload: { id: string; status: OrderStatus } };

const orderReducer = (state: OrderState, action: OrderAction): OrderState => {
  switch (action.type) {
    case 'ADD_ORDER': {
      const newOrder: Order = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      return {
        orders: [newOrder, ...state.orders]
      };
    }
    
    case 'UPDATE_ORDER_STATUS': {
      const updatedOrders = state.orders.map(order =>
        order.id === action.payload.id
          ? { ...order, status: action.payload.status, updatedAt: new Date() }
          : order
      );
      return {
        orders: updatedOrders
      };
    }
    
    default:
      return state;
  }
};

interface OrderContextType {
  state: OrderState;
  addOrder: (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(orderReducer, { orders: [] });

  const addOrder = (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => {
    dispatch({ type: 'ADD_ORDER', payload: order });
  };

  const updateOrderStatus = (id: string, status: OrderStatus) => {
    dispatch({ type: 'UPDATE_ORDER_STATUS', payload: { id, status } });
  };

  return (
    <OrderContext.Provider value={{ state, addOrder, updateOrderStatus }}>
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