import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type BiddingItems = {
  title: string;
  price: number;
  desc: string;
  img: string;
  avail_seller: number;
  isFavorite: boolean;
};

type ListCardProps = {
  data: BiddingItems;
  className?: string;
};

const ListCard = ({ data, className }: ListCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <Card className={`
      group
      relative
      w-full 
      h-96
      overflow-hidden
      transition-all
      duration-300
      hover:shadow-xl
      rounded-lg
      bg-white
      flex
      flex-col
      ${className || ''}
    `}>
      <div className="relative w-full h-40 overflow-hidden shrink-0">
        <img
          src={data.img}
          alt={data.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      <div className="flex flex-col flex-grow p-3">
        <CardHeader className="p-0 mb-2">
          <CardTitle className="text-sm font-semibold h-10 line-clamp-2">
            {data.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0 space-y-2">
          <p className="text-xs text-gray-600 h-10 line-clamp-2">
            {data.desc}
          </p>
          <div className="space-y-1">
            <div className="text-xs text-gray-600">
              Available Sellers: {data.avail_seller}
            </div>
            <div className="text-base font-semibold text-orange-600">
              {formatPrice(data.price)}
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-0 mt-auto">
          <div className="flex justify-between items-center w-full">
            <button className="px-3 py-1.5 bg-orange-500 text-white text-xs rounded-md hover:bg-orange-600 transition-colors">
              Details
            </button>
            <button className={`p-1.5 rounded-full transition-colors ${data.isFavorite ? 'text-red-500' : 'text-gray-400'}`}>
              ❤
            </button>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
};

export default ListCard;