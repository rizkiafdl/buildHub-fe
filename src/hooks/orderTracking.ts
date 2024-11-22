import { OrderStatus, OrderTracking } from '@/types/orderTracking';

export const generateOrderId = () => {
    return `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const createInitialOrderTracking = (orderId: string): OrderTracking => {
    const now = new Date().toISOString();
    return {
        orderId,
        status: 'PAYMENT_PENDING',
        currentStep: 0,
        timeline: [
            {
                status: 'PAYMENT_PENDING',
                date: now,
                description: 'Order has been placed and is awaiting payment confirmation.'
            }
        ]
    };
};


export const updateOrderStatus = (
    currentTracking: OrderTracking,
    newStatus: OrderStatus,
    description: string
): OrderTracking => {
    const now = new Date().toISOString();
    const newTimeline = [
        ...currentTracking.timeline,
        {
            status: newStatus,
            date: now,
            description
        }
    ];

    return {
        ...currentTracking,
        status: newStatus,
        currentStep: newTimeline.length - 1,
        timeline: newTimeline
    };
};