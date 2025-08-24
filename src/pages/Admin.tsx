import { useState, useEffect } from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useOrder, OrderStatus, Order } from '@/contexts/OrderContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import AdminLogin from '@/components/AdminLogin';
import OrderHistory from '@/components/OrderHistory';
import { Phone, MapPin, Clock, ShoppingBag, LogOut, History, List } from 'lucide-react';

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { state, updateOrderStatus } = useOrder();
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | 'all'>('all');
  const [currentView, setCurrentView] = useState<'orders' | 'history'>('orders');
  const { toast } = useToast();

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const handleLogout = async () => {
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-saffron mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  const filteredOrders = selectedStatus === 'all' 
    ? state.orders 
    : state.orders.filter(order => order.status === selectedStatus);

  const handleStatusUpdate = (orderId: string, currentStatus: OrderStatus) => {
    const nextStatus = nextStatusMap[currentStatus];
    if (nextStatus) {
      updateOrderStatus(orderId, nextStatus);
      
      // Send WhatsApp update for status change
      const order = state.orders.find(o => o.id === orderId);
      if (order) {
        sendWhatsAppUpdate(order, nextStatus);
      }
      
    }
  };

  const sendWhatsAppUpdate = async (order: Order, statusToUpdate?: OrderStatus) => {
    // Create dynamic message based on current status or status being updated to
    let message = "";
    const orderNumber = order.id.slice(-8);
    const total = order.total + 50;
    const currentStatus = statusToUpdate || order.status;
    
    // Generate automated status-specific messages
    switch (currentStatus) {
      case 'received':
        message = `Hello ${order.customerInfo.name}! 📝 Thank you for your order #${orderNumber}. We have received your order and will process it shortly. Total: ₹${total}. We'll keep you updated!`;
        break;
      case 'accepted':
        message = `Hello ${order.customerInfo.name}! 🎉 Great news! Your order #${orderNumber} has been accepted and we're now preparing your fresh spices. Total: ₹${total}. Expected preparation time: 30-45 minutes. Thank you for choosing Shree Spices!`;
        break;
      case 'preparing':
        message = `Hi ${order.customerInfo.name}! 👨‍🍳 Your order #${orderNumber} is currently being prepared with the freshest ingredients. Our team is carefully packaging your spices. Total: ₹${total}. We'll notify you once it's ready for delivery!`;
        break;
      case 'ready':
        message = `Excellent news ${order.customerInfo.name}! 📦 Your order #${orderNumber} is ready and packed! We're now arranging for delivery to your location. Total: ₹${total}. Our delivery partner will be with you soon!`;
        break;
      case 'out_for_delivery':
        message = `Hi ${order.customerInfo.name}! 🚚 Your order #${orderNumber} is out for delivery and on its way to you! Our delivery partner should reach you within 30-45 minutes. Total: ₹${total}. Please keep your phone handy and be available at the delivery address.`;
        break;
      case 'delivered':
        message = `Thank you ${order.customerInfo.name}! ✅ Your order #${orderNumber} has been successfully delivered. Total: ₹${total}. We hope you enjoy your fresh Shree Spices products! Please rate your experience and don't hesitate to order again. 🌶️⭐`;
        break;
      default:
        message = `Hello ${order.customerInfo.name}! Your order #${orderNumber} status: ${statusLabels[currentStatus]}. Total: ₹${total}. Thank you for choosing Shree Spices!`;
    }
    
    // Add order details for better context
    const itemsList = order.items.map(item => `• ${item.name} x${item.quantity}`).join('\n');
    const fullMessage = `${message}\n\n📋 Order Details:\n${itemsList}\n\n🏪 Shree Spices - Fresh & Pure\n📞 Contact: 9986918992`;
    
    // Clean the phone number - remove any non-digits and ensure it starts with country code
    const cleanPhone = order.customerInfo.phone.replace(/\D/g, '');
    const phoneWithCountryCode = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`;
    
    // Try multiple WhatsApp URL formats for better compatibility
    const encodedMessage = encodeURIComponent(fullMessage);
    
    // Try WhatsApp app first (mobile), then web version
    const whatsappUrls = [
      `whatsapp://send?phone=${phoneWithCountryCode}&text=${encodedMessage}`, // Mobile app
      `https://web.whatsapp.com/send?phone=${phoneWithCountryCode}&text=${encodedMessage}`, // Web version
      `https://wa.me/${phoneWithCountryCode}?text=${encodedMessage}` // Fallback
    ];
    
    let urlIndex = 0;
    
    const tryNextUrl = () => {
      if (urlIndex < whatsappUrls.length) {
        const url = whatsappUrls[urlIndex];
        console.log(`Trying WhatsApp URL ${urlIndex + 1}:`, url);
        
        try {
          window.location.href = url;
          
          // Show success message after attempting to open WhatsApp
          setTimeout(() => {
            toast({
              title: "WhatsApp Message Sent! 📱",
              description: `${statusLabels[currentStatus]} notification sent to ${order.customerInfo.name}`,
              duration: 4000,
            });
          }, 1000);
          
        } catch (error) {
          console.error(`Error with URL ${urlIndex + 1}:`, error);
          urlIndex++;
          if (urlIndex < whatsappUrls.length) {
            setTimeout(tryNextUrl, 1000); // Try next URL after 1 second
          } else {
            // If all fail, copy to clipboard as fallback
            navigator.clipboard?.writeText(fullMessage).then(() => {
              toast({
                title: "Message Copied to Clipboard 📋",
                description: "WhatsApp didn't open automatically. Message copied - please paste it manually in WhatsApp.",
                duration: 6000,
              });
            }).catch(() => {
              toast({
                title: "Manual WhatsApp Required 📱",
                description: `Please message ${order.customerInfo.phone} manually with the order update.`,
                duration: 6000,
              });
            });
          }
        }
      }
    };
    
    tryNextUrl();
  };


  const getStatusBadgeClass = (status: OrderStatus) => {
    return `${statusColors[status]} hover:opacity-80`;
  };


  return (
    <div className="min-h-screen bg-background">
      {/* Mobile-Optimized Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="px-4 py-3 flex justify-between items-center">
          <div className="flex-1 min-w-0">
            <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-saffron to-accent bg-clip-text text-transparent truncate">
              Shree Spices Admin
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">Admin (9986918992)</p>
          </div>
          <Button 
            variant="outline" 
            onClick={handleLogout}
            size="sm"
            className="flex items-center gap-1 ml-2"
          >
            <LogOut className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </header>

      <div className="px-4 py-4 sm:py-8">
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-3xl font-bold mb-1 sm:mb-2">
                {currentView === 'orders' ? 'Orders' : 'History'}
              </h1>
              <p className="text-sm text-muted-foreground">
                {currentView === 'orders' 
                  ? 'Manage orders and update status' 
                  : 'View order history and analytics'
                }
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant={currentView === 'orders' ? 'default' : 'outline'}
                onClick={() => setCurrentView('orders')}
                size="sm"
                className="flex items-center gap-1 sm:gap-2"
              >
                <List className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="text-xs sm:text-sm">Orders</span>
              </Button>
              <Button
                variant={currentView === 'history' ? 'default' : 'outline'}
                onClick={() => setCurrentView('history')}
                size="sm"
                className="flex items-center gap-1 sm:gap-2"
              >
                <History className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="text-xs sm:text-sm">History</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Conditional Content */}
        {currentView === 'history' ? (
          <OrderHistory />
        ) : (
          <>
            {/* Mobile-Optimized Status Filter */}
            <div className="mb-4 flex flex-wrap gap-1 sm:gap-2">
              <Button
                variant={selectedStatus === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedStatus('all')}
                className="text-xs sm:text-sm"
              >
                All ({state.orders.length})
              </Button>
              {Object.entries(statusLabels).map(([status, label]) => {
                const count = state.orders.filter(order => order.status === status).length;
                const shortLabel = label.replace('Order ', '').replace('for Pickup', '');
                return (
                  <Button
                    key={status}
                    variant={selectedStatus === status ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedStatus(status as OrderStatus)}
                    className="text-xs sm:text-sm"
                  >
                    {shortLabel} ({count})
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
                    <CardHeader className="pb-3">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <CardTitle className="text-base sm:text-lg truncate">
                          Order #{order.id.slice(-8)}
                        </CardTitle>
                        <Badge className={`${getStatusBadgeClass(order.status)} text-xs`}>
                          {statusLabels[order.status]}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                        <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span>{order.createdAt.toLocaleDateString()} {order.createdAt.toLocaleTimeString()}</span>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-3 sm:space-y-4 pt-0">
                      {/* Mobile-Optimized Layout */}
                      <div className="space-y-3">
                        {/* Customer Info */}
                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm">Customer</h4>
                          <div className="space-y-1 text-sm">
                            <p className="font-medium">{order.customerInfo.name}</p>
                            <div className="flex items-center gap-1">
                              <Phone className="h-3 w-3 flex-shrink-0" />
                              <span className="break-all">{order.customerInfo.phone}</span>
                            </div>
                            <div className="flex items-start gap-1">
                              <MapPin className="h-3 w-3 mt-0.5 flex-shrink-0" />
                              <span className="text-xs sm:text-sm">{order.customerInfo.address}</span>
                            </div>
                          </div>
                        </div>

                        {/* Order Items */}
                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm">Items</h4>
                          <div className="space-y-1 text-sm">
                            {order.items.map((item) => (
                              <div key={item.id} className="flex justify-between gap-2">
                                <span className="truncate">{item.name} x{item.quantity}</span>
                                <span className="font-medium flex-shrink-0">₹{item.price * item.quantity}</span>
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

                      {/* Mobile-Optimized Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-2 pt-2">
                        {nextStatusMap[order.status] && (
                          <Button
                            onClick={() => handleStatusUpdate(order.id, order.status)}
                            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 w-full sm:w-auto"
                            size="sm"
                          >
                            Mark as {statusLabels[nextStatusMap[order.status]!]}
                          </Button>
                        )}
                        
                        <Button
                          variant="outline"
                          onClick={() => sendWhatsAppUpdate(order)}
                          className="flex items-center justify-center gap-2 w-full sm:w-auto"
                          size="sm"
                        >
                          <Phone className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span className="text-xs sm:text-sm">Send WhatsApp Update</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </>
        )}
      </div>

    </div>
  );
};

export default Admin;