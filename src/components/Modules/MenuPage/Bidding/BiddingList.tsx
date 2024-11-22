import React, { useState, useMemo } from 'react';
import ListCard from "@/components/Modules/MenuPage/Bidding/BiddingCard"
import dummyBiddingItems from '@/constant/listBiddingItem';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

const BiddingList: React.FC = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [sortBy, setSortBy] = useState('-published_at');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const paginatedAndSortedItems = useMemo(() => {
    // First filter items based on search term
    const filteredItems = dummyBiddingItems.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Then sort the filtered items
    const sortedItems = [...filteredItems].sort((a, b) => {
      if (sortBy === '-published_at') {
        return b.price - a.price;
      }
      return a.price - b.price;
    });

    const startIndex = (pageNumber - 1) * pageSize;
    return sortedItems.slice(startIndex, startIndex + pageSize);
  }, [pageNumber, pageSize, sortBy, searchTerm]);

  const totalPages = Math.ceil(
    dummyBiddingItems.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    ).length / pageSize
  );

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.target.value));
    setPageNumber(1);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  const handlePrevPage = () => {
    setPageNumber(prev => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setPageNumber(prev => Math.min(totalPages, prev + 1));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPageNumber(1); // Reset to first page when searching
  };

  const createSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleCardClick = (item: typeof dummyBiddingItems[0]) => {
    const slug = createSlug(item.title);
    navigate(`/menu/home/${slug}`);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <label className="text-sm flex items-center">
            Show per page:
            <select
              className="ml-2 border rounded-md px-3 py-1.5 bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              value={pageSize}
              onChange={handlePageSizeChange}>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </label>

          <label className="text-sm flex items-center">
            Sort by:
            <select
              className="ml-2 border rounded-md px-3 py-1.5 bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              value={sortBy}
              onChange={handleSortChange}>
              <option value="-published_at">Highest Price</option>
              <option value="published_at">Lowest Price</option>
            </select>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {paginatedAndSortedItems.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500">No items found</p>
          </div>
        ) : (
            paginatedAndSortedItems.map((item) => (
            <div
                key={item.title}
                className="transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                onClick={() => handleCardClick(item)}
            >
                <ListCard data={item} />
            </div>
          ))
        )}
      </div>

      <div className="flex justify-between items-center mt-8">
        <button
          onClick={handlePrevPage}
          disabled={pageNumber === 1}
          className={`px-4 py-2 rounded-md transition-colors duration-200
            ${pageNumber === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-orange-500 text-white hover:bg-orange-600'
            }`}
        >
          Previous
        </button>
        <span className="text-sm text-gray-600">Page {pageNumber}</span>
        <button
          onClick={handleNextPage}
          disabled={pageNumber === totalPages}
          className={`px-4 py-2 rounded-md transition-colors duration-200
            ${pageNumber === totalPages
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-orange-500 text-white hover:bg-orange-600'
            }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BiddingList; 