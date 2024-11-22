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
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
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
} from "@/components/ui/alert-dialog";

import { useAtom } from "jotai";
import {
    offerListAtom,
    filteredOffersAtom,
    selectedStoreAtom,
    grandTotalAtom,
    offerActions,
} from "@/Atoms/OfferAtoms";
import { biddingCartAtom, cartTotalAtom } from "@/Atoms/biddingAtoms";
import { useEffect, useState } from "react";
import { TableFooter } from "@/components/ui/table";
const OrderPage = () => {
    const [offerList] = useAtom(offerListAtom);
    const [filteredOffers, setFilteredOffers] = useAtom(filteredOffersAtom);
    const [selectedStore, setSelectedStore] = useAtom(selectedStoreAtom);
    const [grandTotal, setGrandTotal] = useAtom(grandTotalAtom);
    const [cart] = useAtom(biddingCartAtom);
    const [cartTotal] = useAtom(cartTotalAtom);

    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const handleChoose = (shop_id: string) => {
        if (!selectedStore) {
            const store = filteredOffers.find((offer) => offer.shop_id === shop_id);
            if (store) {
                offerActions.handleChoose(
                    store,
                    setSelectedStore,
                    setFilteredOffers,
                    filteredOffers
                );
            }
        }
    };

    const handleReject = (shop_id: string) => {
        offerActions.handleReject(shop_id, setFilteredOffers, filteredOffers);
    };

    const handleAbort = () => {
        offerActions.handleAbort(
            selectedStore,
            offerList,
            setFilteredOffers,
            filteredOffers,
            setSelectedStore,
            setGrandTotal
        );
    };

    const handleSort = (type: "shipment" | "offer", direction: "asc" | "desc") => {
        offerActions.handleSort(type, direction, setFilteredOffers, filteredOffers);
    };

    const goToPayment = () => {
        if (selectedStore) {
            navigate("/menu/payment", {
                state: {
                    selectedStore,
                    grandTotal,
                },
            });
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-[80vh]">
                <div className="flex flex-col items-center space-y-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
                    <p className="text-gray-600">Loading order details...</p>
                </div>
            </div>
        );
    }

    if (!cart || cart.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-[80vh] p-4">
                <div className="text-center space-y-4">
                    <svg
                        className="mx-auto h-24 w-24 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                    </svg>
                    <h2 className="text-2xl font-semibold text-gray-900">
                        No Items in Cart
                    </h2>
                    <p className="text-gray-500">
                        Please add items to your cart before proceeding with the order.
                    </p>
                    <Button
                        className="mt-4"
                        onClick={() => navigate("/menu/home")}
                    >
                        Go to Bidding
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4">
            <div className="mb-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold">Offering List</h1>
                    <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
                        <div className="space-y-2">
                            <p className="text-sm text-blue-700 flex justify-between">
                                <span>Cart Items:</span>
                                <span className="font-medium">{cart.length}</span>
                            </p>
                            <p className="text-sm text-blue-700 flex justify-between">
                                <span>Cart Total:</span>
                                <span className="font-medium">Rp {(cartTotal || 0).toLocaleString()}</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-end gap-2 mt-4">
                    <span className="font-medium">Sort by:</span>
                    <Select
                        onValueChange={(value) => {
                            const [field, direction] = value.split("-") as [string, string];
                            handleSort(field as "shipment" | "offer", direction as "asc" | "desc");
                        }}
                    >
                        <SelectTrigger className="w-48">
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
                        {filteredOffers?.map((lister) => (
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
                                <TableCell className="font-medium">
                                    Rp {lister.shipment_price.toLocaleString()}
                                </TableCell>
                                <TableCell className="font-medium">
                                    Rp {(cartTotal + lister.shipment_price).toLocaleString()}
                                </TableCell>
                                <TableCell className="font-medium">
                                    <p className="text-justify max-w-[300px]">
                                        {lister.offer_explanation}
                                    </p>
                                </TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        <Button
                                            onClick={() =>
                                                handleChoose(
                                                    lister.shop_id
                                                )
                                            }
                                        >
                                            Choose
                                        </Button>
                                        <AlertDialog>
                                            <AlertDialogTrigger>
                                                <Button className="bg-[#cc0000] hover:bg-[#a30000]">
                                                    Reject
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Confirm Rejection</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        Are you sure you want to reject this offer?
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction
                                                        onClick={() => handleReject(lister.shop_id)}
                                                    >
                                                        Reject
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter className="fixed flex bottom-0  w-full bg-white shadow-lg z-5">
                        <div className="p-4 flex justify-self-center gap-10 items-center">
                            <div>
                                <span>Selected Store: </span>
                                <span className="font-medium">
                                    {selectedStore
                                        ? `| ${selectedStore.id} | ${selectedStore.store_name}`
                                        : "None"}
                                </span>
                                <span>

                                    Rp {(grandTotal || 0).toLocaleString()}
                                </span>
                            </div>
                            <div className="flex gap-4">
                                <Button
                                    className="bg-[#cc0000] hover:bg-[#a30000]"
                                    onClick={handleAbort}
                                    disabled={!selectedStore}
                                >
                                    Abort
                                </Button>
                                <Button
                                    className="bg-green-600 hover:bg-green-500"
                                    onClick={goToPayment}
                                    disabled={!selectedStore}
                                >
                                    Proceed to Payment
                                </Button>
                            </div>
                        </div>
                    </TableFooter>
                </Table>
            </ScrollArea>

        </div>
    );
};

export default OrderPage;
