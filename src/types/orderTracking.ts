export type OrderStatus =
    | 'PAYMENT_PENDING'
    | 'PAYMENT_CONFIRMED'
    | 'PROCESSING'
    | 'SHIPPED'
    | 'DELIVERED'
    | 'CANCELLED';

export interface OrderTracking {
    orderId: string;
    status: OrderStatus;
    currentStep: number;
    timeline: {
        status: OrderStatus;
        date: string;
        description: string;
    }[];
}
