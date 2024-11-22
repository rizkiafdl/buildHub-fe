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
        img: "https://www.superbangunjaya.com/wp-content/uploads/2020/11/1110100002-scaled.jpg",
        avail_seller: 5,
        isFavorite: true
    },
    {
        id: "5",
        title: "Besi Beton Ulir 16mm",
        price: 177_500,
        desc: "Besi beton ulir dengan diameter 16mm, memenuhi standar SNI, ideal untuk struktur bangunan besar.",
        img: "https://jualbesi.com/wp-content/uploads/2021/04/besi-beton-ulir-U_.jpg",
        avail_seller: 3,
        isFavorite: false
    },
    {
        id: "6",
        title: "Batu Bata Merah",
        price: 1_000,
        desc: "Batu bata merah berkualitas tinggi, ukuran standar, cocok untuk dinding dan struktur bangunan.",
        img: "https://e-katalog.lkpp.go.id/katalog/produk/download/gambar/966900125?file_name=182778147771427.jpg&v=3&file_sub_location=produk_gambar%2F2023%2F08%2F02",
        avail_seller: 20,
        isFavorite: true
    },
    {
        id: "7",
        title: "Batu Bata Batako",
        price: 2_500,
        desc: "Batako berkualitas, ukuran standar, ideal untuk pondasi dan dinding.",
        img: "https://tekniksipil.id/wp-content/uploads/2023/12/batako.jpg",
        avail_seller: 15,
        isFavorite: true
    },
    {
        id: "8",
        title: "Batu Bata Ringan (Hebel)",
        price: 7_800,
        desc: "Batu bata ringan (Hebel) ukuran 7,5x20x60 cm, ringan dan mudah dipasang.",
        img: "https://www.superbangunjaya.com/wp-content/uploads/2020/11/1110100002-scaled.jpg",
        avail_seller: 10,
        isFavorite: true
    },
    {
        id: "9",
        title: "Semen Portland",
        price: 60_000,
        desc: "Semen Portland berkualitas, ideal untuk berbagai aplikasi konstruksi, termasuk pondasi dan struktur beton.",
        img: "https://smb-padiumkm-images-public-prod.oss-ap-southeast-5.aliyuncs.com/product/image/13092023/633503ef817d4e64e6cc4fc5/65012581d972ab0fe62be706/7fff6594c67c9f04cdc2d066683176.jpeg",
        avail_seller: 15,
        isFavorite: false
    },
    {
        id: "10",
        title: "Semen Holcim 40 kg",
        price: 51_000,
        desc: "Semen Holcim 40 kg, kualitas terjamin, cocok untuk berbagai kebutuhan konstruksi.",
        img: "https://mataharijaya.co.id/wp-content/uploads/2019/10/jual-semen-holcim.jpg",
        avail_seller: 20,
        isFavorite: false
    },
    {
        id: "11",
        title: "Keramik Lantai 30x30 cm",
        price: 45_000,
        desc: "Keramik lantai ukuran 30x30 cm, berbagai motif dan warna, cocok untuk interior rumah.",
        img: "https://wp.qhomemart.com/wp-content/uploads/2022/05/ASIA-MURANO_11zon.jpg",
        avail_seller: 25,
        isFavorite: true
    },
    {
        id: "12",
        title: "Keramik Lantai 50x50 cm",
        price: 75_000,
        desc: "Keramik lantai ukuran 50x50 cm, desain modern, ideal untuk ruang tamu dan kamar tidur.",
        img: "https://wp.qhomemart.com/wp-content/uploads/2022/05/ASIA-MURANO_11zon.jpg",
        avail_seller: 18,
        isFavorite: true
    },
    {
        id: "13",
        title: "Cat Tembok Interior",
        price: 150_000,
        desc: "Cat tembok interior dengan berbagai pilihan warna, memberikan tampilan segar pada ruangan.",
        img: "https://img.id.my-best.com/product_images/427658e9934857f623e8bf76339a18c7.jpeg?ixlib=rails-4.3.1&q=70&lossless=0&w=800&h=800&fit=clip&s=0fb0637e34e1863110c1b8b366b13f86",
        avail_seller: 30,
        isFavorite: false
    },
    {
        id: "14",
        title: "Cat Tembok Eksterior",
        price: 200_000,
        desc: "Cat tembok eksterior tahan cuaca, cocok untuk melindungi dinding luar rumah.",
        img: "https://d3lfgix2a8jnun.cloudfront.net/custom-assets/9/cat-tembok_63a14f9b10246-iNkM3wyHQI7O6M6aFDBudua9F8EWuNZ5ohwey4uN.jpg",
        avail_seller: 25,
        isFavorite: false
    },
    {
        id: "15",
        title: "Pipa PVC Wavin 1 inch",
        price: 51_000,
        desc: "Pipa PVC Wavin ukuran 1 inch, kuat dan tahan lama, ideal untuk instalasi air bersih.",
        img: "https://www.rucika.co.id/wp-content/uploads/2022/01/Rucika-Standard-03.jpg",
        avail_seller: 20,
        isFavorite: true
    },
    {
        id: "16",
        title: "Pasir Beton",
        price: 350_000,
        desc: "Pasir beton berkualitas tinggi, ideal untuk campuran beton dan konstruksi bangunan.",
        img: "https://siplah-oss.tokoladang.co.id/merchant/26741/product/RwlNLFKIRvJzClJH09wXbSmS937VQL50v3wlXEvq.png",
        avail_seller: 10,
        isFavorite: false
    },
    {
        id: "17",
        title: "Batu Split 1/2",
        price: 300_000,
        desc: "Batu split ukuran 1/2 inch, cocok untuk campuran beton dan pondasi.",
        img: "https://cdn.brighton.co.id/Uploads/Images/5731092/nCFCpGFK/389.1-Medium.webp",
        avail_seller: 8,
        isFavorite: true
    },
    {
        id: "18",
        title: "Kayu Meranti 4x6",
        price: 50_000,
        desc: "Kayu Meranti ukuran 4x6 cm, sering digunakan untuk rangka atap dan konstruksi lainnya.",
        img: "https://e-katalog.lkpp.go.id/katalog/produk/download/gambar/966219387",
        avail_seller: 15,
        isFavorite: false
    },
    {
        id: "19",
        title: "Triplek 12mm",
        price: 140_000,
        desc: "Triplek dengan ketebalan 12mm, cocok untuk berbagai kebutuhan interior dan furnitur.",
        img: "https://e-katalog.lkpp.go.id/katalog/produk/download/gambar/976286737?file_name=8394465561491.png&v=3&file_sub_location=produk_gambar%2F2024%2F06%2F18",
        avail_seller: 12,
        isFavorite: true
    },
    {
        id: "20",
        title: "Genteng Keramik",
        price: 9_500,
        desc: "Genteng keramik berkualitas tinggi, tahan lama, dan estetis untuk atap rumah.",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkn8xxHevR8hothKe-z8fPNP9sI6jeC2wmcg&s",
        avail_seller: 20,
        isFavorite: false
    },
    {
        id: "21",
        title: "Paku 10 cm",
        price: 25_000,
        desc: "Paku baja ukuran 10 cm, kuat dan tahan karat, ideal untuk konstruksi kayu.",
        img: "https://image.made-in-china.com/226f3j00qILiGDdknlce/Paku-kuat-Electro-Steel-galvanisasi-memiliki-tambahan-paku-10cm-dari-Cina.webp",
        avail_seller: 30,
        isFavorite: true
    },
    {
        id: "22",
        title: "Kawat Bendrat 1 kg",
        price: 20_000,
        desc: "Kawat bendrat 1 kg, digunakan untuk mengikat besi beton dalam konstruksi.",
        img: "https://mataharijaya.co.id/wp-content/uploads/2019/10/jual-kawat-murah-jogja.jpg",
        avail_seller: 25,
        isFavorite: false
    },
    {
        id: "23",
        title: "Pintu Kayu Solid",
        price: 1_500_000,
        desc: "Pintu kayu solid dengan desain klasik, cocok untuk pintu utama rumah.",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQh8w7FamShWgHw_0OSAIWw5VDe1rjGNwpxg&s",
        avail_seller: 5,
        isFavorite: true
    },
    {
        id: "24",
        title: "Jendela Aluminium",
        price: 750_000,
        desc: "Jendela aluminium dengan kaca bening, tahan karat dan mudah perawatan.",
        img: "https://i0.wp.com/www.builder.id/wp-content/uploads/2020/02/harga-jendela-aluminium.jpg",
        avail_seller: 10,
        isFavorite: false
    },
    {
        id: "25",
        title: "Handle Pintu Stainless Steel",
        price: 100_000,
        desc: "Handle pintu berbahan stainless steel, desain modern dan tahan lama.",
        img: "/images/handle-pintu-stainless.jpg",
        avail_seller: 20,
        isFavorite: true
    },
    {
        id: "26",
        title: "Keramik Dinding 25x40 cm",
        price: 60_000,
        desc: "Keramik dinding ukuran 25x40 cm, berbagai motif menarik untuk interior.",
        img: "https://muliaceramics.com/backend/api/image_product?image=ImageProList1694496045.jpeg&w=400&q=72&fm=jpg",
        avail_seller: 18,
        isFavorite: false
    },
    {
        id: "27",
        title: "Cat Anti Bocor 4 kg",
        price: 185_000,
        desc: "Cat anti bocor 4 kg, melindungi dinding dari rembesan air dan kelembapan.",
        img: "https://i0.wp.com/media.dekoruma.com/article/2024/08/16132143/Dulux-Weathershield-Powerflexx.jpg?resize=800%2C450&ssl=1",
        avail_seller: 12,
        isFavorite: true
    },
    {
        id: "28",
        title: "Pipa PVC 3 inch",
        price: 120_000,
        desc: "Pipa PVC diameter 3 inch, cocok untuk saluran air limbah.",
        img: "https://media.monotaro.id/mid01/big/Alat%20AC%20%26%20Pipa/Kebutuhan%20Sambungan/Pipa/Pipa%20PVC/QUAD%20Pipa%20PVC/QUAD%20Pipa%20PVC%20Type%20AW%201%201%2F2inch%201pc/3oS036580132-1.jpg",
        avail_seller: 15,
        isFavorite: false
    },
    {
        id: "29",
        title: "Seng Gelombang 0.3 mm",
        price: 55_000,
        desc: "Seng gelombang ketebalan 0.3 mm, digunakan untuk atap sementara atau gudang.",
        img: "https://pramanabaja.com/wp-content/uploads/2016/02/glombang1.png",
        avail_seller: 10,
        isFavorite: true
    },
    {
        id: "30",
        title: "Tangki Air 1.000 Liter",
        price: 1_200_000,
        desc: "Tangki air kapasitas 1.000 liter, bahan plastik berkualitas, tahan lama.",
        img: "https://images.tokopedia.net/img/cache/700/VqbcmM/2022/6/23/a41fd361-d476-4d80-9630-271b99b6736f.jpg",
        avail_seller: 5,
        isFavorite: false
    }
];

export default dummyBiddingItems;
