import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useOrder, OrderStatus, Order } from '@/contexts/OrderContext';
import { Phone, MapPin, Clock, ShoppingBag } from 'lucide-react';

const statusColors = {
  received: 'bg-blue-100 text-blue-800',
  accepted: 'bg-green-100 text-green-800',
  preparing: 'bg-yellow-100 text-yellow-800',
  ready: 'bg-purple-100 text-purple-800',
  out_for_delivery: 'bg-orange-100 text-orange-800',
  delivered: 'bg-gray-100 text-gray-800'
};

const statusLabels = {
  received: 'Order Received',
  accepted: 'Accepted',
  preparing: 'Preparing',
  ready: 'Ready for Pickup',
  out_for_delivery: 'Out for Delivery',
  delivered: 'Delivered'
};

const nextStatusMap: Record<OrderStatus, OrderStatus | null> = {
  received: 'accepted',
  accepted: 'preparing',
  preparing: 'ready',
  ready: 'out_for_delivery',
  out_for_delivery: 'delivered',
  delivered: null
};

const Admin = () => {
  const { state, updateOrderStatus } = useOrder();
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | 'all'>('all');

  const filteredOrders = selectedStatus === 'all' 
    ? state.orders 
    : state.orders.filter(order => order.status === selectedStatus);

  const handleStatusUpdate = (orderId: string, currentStatus: OrderStatus) => {
    const nextStatus = nextStatusMap[currentStatus];
    if (nextStatus) {
      updateOrderStatus(orderId, nextStatus);
    }
  };

  const sendWhatsAppUpdate = (order: Order) => {
    const message = `Hello ${order.customerInfo.name}! Your order #${order.id} status has been updated to: ${statusLabels[order.status]}. Total: ₹${order.total + 50}`;
    const whatsappUrl = `https://wa.me/91${order.customerInfo.phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const getStatusBadgeClass = (status: OrderStatus) => {
    return `${statusColors[status]} hover:opacity-80`;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Order Management</h1>
          <p className="text-muted-foreground">Manage customer orders and update status</p>
        </div>

        {/* Status Filter */}
        <div className="mb-6 flex flex-wrap gap-2">
          <Button
            variant={selectedStatus === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedStatus('all')}
          >
            All Orders ({state.orders.length})
          </Button>
          {Object.entries(statusLabels).map(([status, label]) => {
            const count = state.orders.filter(order => order.status === status).length;
            return (
              <Button
                key={status}
                variant={selectedStatus === status ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedStatus(status as OrderStatus)}
              >
                {label} ({count})
              </Button>
            );
          })}
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No orders found</p>
              </CardContent>
            </Card>
          ) : (
            filteredOrders.map((order) => (
              <Card key={order.id} className="w-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                    <Badge className={getStatusBadgeClass(order.status)}>
                      {statusLabels[order.status]}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {order.createdAt.toLocaleDateString()} {order.createdAt.toLocaleTimeString()}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Customer Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold">Customer Details</h4>
                      <div className="space-y-1 text-sm">
                        <p className="font-medium">{order.customerInfo.name}</p>
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          <span>{order.customerInfo.phone}</span>
                        </div>
                        <div className="flex items-start gap-1">
                          <MapPin className="h-3 w-3 mt-0.5" />
                          <span>{order.customerInfo.address}</span>
                        </div>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="space-y-2">
                      <h4 className="font-semibold">Order Items</h4>
                      <div className="space-y-1 text-sm">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex justify-between">
                            <span>{item.name} x{item.quantity}</span>
                            <span>₹{item.price * item.quantity}</span>
                          </div>
                        ))}
                        <Separator className="my-2" />
                        <div className="flex justify-between font-semibold">
                          <span>Total (incl. delivery)</span>
                          <span>₹{order.total + 50}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-4">
                    {nextStatusMap[order.status] && (
                      <Button
                        onClick={() => handleStatusUpdate(order.id, order.status)}
                        className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                      >
                        Mark as {statusLabels[nextStatusMap[order.status]!]}
                      </Button>
                    )}
                    
                    <Button
                      variant="outline"
                      onClick={() => sendWhatsAppUpdate(order)}
                      className="flex items-center gap-2"
                    >
                      <Phone className="h-4 w-4" />
                      Send WhatsApp Update
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;