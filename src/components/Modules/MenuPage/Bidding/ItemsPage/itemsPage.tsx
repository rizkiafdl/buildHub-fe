import { useParams, useNavigate } from 'react-router-dom';
import dummyBiddingItems from '@/constant/listBiddingItem';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const ItemsPage = () => {
    const { itemId } = useParams();
    const navigate = useNavigate();

    const item = dummyBiddingItems.find(
        item => item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === itemId
    );

    if (!item) {
        return <div className="text-center py-8">Item not found</div>;
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price);
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <button
                onClick={() => navigate(-1)}
                className="mb-6 px-4 py-2 text-gray-600 hover:text-gray-800"
            >
                ← Back
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="rounded-lg overflow-hidden">
                    <img
                        src={item.img}
                        alt={item.title}
                        className="w-full h-96 object-cover"
                    />
                </div>

                <Card className="p-6">
                    <CardHeader className="p-0 mb-4">
                        <CardTitle className="text-2xl font-bold">{item.title}</CardTitle>
                    </CardHeader>

                    <CardContent className="p-0 space-y-4">
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
                    </CardContent>

                    <CardFooter className="p-0 mt-6">
                        <button className="w-full py-3 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors">
                            Place Bid Now
                        </button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default ItemsPage;