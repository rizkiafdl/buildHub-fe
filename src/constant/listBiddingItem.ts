interface BiddingItems {
    title: string;
    price: number;
    desc: string;
    img: string;
    avail_seller: number;
    isFavorite: boolean;
}

const dummyBiddingItems: BiddingItems[] = [
    {
        title: "Vintage Camera",
        price: 299.99,
        desc: "Classic 1960s rangefinder camera in excellent condition",
        img: "/images/vintage-camera.jpg",
        avail_seller: 3,
        isFavorite: false
    },
    {
        title: "Mechanical Keyboard",
        price: 159.99,
        desc: "Cherry MX Blue switches with PBT keycaps",
        img: "/images/mech-keyboard.jpg",
        avail_seller: 5,
        isFavorite: true
    },
    {
        title: "Retro Console",
        price: 199.99,
        desc: "Original Nintendo Entertainment System with controllers",
        img: "/images/retro-console.jpg",
        avail_seller: 2,
        isFavorite: false
    },
    {
        title: "Art Prints",
        price: 49.99,
        desc: "Set of 5 limited edition art prints, numbered and signed",
        img: "/images/art-prints.jpg",
        avail_seller: 10,
        isFavorite: true
    }
];

export default dummyBiddingItems;