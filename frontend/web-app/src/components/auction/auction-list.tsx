"use client";

import { useGetAuctions, useParamsStore } from "@/hooks";
import { Auction } from "@/types";
import EmptyFilter from "../empty-filter";
import Pagination from "../pagination";
import SkeletonList from "../skeleton-list";
import AuctionCard from "./auction-card";
import Filters from "./filters";

const AuctionList = () => {
  const {
    pageNumber,
    pageSize,
    orderBy,
    seller,
    winner,
    searchTerm,
    setParams,
  } = useParamsStore();

  const { data: pagedAuctions, isLoading } = useGetAuctions({
    pageNumber,
    pageSize,
    orderBy,
    searchTerm,
    seller,
    winner,
  });

  const auctions = pagedAuctions?.results;

  return (
    <div className="w-full flex flex-col">
      <div className="flex-1">
        <Filters />
        {isLoading ? (
          <SkeletonList />
        ) : pagedAuctions?.totalCount === 0 ? (
          <EmptyFilter showReset />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {auctions &&
              auctions.map((auction: Auction) => (
                <AuctionCard key={auction.id} auction={auction} />
              ))}
          </div>
        )}
      </div>

      <Pagination
        currentPage={pageNumber}
        totalPages={Math.ceil((pagedAuctions?.totalCount || 0) / pageSize)}
      />
    </div>
  );
};
export default AuctionList;
