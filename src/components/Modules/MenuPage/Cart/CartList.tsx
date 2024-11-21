import { useAtom } from 'jotai';
import { Trash2, Plus, Minus } from 'lucide-react';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { biddingCartAtom, cartTotalAtom } from '@/components/Atoms/biddingAtoms';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

const CartList = () => {
    const [cart, setCart] = useAtom(biddingCartAtom);
    const [total] = useAtom(cartTotalAtom);
    

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price);
    };

    const updateQuantity = (index: number, newQuantity: number) => {
        if (newQuantity < 1) return;

        setCart(prevCart => {
            const newCart = [...prevCart];
            newCart[index] = {
                ...newCart[index],
                quantity: newQuantity
            };
            return newCart;
        });
    };

    const removeItem = (index: number) => {
        setCart(prevCart => prevCart.filter((_, i) => i !== index));
    };

    if (cart.length === 0) {
        return (
            <Card className="w-full">
                <CardContent className="pt-6">
                    <div className="text-center text-gray-500">
                        Your cart is empty
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Shopping Cart ({cart.length} items)</CardTitle>
            </CardHeader>

            <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-4">
                        {cart.map((item, index) => (
                            <Card key={index} className="flex p-4 space-x-4">
                                <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0">
                                    <img
                                        src={item.img}
                                        alt={item.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="flex-grow space-y-2">
                                    <div className="flex justify-between">
                                        <h3 className="font-medium">{item.title}</h3>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => removeItem(index)}
                                        >
                                            <Trash2 className="h-4 w-4 text-red-500" />
                                        </Button>
                                    </div>

                                    <p className="text-sm text-gray-600 line-clamp-1">
                                        {item.desc}
                                    </p>

                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center space-x-2">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="h-8 w-8"
                                                onClick={() => updateQuantity(index, item.quantity - 1)}
                                            >
                                                <Minus className="h-4 w-4" />
                                            </Button>
                                            <span className="w-8 text-center">{item.quantity}</span>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="h-8 w-8"
                                                onClick={() => updateQuantity(index, item.quantity + 1)}
                                            >
                                                <Plus className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        <span className="font-semibold text-orange-600">
                                            {formatPrice(item.price * item.quantity)}
                                        </span>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>

            <CardFooter className="flex justify-between items-center border-t pt-4">
                <div>
                    <p className="text-sm text-gray-600">Total Amount</p>
                    <p className="text-2xl font-bold text-orange-600">
                        {formatPrice(total)}
                    </p>
                </div>
                <Button
                    className="bg-orange-500 hover:bg-orange-600"
                    onClick={() => {
                        console.log(cart)
                        console.log(total)
                        console.log('Proceeding to checkout');
                    }}
                >
                    Proceed to Checkout
                </Button>
            </CardFooter>
        </Card>
    );
};

export default CartList;