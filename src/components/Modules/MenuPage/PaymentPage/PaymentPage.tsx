import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LocationOutline, HomeOutline, DocumentTextOutline,StorefrontOutline} from 'react-ionicons'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/ui/icons"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom";

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


import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  
  
import { Textarea } from "@/components/ui/textarea";

import { orderTrackingAtom } from '@/Atoms/orderTrackingAtom';
import { generateOrderId, createInitialOrderTracking, updateOrderStatus } from '@/hooks/orderTracking';
import { useAtom } from "jotai";
import { grandTotalAtom, selectedStoreAtom } from "@/Atoms/OfferAtoms";
import { cartTotalAtom } from "@/Atoms/biddingAtoms";

const purchaser = [
    {
        'Purchase_ID' : "INV_BLHD_0103XTZ",
        'Name' : 'Buildhub Tester',
        'Addres' : 'Kresna Homesweet, Jalan Kresna No.43, Kelurahan Arjuna, Cicendo (Taman pandawa), KOTA BANDUNG - CICENDO, JAWA BARAT, ID 40172',
        'LOC' : "-6.909001814844111, 107.59246653795574",
        'Num_phone' : "+6281385589985"
    }
]

const PaymentPage = () => {

    const calculateArrivalDate = (option: string): Date => {
        const today = new Date();
        const additionalDays = option === "express" ? 2 : 5;
        const arrivalDate = new Date(today);
        arrivalDate.setDate(today.getDate() + additionalDays);
        return arrivalDate;
    };

    const [shipmentOption, setShipmentOption] = useState<string>("normal");
    const [selectedStore] = useAtom(selectedStoreAtom);
    const [shipmentPrice, setShipmentPrice] = useState<number>(selectedStore?.shipment_price || 0);
    const [guaranteedArrivalDate, setGuaranteedArrivalDate] = useState<Date>(() => calculateArrivalDate("normal"));

    const [paymentMethod, setPaymentMethod] = useState<string>("card");
    const [name, setName] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [cardNumber, setCardNumber] = useState<string>("");
    const [month, setMonth] = useState<string>("");
    const [year, setYear] = useState<string>("");
    const [cvc, setCvc] = useState<string>("");
    const [errors, setErrors] = useState<Record<string, string>>({});

    const [, setOrderTracking] = useAtom(orderTrackingAtom);

    const [grandTotal] = useAtom(grandTotalAtom);
    const [cartTotal] = useAtom(cartTotalAtom);



    const [priceBreakdown, setPriceBreakdown] = useState({
        basePrice: 0,
        shipmentPrice: 0,
        tax: 0,
        applicationFee: 10000,
        handlingFee: 5000,
        totalPrice: 0
    });


    useEffect(() => {
        console.log("Shipment option changed:", shipmentOption);
        console.log("Shipment option changed:", shipmentOption);
    }, [shipmentOption,paymentMethod]);

    useEffect(() => {
        const baseTotal = selectedStore ? selectedStore.price : 0;
        const currentShipmentPrice = shipmentOption === "express"
            ? (selectedStore?.shipment_price || 0) * 1.3
            : (selectedStore?.shipment_price || 0);
        const tax = currentShipmentPrice * 0.11;

        const total = baseTotal + currentShipmentPrice + tax +
            priceBreakdown.applicationFee + priceBreakdown.handlingFee;

        setPriceBreakdown({
            basePrice: baseTotal,
            shipmentPrice: currentShipmentPrice,
            tax,
            applicationFee: 10000,
            handlingFee: 5000,
            totalPrice: total
        });
    }, [selectedStore, shipmentOption, cartTotal]);

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!name.trim()) newErrors.name = "Name is required.";
        if (!city.trim()) newErrors.city = "City is required.";
        if (!cardNumber.trim()) newErrors.cardNumber = "Card number is required.";
        if (!month) newErrors.month = "Month is required.";
        if (!year) newErrors.year = "Year is required.";
        if (!cvc.trim()) newErrors.cvc = "CVC is required.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const navigate = useNavigate();

    const handleContinue = () => {
        if (validate()) {
            const orderId = generateOrderId();
            const initialTracking = createInitialOrderTracking(orderId);
            setOrderTracking(initialTracking);

            setTimeout(() => {
                setOrderTracking(prev =>
                    updateOrderStatus(
                        prev!,
                        'PAYMENT_CONFIRMED',
                        `Payment of Rp ${grandTotal.toLocaleString()} confirmed via ${paymentMethod}`
                    )
                );

                navigate("/menu/dashboard", {
                    state: {
                        selectedStore,
                        orderId,
                        grandTotal: priceBreakdown.totalPrice,
                        shippingDetails: {
                            option: shipmentOption,
                            price: priceBreakdown.shipmentPrice,
                            estimatedArrival: guaranteedArrivalDate
                        },
                        purchaserDetails: {
                            name,
                            city
                        },
                        priceBreakdown
                    }
                });
            }, 2000);
        }
    };


    
    const handleShipmentChange = (option: string) => {
        setShipmentOption(option);


        const newShipmentPrice = option === "express"
            ? (selectedStore?.shipment_price || 0) * 1.3
            : selectedStore?.shipment_price || 0;

        setShipmentPrice(newShipmentPrice);
        setGuaranteedArrivalDate(calculateArrivalDate(option));
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-medium mb-6">Build Hub | Checkout Details</h1>

            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Cart Items Section */}
                <div className="md:col-span-2 space-y-4">
                    

                    {purchaser.map((lister) =>(
                        <Card className="p-6">
                        <div className="p-2">
                             <div className="flex gap-2 justify-start">
                                 <LocationOutline height='40px' width='40px'></LocationOutline>
                                 <p className="text-[20px] font-semibold justify-center mt-1">Shipping address</p>
                             </div>
 
                             <div className="flex space-x-2 p-4 justify-left">
                                 <div className="font-medium w-30">
                                     <div>{lister.Name} ({lister.Num_phone})</div>
                                 </div>
                                 <div className="font-medium">{lister.Addres}</div>
                                 <div className="justify-center">
                                     <HomeOutline
                                         height="50px"
                                         width=" 50px">
 
                                     </HomeOutline>
                                 </div>
                             </div>
                        </div>
                     </Card>



                    ))}
                    
                    {purchaser.map((lister) =>(

                        <Card className='p-6'>
                        <div className="p-2">
                            <div className="flex gap-2 justify-start">
                                <DocumentTextOutline height='40px' width='40px'></DocumentTextOutline>
                                <p className="text-[20px] font-semibold justify-center mt-1">Purchased Product</p>
                            </div>

                            <div className="flex justify-start space-x-2 mt-6">
                                <div className="flex">
                                    <StorefrontOutline></StorefrontOutline>
                                </div>
                                <div className="flex">
                                    <div>{selectedStore?.store_name}</div>
                                    <div>&nbsp; | &nbsp;</div>
                                    <div>{selectedStore?.id}</div>
                                    
                                </div>
                                
                            </div>

                            <div className="mt-5">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                    <TableHead>Store</TableHead>
                                    <TableHead>Store Name</TableHead>
                                    <TableHead>Purchase ID</TableHead>
                                    <TableHead>Total Offer Price</TableHead>
                                    </TableRow>
                                </TableHeader>
                                
                                <TableBody>
                                        <TableRow>
                                        <TableCell>
                                            <div className="flex flex-col items-center">
                                            <img
                                                src={selectedStore?.logo_url}
                                                alt={`logo`}
                                                className="w-[120px] h-[120px] object-cover rounded-full mb-2"
                                            />
                                            <p className="font-medium mt-1">{selectedStore?.store_name}</p>
                                            </div>
                                        </TableCell>
                                        
                                        <TableCell>{selectedStore?.store_name}</TableCell>
                                        <TableCell>{lister.Purchase_ID}</TableCell>
                                        
                                                <TableCell className="font-bold">Rp {grandTotal ? grandTotal.toLocaleString() : 0}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>

                                </div>

                        </div>

                        <hr></hr>

                        <div className="bg-gray-00 w-full bg-gray-100 font-semimedium mt-2 border-b">
                            <div className="flex space-x-4">
                                <div className="border-r p-4">
                                    <div className="flex  w-auto">
                                        <div className="mr-8">Message:</div>
                                        <Textarea placeholder="(optional) leave a message for the seller" className="w-[15vw]"></Textarea>
                                    </div>

                                </div>
                                <div className="p-2">
                                    <div className="flex">
                                        <div>
                                            Shipment Options: 
                                        </div>

                                        <Select onValueChange={handleShipmentChange} defaultValue="normal">
                                            <SelectTrigger className="w-[220px] h-[30px] ml-3">
                                                <SelectValue placeholder="Select Shipment Option" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="normal">Normal</SelectItem>
                                                    {/* <SelectItem value="express">Express</SelectItem> */}
                                            </SelectContent>
                                        </Select>


                                    </div>

                                    <div className="flex mt-2">
                                        <p className="text-m">Shipment Price:</p>
                                        <p className="text-lg font-medium ml-2">
                                            Rp {shipmentPrice.toLocaleString()}
                                        </p>
                                    </div>

                                    <div className="flex mt-3 border-t border-gray-300 ">
                                        <p className="text-[12px] text-orange-500 mt-2 ">Guaranteed Arrival :</p>
                                        <p className="text-[12px] font-sm ml-2 mt-2 mb-2">
                                            {guaranteedArrivalDate.toLocaleDateString()}
                                        </p>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-00 w-full bg-gray-100 font-semimedium">
                            <div className="flex flex-col">
                                {/* Shipment Cost */}
                                <div className="flex justify-between px-4">
                                    <p className="text-m font-medium">Shipment Cost</p>
                                        <p className="text-m font-medium">Rp {(shipmentPrice - (shipmentPrice * 0.11)).toLocaleString()}</p>
                                </div>

                                {/* Tax (11%) */}
                                <div className="flex justify-between px-4">
                                    <p className="text-m font-medium">Tax (11%)</p>
                                    <p className="text-m font-medium">Rp {(shipmentPrice * 0.11).toLocaleString()}</p>
                                </div>

                                {/* Application Fee */}
                                <div className="flex justify-between px-4">
                                    <p className="text-m font-medium">Application Fee</p>
                                    <p className="text-m font-medium">Rp 10,000</p>
                                </div>

                                {/* Handling Fee */}
                                <div className="flex justify-between px-4">
                                    <p className="text-m font-medium">Handling Fee</p>
                                    <p className="text-m font-medium">Rp 5,000</p>
                                </div>

                                {/* Grand Total */}
                                <hr className="my-2 border-gray-300" />
                                <div className="flex justify-between px-4">
                                    <p className="text-lg font-bold">Grand Total</p>
                                    <p className="text-lg font-bold mb-4">
                                            Rp {grandTotal.toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </div>

                        </Card>

                    ))}

                    
                    
                </div>

                {/* Payment Summary Section */}
                <div className="md:col-span-1">
                <Card>
                    <CardHeader>
                        <CardTitle>Payment Method</CardTitle>
                        <CardDescription>
                            Add a new payment method to your account.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-6">
                        {/* Payment Method */}
                        <RadioGroup
                            defaultValue="card"
                            className="grid grid-cols-3 gap-4"
                            onValueChange={(value) => setPaymentMethod(value)}
                        >
                            <div>
                                <RadioGroupItem value="card" id="card" className="peer sr-only" aria-label="Card" />
                                <Label
                                    htmlFor="card"
                                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        className="mb-3 h-6 w-6"
                                    >
                                        <rect width="20" height="14" x="2" y="5" rx="2" />
                                        <path d="M2 10h20" />
                                    </svg>
                                    Card
                                </Label>
                            </div>
                            <div>
                                <RadioGroupItem value="paypal" id="paypal" className="peer sr-only" aria-label="Paypal" />
                                <Label
                                    htmlFor="paypal"
                                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                >
                                    <Icons.paypal className="mb-3 h-6 w-6" />
                                    Paypal
                                </Label>
                            </div>
                            <div>
                                <RadioGroupItem value="apple" id="apple" className="peer sr-only" aria-label="Apple" />
                                <Label
                                    htmlFor="apple"
                                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                >
                                    <Icons.apple className="mb-3 h-6 w-6" />
                                    Apple
                                </Label>
                            </div>
                        </RadioGroup>

                        {/* Input Fields */}
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                placeholder="First Last"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="city">City</Label>
                            <Input
                                id="city"
                                placeholder="City"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                            {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="number">Card number</Label>
                            <Input
                                id="number"
                                placeholder="Card number"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                            />
                            {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber}</p>}
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="month">Expires</Label>
                                <Select onValueChange={(value) => setMonth(value)}>
                                    <SelectTrigger id="month" aria-label="Month">
                                        <SelectValue placeholder="Month" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Array.from({ length: 12 }, (_, i) => (
                                            <SelectItem key={i} value={`${i + 1}`}>
                                                {new Date(0, i).toLocaleString("default", { month: "long" })}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.month && <p className="text-red-500 text-sm">{errors.month}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="year">Year</Label>
                                <Select onValueChange={(value) => setYear(value)}>
                                    <SelectTrigger id="year" aria-label="Year">
                                        <SelectValue placeholder="Year" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Array.from({ length: 10 }, (_, i) => (
                                            <SelectItem key={i} value={`${new Date().getFullYear() + i}`}>
                                                {new Date().getFullYear() + i}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.year && <p className="text-red-500 text-sm">{errors.year}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="cvc">CVC</Label>
                                <Input
                                    id="cvc"
                                    placeholder="CVC"
                                    value={cvc}
                                    onChange={(e) => setCvc(e.target.value)}
                                />
                                {errors.cvc && <p className="text-red-500 text-sm">{errors.cvc}</p>}
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        {/* <Button className="w-full" onClick={handleContinue}>
                            Continue
                        </Button> */}

                        <AlertDialog>
                            <AlertDialogTrigger className="w-full"><Button className="w-full">Continue</Button></AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Are you sure you want to proceed to the payment? This action cannot be undone.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction  className="" onClick={handleContinue}>Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </CardFooter>
                </Card>
                </div>
            </div>
        </div>
    )
}

export default PaymentPage