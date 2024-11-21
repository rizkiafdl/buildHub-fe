import { biddingCartAtom, cartTotalAtom, BiddingCartItem } from '@/components/Atoms/biddingAtoms'
import { useAtom } from 'jotai'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useEffect } from 'react'

const PaymentPage = () => {
    const [cart] = useAtom(biddingCartAtom)
    const [total] = useAtom(cartTotalAtom)

    useEffect(() => {
        // Log cart data
        console.log('Cart Data:', {
            cart
        })

        // Log total and calculations
        console.log('Financial Summary:', {
            subtotal: total,
            tax: total * 0.11,
            finalTotal: total * 1.11,
            breakdown: {
                itemsTotal: cart.reduce((acc, item) => acc + (item.price * item.quantity), 0)
            }
        })
    }, [cart, total])

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Payment Details</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Cart Items Section */}
                <div className="md:col-span-2 space-y-4">
                    <Card className="p-6">
                        <h2 className="text-xl font-semibold mb-4">Cart Items</h2>

                        {cart.map((item: BiddingCartItem, index) => (
                            <div
                                key={index}
                                className="mb-4"
                                onClick={() => console.log('Item Details:', item)}
                            >
                                <div className="flex items-center gap-4">
                                    <img
                                        src={item.img}
                                        alt={item.title}
                                        className="w-16 h-16 rounded-lg object-cover"
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-medium text-lg">{item.title}</h3>
                                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                                        <p className="text-sm text-muted-foreground">
                                            Available Sellers: {item.avail_seller}
                                            {item.selectedSeller && ` (Selected: ${item.selectedSeller})`}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-2 flex justify-between items-center text-sm">
                                    <div>
                                        <p>Price per item: {new Intl.NumberFormat('id-ID', {
                                            style: 'currency',
                                            currency: 'IDR'
                                        }).format(item.price)}</p>
                                        <p>Quantity: {item.quantity}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold">
                                            Subtotal: {new Intl.NumberFormat('id-ID', {
                                                style: 'currency',
                                                currency: 'IDR'
                                            }).format(item.price * item.quantity)}
                                        </p>
                                    </div>
                                </div>

                                <Separator className="my-4" />
                            </div>
                        ))}
                    </Card>
                </div>

                {/* Payment Summary Section */}
                <div className="md:col-span-1">
                    <Card className="p-6 sticky top-6">
                        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>{new Intl.NumberFormat('id-ID', {
                                    style: 'currency',
                                    currency: 'IDR'
                                }).format(total)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Tax (11%)</span>
                                <span>{new Intl.NumberFormat('id-ID', {
                                    style: 'currency',
                                    currency: 'IDR'
                                }).format(total * 0.11)}</span>
                            </div>

                            <Separator className="my-4" />

                            <div className="flex justify-between font-bold">
                                <span>Total</span>
                                <span>{new Intl.NumberFormat('id-ID', {
                                    style: 'currency',
                                    currency: 'IDR'
                                }).format(total * 1.11)}</span>
                            </div>
                        </div>

                        <div className="mt-6 space-y-2">
                            <Button
                                className="w-full"
                                size="lg"
                                onClick={() => console.log('Payment Summary:', {
                                    subtotal: total,
                                    tax: total * 0.11,
                                    finalTotal: total * 1.11,
                                    items: cart.map(item => ({
                                        title: item.title,
                                        quantity: item.quantity,
                                        price: item.price,
                                        total: item.price * item.quantity
                                    }))
                                })}
                            >
                                Proceed to Payment
                            </Button>
                            <Button className="w-full" variant="outline" size="lg">
                                Back to Cart
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default PaymentPage