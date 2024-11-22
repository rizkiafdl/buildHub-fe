// atoms/biddingAtoms.ts
import { atom } from 'jotai';
import { BiddingItems } from '@/types/bidding';

// Extended type to include quantity and any additional cart-specific fields
export interface BiddingCartItem extends BiddingItems {
    quantity: number;
    selectedSeller?: number;
}

// Atom to store the cart items
export const biddingCartAtom = atom<BiddingCartItem[]>([]);

// Derived atom to get cart total
export const cartTotalAtom = atom((get) => {
    const cart = get(biddingCartAtom);
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
});

// Derived atom to get cart item count
export const cartItemCountAtom = atom((get) => {
    const cart = get(biddingCartAtom);
    return cart.reduce((total, item) => total + item.quantity, 0);
});