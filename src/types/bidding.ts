// types/bidding.ts
export interface BiddingItems {
    title: string;
    price: number;
    desc: string;
    img: string;
    avail_seller: number;
    isFavorite: boolean;
}

export interface BiddingParams {
    itemId: string;
    [key: string]: string | undefined;
}