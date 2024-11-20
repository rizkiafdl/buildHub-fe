import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { BiddingItems } from "@/types/bidding";
import { biddingCartAtom, BiddingCartItem } from '@/components/Atoms/biddingAtoms';
import { useToast } from '@/hooks/use-toast';

interface BiddingItemDialogProps {
    item: BiddingItems | null;
    isOpen: boolean;
}

const BiddingItemDialog = ({ item, isOpen }: BiddingItemDialogProps) => {
    const navigate = useNavigate();
    const [cart, setCart] = useAtom(biddingCartAtom);
    const { toast } = useToast();

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price);
    };

    const handleClose = () => {
        navigate('/menu/bidding');
    };

    const handleAddToCart = () => {
        if (!item) return;

        setCart(prevCart => {
            // Check if item already exists in cart
            const existingItemIndex = prevCart.findIndex(
                cartItem => cartItem.title === item.title
            );

            if (existingItemIndex >= 0) {
                // Item exists, update quantity
                const newCart = [...prevCart];
                newCart[existingItemIndex] = {
                    ...newCart[existingItemIndex],
                    quantity: newCart[existingItemIndex].quantity + 1
                };
                return newCart;
            } else {
                // Add new item to cart
                const newItem: BiddingCartItem = {
                    ...item,
                    quantity: 1
                };
                return [...prevCart, newItem];
            }
        });

        toast({
            title: "Added to Cart",
            description: `${item.title} has been added to your cart.`,
            duration: 2000,
            variant: "default",
        });
        console.log(cart)
        handleClose();
    };

    if (!item) return null;

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>{item.title}</DialogTitle>
                </DialogHeader>

                <div className="mt-4">
                    <div className="rounded-lg overflow-hidden mb-4">
                        <img
                            src={item.img}
                            alt={item.title}
                            className="w-full h-64 object-cover"
                        />
                    </div>

                    <div className="space-y-4">
                        <p className="text-gray-600">{item.desc}</p>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Price:</span>
                                <span className="text-xl font-bold text-orange-600">
                                    {formatPrice(item.price)}
                                </span>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Available Sellers:</span>
                                <span className="font-semibold">{item.avail_seller}</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6">
                        <button
                            className="w-full py-3 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
                            onClick={handleAddToCart}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default BiddingItemDialog;