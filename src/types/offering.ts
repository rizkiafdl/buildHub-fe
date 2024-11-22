export interface OfferItem {
    no: number;
    shop_id: string;
    shop_name: string;
    logo_url: string;
    offer_price: number;
    offer_explanation: string;
    shipment_price: number;
}

export interface SelectedStore {
    id: string;
    store_name: string;
    logo_url: string;
    price: number;
    shipment_price: number;
}

export type SortField = 'shipment' | 'offer';
export type SortDirection = 'asc' | 'desc';

export interface SortState {
    field: SortField;
    direction: SortDirection;
}