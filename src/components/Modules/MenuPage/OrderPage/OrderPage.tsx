import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


const base_price = 15000000

const Offer_lister = [
    {
        "no": 1,
        "shop_id": "BLDHB_INV_001",
        "shop_name": "Depo Bangunan",
        "logo_url": "https://play-lh.googleusercontent.com/sbg3YKC4ZINlhWyehnJQ0vEscjZuuE3l2OvKKdMmCPHR7txehW6fyjL7fCO6wuyih5E",
        "offer_price": 25000000,
        "offer_explanation": "We offer a competitive price due to our direct import from manufacturers and lower operational costs.",
        "shipment_price": Math.floor(Math.random() * (2005000 - 1000000 + 1)) + 1000000
    },
    {
        "no": 2,
        "shop_id": "BLDHB_INV_002",
        "shop_name": "Kawanlama",
        "logo_url": "https://media.licdn.com/dms/image/v2/C4E0BAQF68WbjCLRrQA/company-logo_200_200/company-logo_200_200/0/1631327504284?e=2147483647&v=beta&t=0zIlgV5kxxsF9n2Y5R3axvH40wTEjnPYFFZnU-7wl8I",
        "offer_price": 25100000,
        "offer_explanation": "Our prices are more affordable because we provide bulk discounts and prioritize efficiency in our logistics.",
        "shipment_price": Math.floor(Math.random() * (2300000 - 1000000 + 1)) + 1000000
    },
    {
        "no": 3,
        "shop_id": "BLDHB_INV_003",
        "shop_name": "CV 99 Material",
        "logo_url": "https://images.glints.com/unsafe/glints-dashboard.oss-ap-southeast-1.aliyuncs.com/company-logo/a2a3e7cfa01a8ecd3ee84d865a763b6e.png",
        "offer_price": 25200000,
        "offer_explanation": "Our lower prices stem from our long-standing partnerships with trusted suppliers and minimal overhead costs.",
        "shipment_price": Math.floor(Math.random() * (2000000 - 1000000 + 1)) + 1000000
    },
    {
        "no": 4,
        "shop_id": "BLDHB_INV_004",
        "shop_name": "Buildmart",
        "logo_url": "https://media.licdn.com/dms/image/v2/C4E0BAQFMART5NUqjiQ/company-logo_200_200/company-logo_200_200/0/1630596157395?e=2147483647&v=beta&t=xCbIGCLu5zeMATZXNMzBPI27jvbxTJYRqdin3LFtjl4",
        "offer_price": 25300000,
        "offer_explanation": "We can offer cheaper prices due to our high-volume purchasing and efficient distribution network.",
        "shipment_price": Math.floor(Math.random() * (2140000 - 1000000 + 1)) + 1000000
    },
    {
        "no": 5,
        "shop_id": "BLDHB_INV_005",
        "shop_name": "Artha Bangunan",
        "logo_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV_tq0dUPwe8zqpqNuf2aDiUx5Elv8CzTBEA&s",
        "offer_price": 25400000,
        "offer_explanation": "Our prices are low because we operate a lean supply chain and leverage economies of scale.",
        "shipment_price": Math.floor(Math.random() * (2200000 - 1000000 + 1)) + 1000000
    },
    {
        "no": 6,
        "shop_id": "BLDHB_INV_006",
        "shop_name": "TB Sumber Berkah",
        "logo_url": "https://images.tokopedia.net/img/cache/215-square/shops-1/2020/7/12/9091784/9091784_8be1375e-c491-4c03-ae69-2bb5b32a128b.jpg",
        "offer_price": 25500000,
        "offer_explanation": "By optimizing our procurement processes and cutting unnecessary expenses, we pass on the savings to our customers.",
        "shipment_price": Math.floor(Math.random() * (1300000 - 1000000 + 1)) + 1000000
    },
    {
        "no": 7,
        "shop_id": "BLDHB_INV_007",
        "shop_name": "CV Borcelle ",
        "logo_url": "https://marketplace.canva.com/EAGH424qgOo/1/0/1600w/canva-merah-hitam-modern-minimalis-toko-bahan-bangunan-logo-9xm96GBua8I.jpg",
        "offer_price": 25600000,
        "offer_explanation": "Our competitive pricing comes from strategic sourcing and cost-saving initiatives that directly benefit our customers.",
        "shipment_price": Math.floor(Math.random() * (1900000 - 1000000 + 1)) + 1000000
    },
    {
        "no": 8,
        "shop_id": "BLDHB_INV_008",
        "shop_name": "d'Baja Bangunan",
        "logo_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqtYAmkXrSTffEOU8FL08kgRJeOjcjSxNZig&s",
        "offer_price": 25700000,
        "offer_explanation": "We offer the best prices due to our extensive supplier network and efficient inventory management.",
        "shipment_price": Math.floor(Math.random() * (1340000 - 1000000 + 1)) + 1000000
    },
    {
        "no": 9,
        "shop_id": "BLDHB_INV_009",
        "shop_name": "Sentral Bangunan",
        "logo_url": "https://orlansoft.com/wp-content/uploads/2019/08/g4354-1.png",
        "offer_price": 25800000,
        "offer_explanation": "Our pricing strategy focuses on minimizing markup and offering our customers the best value for their purchase.",
        "shipment_price": Math.floor(Math.random() * (1510000 - 1000000 + 1)) + 1000000
    },
    {
        "no": 10,
        "shop_id": "BLDHB_INV_010",
        "shop_name": "Sumber Makmur Bangunan",
        "logo_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjb74WcKQC4XAc0XqJfKRvtadE-FLn98SKEEyTufAB2xsXovR-_EYhM4hR8YUZ5u6UG3g&usqp=CAU",
        "offer_price": 25900000,
        "offer_explanation": "We offer low prices because of our streamlined operations and strong relationships with manufacturers.",
        "shipment_price": Math.floor(Math.random() * (2000000 - 1000000 + 1)) + 1000000
    }
]


