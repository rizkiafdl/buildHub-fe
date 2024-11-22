// components/OrderDashboard.tsx
import { useAtom } from 'jotai';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, Package, Truck, XCircle } from "lucide-react";
import {
    selectedStoreAtom,
    grandTotalAtom,
} from '@/Atoms/OfferAtoms';
import { orderTrackingAtom } from '@/Atoms/orderTrackingAtom';
import { OrderStatus } from '@/types/orderTracking';

const statusConfig: Record<OrderStatus, { color: string; icon: JSX.Element }> = {
    PAYMENT_PENDING: {
        color: "bg-yellow-500",
        icon: <Clock className="h-5 w-5" />
    },
    PAYMENT_CONFIRMED: {
        color: "bg-blue-500",
        icon: <CheckCircle2 className="h-5 w-5" />
    },
    PROCESSING: {
        color: "bg-purple-500",
        icon: <Package className="h-5 w-5" />
    },
    SHIPPED: {
        color: "bg-indigo-500",
        icon: <Truck className="h-5 w-5" />
    },
    DELIVERED: {
        color: "bg-green-500",
        icon: <CheckCircle2 className="h-5 w-5" />
    },
    CANCELLED: {
        color: "bg-red-500",
        icon: <XCircle className="h-5 w-5" />
    }
};

const PlaceholderDashboard = () => (
    <div className="p-6 space-y-6">
        <div className="text-center space-y-4">
            <div className="flex flex-col items-center justify-center">
                <Package className="h-20 w-20 text-gray-400 mb-4" />
                <h2 className="text-2xl font-semibold text-gray-900">No Order Data</h2>
                <p className="text-gray-500 max-w-sm mt-2">
                    Start by selecting items and making a purchase to view your order details here.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {/* Placeholder Cards */}
                {[1, 2, 3].map((index) => (
                    <Card key={index} className="bg-gray-50">
                        <CardHeader>
                            <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {[1, 2, 3].map((line) => (
                                    <div key={line} className="flex justify-between items-center">
                                        <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                                        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    </div>
);


const OrderDashboard = () => {
    const [selectedStore] = useAtom(selectedStoreAtom);
    const [grandTotal] = useAtom(grandTotalAtom);
    const [orderTracking] = useAtom(orderTrackingAtom);
    const [, setCurrentTime] = useState(new Date());

    if (!selectedStore || !orderTracking || !grandTotal) {
        return <PlaceholderDashboard />;
    }
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    if (!selectedStore) return null;

    return (
        <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Order Summary Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Order ID:</span>
                                <span className="text-sm">{orderTracking.orderId}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Store:</span>
                                <span className="text-sm">{selectedStore.store_name}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Total Amount:</span>
                                <span className="text-sm font-bold">
                                    Rp {grandTotal.toLocaleString()}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Status:</span>
                                <Badge className={`${statusConfig[orderTracking.status].color}`}>
                                    <span className="flex items-center gap-2">
                                        {statusConfig[orderTracking.status].icon}
                                        {orderTracking.status}
                                    </span>
                                </Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Order Progress Card */}
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Order Progress</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="relative">
                            {/* Progress Line */}
                            <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-200" />

                            {/* Timeline Items */}
                            <div className="space-y-6">
                                {orderTracking.timeline.map((event, index) => (
                                    <div key={index} className="relative flex items-center space-x-4">
                                        <div className={`
                                            absolute left-4 w-3 h-3 rounded-full
                                            ${index <= orderTracking.currentStep ? statusConfig[event.status].color : 'bg-gray-300'}
                                        `} />
                                        <div className="flex-1 ml-8">
                                            <div className="flex items-center justify-between">
                                                <p className="font-medium">{event.status}</p>
                                                <time className="text-sm text-gray-500">
                                                    {new Date(event.date).toLocaleString()}
                                                </time>
                                            </div>
                                            <p className="text-sm text-gray-600 mt-1">
                                                {event.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Store Details Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Store Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col items-center space-y-4">
                            <img
                                src={selectedStore.logo_url}
                                alt={`${selectedStore.store_name} logo`}
                                className="w-24 h-24 rounded-full object-cover"
                            />
                            <h3 className="text-lg font-semibold">
                                {selectedStore.store_name}
                            </h3>
                            <div className="w-full space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-sm font-medium">Item Price:</span>
                                    <span className="text-sm">
                                        Rp {(grandTotal - (selectedStore.shipment_price)).toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm font-medium">Shipping:</span>
                                    <span className="text-sm">
                                        Rp {selectedStore.shipment_price.toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default OrderDashboard;