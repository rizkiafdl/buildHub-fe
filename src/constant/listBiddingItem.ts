interface BiddingItems {
    id: string; // Unique identifier
    title: string;
    price: number;
    desc: string;
    img: string;
    avail_seller: number;
    isFavorite: boolean;
}

const dummyBiddingItems: BiddingItems[] = [
    {
        id: "1",
        title: "Besi Beton Polos 6mm",
        price: 26_000,
        desc: "Besi beton polos dengan diameter 6mm, sesuai standar SNI, ideal untuk struktur ringan.",
        img: "/images/besi-beton-polos-6mm.jpg",
        avail_seller: 12,
        isFavorite: true
    },
    {
        id: "2",
        title: "Besi Beton Polos 8mm",
        price: 43_500,
        desc: "Besi beton polos dengan diameter 8mm, memenuhi standar SNI, cocok untuk konstruksi menengah.",
        img: "/images/besi-beton-polos-8mm.jpg",
        avail_seller: 10,
        isFavorite: true
    },
    {
        id: "3",
        title: "Besi Beton Polos 10mm",
        price: 67_500,
        desc: "Besi beton polos dengan diameter 10mm, sesuai standar SNI, cocok untuk struktur yang lebih kuat.",
        img: "/images/besi-beton-polos-10mm.jpg",
        avail_seller: 8,
        isFavorite: false
    },
    {
        id: "4",
        title: "Besi Beton Ulir 12mm",
        price: 103_000,
        desc: "Besi beton ulir dengan diameter 12mm, sesuai standar SNI, memberikan daya rekat yang lebih baik pada beton.",
        img: "/images/besi-beton-ulir-12mm.jpg",
        avail_seller: 5,
        isFavorite: true
    },
    {
        id: "5",
        title: "Besi Beton Ulir 16mm",
        price: 177_500,
        desc: "Besi beton ulir dengan diameter 16mm, memenuhi standar SNI, ideal untuk struktur bangunan besar.",
        img: "/images/besi-beton-ulir-16mm.jpg",
        avail_seller: 3,
        isFavorite: false
    },
    {
        id: "6",
        title: "Batu Bata Merah",
        price: 1_000,
        desc: "Batu bata merah berkualitas tinggi, ukuran standar, cocok untuk dinding dan struktur bangunan.",
        img: "/images/batu-bata-merah.jpg",
        avail_seller: 20,
        isFavorite: true
    },
    {
        id: "7",
        title: "Batu Bata Batako",
        price: 2_500,
        desc: "Batako berkualitas, ukuran standar, ideal untuk pondasi dan dinding.",
        img: "/images/batu-bata-batako.jpg",
        avail_seller: 15,
        isFavorite: true
    },
    {
        id: "8",
        title: "Batu Bata Ringan (Hebel)",
        price: 7_800,
        desc: "Batu bata ringan (Hebel) ukuran 7,5x20x60 cm, ringan dan mudah dipasang.",
        img: "/images/batu-bata-ringan.jpg",
        avail_seller: 10,
        isFavorite: true
    },
    {
        id: "9",
        title: "Semen Portland",
        price: 60_000,
        desc: "Semen Portland berkualitas, ideal untuk berbagai aplikasi konstruksi, termasuk pondasi dan struktur beton.",
        img: "/images/semen-portland.jpg",
        avail_seller: 15,
        isFavorite: false
    },
    {
        id: "10",
        title: "Semen Holcim 40 kg",
        price: 51_000,
        desc: "Semen Holcim 40 kg, kualitas terjamin, cocok untuk berbagai kebutuhan konstruksi.",
        img: "/images/semen-holcim-40kg.jpg",
        avail_seller: 20,
        isFavorite: false
    },
    {
        id: "11",
        title: "Keramik Lantai 30x30 cm",
        price: 45_000,
        desc: "Keramik lantai ukuran 30x30 cm, berbagai motif dan warna, cocok untuk interior rumah.",
        img: "/images/keramik-lantai-30x30.jpg",
        avail_seller: 25,
        isFavorite: true
    },
    {
        id: "12",
        title: "Keramik Lantai 50x50 cm",
        price: 75_000,
        desc: "Keramik lantai ukuran 50x50 cm, desain modern, ideal untuk ruang tamu dan kamar tidur.",
        img: "/images/keramik-lantai-50x50.jpg",
        avail_seller: 18,
        isFavorite: true
    },
    {
        id: "13",
        title: "Cat Tembok Interior",
        price: 150_000,
        desc: "Cat tembok interior dengan berbagai pilihan warna, memberikan tampilan segar pada ruangan.",
        img: "/images/cat-tembok-interior.jpg",
        avail_seller: 30,
        isFavorite: false
    },
    {
        id: "14",
        title: "Cat Tembok Eksterior",
        price: 200_000,
        desc: "Cat tembok eksterior tahan cuaca, cocok untuk melindungi dinding luar rumah.",
        img: "/images/cat-tembok-eksterior.jpg",
        avail_seller: 25,
        isFavorite: false
    },
    {
        id: "15",
        title: "Pipa PVC Wavin 1 inch",
        price: 51_000,
        desc: "Pipa PVC Wavin ukuran 1 inch, kuat dan tahan lama, ideal untuk instalasi air bersih.",
        img: "/images/pipa-pvc-wavin-1inch.jpg",
        avail_seller: 20,
        isFavorite: true
    }
];

export default dummyBiddingItems;
