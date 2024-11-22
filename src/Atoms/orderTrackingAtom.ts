import { atom } from 'jotai';
import { OrderTracking } from '@/types/orderTracking';

export const orderTrackingAtom = atom<OrderTracking>({
    orderId: '',
    status: 'PAYMENT_PENDING',
    currentStep: 0,
    timeline: []
});