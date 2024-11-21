import { useParams } from 'react-router-dom';
import BiddingList from './BiddingList';
import BiddingItemDialog from './BiddingItemDialog';
import dummyBiddingItems from '@/constant/listBiddingItem';
import { Toaster } from "@/components/ui/toaster"
import ImageCarousel from './ImageCarousel';
// Define the route params interface
interface BiddingParams {
    itemId: string;
    [key: string]: string | undefined;
}

const BiddingPage = () => {
    // Specify the params type
    const { itemId } = useParams<BiddingParams>();

    // Add type guard for itemId
    const selectedItem = itemId
        ? dummyBiddingItems.find(
            item => item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === itemId
        ) ?? null
        : null;

    return (
        <div>
            <ImageCarousel />
            <BiddingList />
            <BiddingItemDialog
                item={selectedItem}
                isOpen={!!itemId}
            />
            <Toaster />
        </div>
    );
};

export default BiddingPage;