const OrderPage = () => {
    const [selectedStore, setSelectedStore] = useState<{
        id: string;
        store_name: string;
        logo_url: string;
        price: number;
        shipment_price: number;
    } | null>(null);
    const [filteredOffers, setFilteredOffers] = useState(Offer_lister);
    const [grandTotal, setGrandTotal] = useState<number>(0);

    const handleChoose = (shop_id: string, shop_name: string, logo_url: string, offer_price: number, shipment_price: number) => {
    if (!selectedStore) {
        setSelectedStore({
            id: shop_id,
            store_name: shop_name,
            logo_url: logo_url,   // Storing the logo URL
            price: offer_price,
            shipment_price: shipment_price,
        });
        setGrandTotal(offer_price + shipment_price);
        setFilteredOffers(filteredOffers.filter(shop => shop.shop_id !== shop_id));
    }
};

    const handleReject = (shop_id: string) => {
        setFilteredOffers(filteredOffers.filter(shop => shop.shop_id !== shop_id));
    };

    const handleAbort = () => {
        if (selectedStore) {
            const newShop = Offer_lister.find(shop => shop.shop_id === selectedStore.id);
            if (newShop) {
                setFilteredOffers([...filteredOffers, newShop]);
            }
        }
        setSelectedStore(null);
        setGrandTotal(0);
    };

    const handleSort = (type: string, direction: string) => {
        const sortedOffers = [...filteredOffers].sort((a, b) => {
            const valueA = type === "shipment" ? a.shipment_price : a.offer_price;
            const valueB = type === "shipment" ? b.shipment_price : b.offer_price;
            return direction === "asc" ? valueA - valueB : valueB - valueA;
        });
        setFilteredOffers(sortedOffers);
    };

    
    const navigate = useNavigate();
      
   const goToPayment = () => {
    if (selectedStore) {
        // Pass the updated selectedStore and grandTotal to the Payment page
        navigate("/menu/payment", {
            state: {
                    selectedStore: selectedStore,
                    grandTotal: grandTotal,
                },
            });
        }
    };
    

    return (
        <div className="p-4">
            {/* Title and Sort Button */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Offering List</h1>
                <div className="flex items-center gap-2"> 
                    <p className="font-medium">Base Price : </p>
                <div className=" w-auto border border-gray-300 rounded flex items-center justify-center">
                    <span className="m-1 font-medium">Rp {base_price.toLocaleString()}</span>
                </div>
                    <span className="font-medium">Sort by:</span>
                    <Select
                        onValueChange={(value) => {
                            const [field, direction] = value.split("-");
                            handleSort(field, direction);
                        }}
                    >
                        <SelectTrigger className="w-48 text-right">
                            <SelectValue placeholder="Select an Option" />
                        </SelectTrigger>
                        <SelectContent align="end">
                            <SelectItem value="shipment-asc">Shipment Price (Lowest)</SelectItem>
                            <SelectItem value="shipment-desc">Shipment Price (Highest)</SelectItem>
                            <SelectItem value="offer-asc">Total Offer Price (Lowest)</SelectItem>
                            <SelectItem value="offer-desc">Total Offer Price (Highest)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* ScrollArea for Table */}
            <ScrollArea className="h-[68vh] rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Store ID</TableHead>
                            <TableHead>Store</TableHead>
                            <TableHead>Shipment Price</TableHead>
                            <TableHead>Total Offer Price</TableHead>
                            <TableHead>Offer Explanations</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredOffers.map((lister) => (
                            <TableRow key={lister.shop_id}>
                                <TableCell className="font-medium">{lister.shop_id}</TableCell>
                                <TableCell className="font-medium">
                                    <div className="flex flex-col items-center">
                                        <img
                                            src={lister.logo_url}
                                            alt={`${lister.shop_name} logo`}
                                            className="w-16 h-16 object-cover rounded-full mb-2"
                                        />
                                        <p>{lister.shop_name}</p>
                                    </div>
                                </TableCell>
                                <TableCell className="font-medium">Rp {lister.shipment_price.toLocaleString()}</TableCell>
                                <TableCell className="font-medium">Rp {lister.offer_price.toLocaleString()}</TableCell>
                                <TableCell className="font-medium">
                                    <p className="text-justify max-w-[300px]">{lister.offer_explanation}</p>
                                </TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        <Button onClick={() => handleChoose(lister.shop_id, lister.shop_name, lister.logo_url, lister.offer_price, lister.shipment_price)}>Choose</Button>
                                        <AlertDialog>
                                            <AlertDialogTrigger><Button className="bg-[#cc0000] hover:bg-[#a30000]">Reject</Button></AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        Are you absolutely sure you want to reject this offering? This action cannot be undone.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction  className="bg-[#cc0000] hover:bg-[#a30000]" onClick={() => handleReject(lister.shop_id)}>Continue</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </ScrollArea>

            {/* Floating Box */}
            <div className="bg-[#fafafa] p-4 shadow-xl border rounded-[8px] mt-5 h-20 w-full">
                <div className="flex items-center justify-between">
                    <p className="font-semibold">
                        Selected: {selectedStore ? `| ${selectedStore.id} | ${selectedStore.store_name}` : "None"}
                    </p>
                    <div className="flex gap-5 items-center">
                        <p className="font-semibold text-lg">
                            Grand Total: {selectedStore ? `Rp ${grandTotal.toLocaleString()}` : "0"}
                        </p>

                        <div className="flex gap-2">
                            <AlertDialog>
                                <AlertDialogTrigger><Button>Abort</Button></AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Are you absolutely sure you want to abort your purchase?
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={handleAbort}>Continue</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>

                            <AlertDialog>
                                <AlertDialogTrigger><Button className="bg-orange-500 hover:bg-orange-300">Checkout</Button></AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Are you absolutely sure you want to Checkout?
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={goToPayment}>Continue</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderPage;