// atoms/offerAtoms.ts
import { atom } from 'jotai';
import { OFFER_DATA, BASE_PRICE } from "@/constant/OfferData";
import { OfferItem, SelectedStore } from '@/types/offering';
import { cartTotalAtom } from './biddingAtoms';

// Base atoms
export const baseOfferPriceAtom = atom(BASE_PRICE);
export const offerListAtom = atom<OfferItem[]>(OFFER_DATA);
export const filteredOffersAtom = atom<OfferItem[]>(OFFER_DATA);
export const selectedStoreAtom = atom<SelectedStore | null>(null);

// Derived atoms for price calculations
export const calculatedOfferPricesAtom = atom((get) => {
    const cartTotal = get(cartTotalAtom);
    const offers = get(offerListAtom);

    return offers.map(offer => ({
        ...offer,
        // Adjust offer price based on cart total
        offer_price: cartTotal > 0 ? cartTotal + offer.shipment_price : offer.offer_price
    }));
});

// Updated filtered offers atom that uses calculated prices
export const calculatedFilteredOffersAtom = atom(
    (get) => {
        const cartTotal = get(cartTotalAtom);
        const filteredOffers = get(filteredOffersAtom);

        return filteredOffers.map(offer => ({
            ...offer,
            offer_price: cartTotal > 0 ? cartTotal + offer.shipment_price : offer.offer_price
        }));
    }
);

// Grand total atom that considers cart items
// atoms/offerAtoms.ts
export const grandTotalAtom = atom((get) => {
    const selectedStore = get(selectedStoreAtom);
    const cartTotal = get(cartTotalAtom);

    if (!selectedStore) return 0;
    return cartTotal + selectedStore.shipment_price;
});
// Updated offer actions
export const offerActions = {
    handleChoose: (
        store: OfferItem,
        setSelectedStore: (store: SelectedStore | null) => void,
        setFilteredOffers: (offers: OfferItem[]) => void,
        currentOffers: OfferItem[]
    ) => {
        const newStore: SelectedStore = {
            id: store.shop_id,
            store_name: store.shop_name,
            logo_url: store.logo_url,
            price: store.offer_price,
            shipment_price: store.shipment_price,
        };
        setSelectedStore(newStore);
        setFilteredOffers(currentOffers.filter(shop => shop.shop_id !== store.shop_id));
    },

    handleReject: (
        shop_id: string,
        setFilteredOffers: (offers: OfferItem[]) => void,
        currentOffers: OfferItem[]
    ) => {
        setFilteredOffers(currentOffers.filter(shop => shop.shop_id !== shop_id));
    },

    handleAbort: (
        selectedStore: SelectedStore | null,
        originalOffers: OfferItem[],
        setFilteredOffers: (offers: OfferItem[]) => void,
        currentOffers: OfferItem[],
        setSelectedStore: (store: SelectedStore | null) => void,
        _setGrandTotal: (total: number) => void // Not needed anymore
    ) => {
        if (selectedStore) {
            const newShop = originalOffers.find(shop => shop.shop_id === selectedStore.id);
            if (newShop) {
                setFilteredOffers([...currentOffers, newShop]);
            }
        }
        setSelectedStore(null);
    },

    handleSort: (
        type: 'shipment' | 'offer',
        direction: 'asc' | 'desc',
        setFilteredOffers: (offers: OfferItem[]) => void,
        currentOffers: OfferItem[]
    ) => {
        const sortedOffers = [...currentOffers].sort((a, b) => {
            const valueA = type === 'shipment' ? a.shipment_price : a.offer_price;
            const valueB = type === 'shipment' ? b.shipment_price : b.offer_price;
            return direction === 'asc' ? valueA - valueB : valueB - valueA;
        });
        setFilteredOffers(sortedOffers);
    }
};