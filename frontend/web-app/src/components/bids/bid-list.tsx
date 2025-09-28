import { Auction } from "@/types";
import { User } from "next-auth";
import Heading from "../heading";
import { useGetBidsForAuction } from "@/hooks";
import Spinner from "../spinner";
import EmptyFilter from "../empty-filter";
import BidItem from "./bid-item";
import BidForm from "./bid-form";

type Props = {
  user: User | null;
  auction: Auction;
};

const BidList = ({ user, auction }: Props) => {
  const { data: bids, isLoading } = useGetBidsForAuction(auction.id);

  const highBid = bids
    ? bids.reduce(
        (prev, current) =>
          prev > current.amount
            ? prev
            : current.bidStatus.includes("Accepted")
            ? current.amount
            : prev,
        0
      )
    : 0;

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-36">
        <Spinner className="border-gray-500" />
      </div>
    );

  return (
    <div className="rounded-lg shadow-md">
      <div className="py-2 px-4 bg-white">
        <div className="sticky top-0 bg-white p-2">
          <Heading title={`Current high bid is $${highBid}`} />
        </div>
      </div>

      <div className="overflow-auto h-[250px] flex flex-col-reverse px-2">
        {bids?.length === 0 ? (
          <EmptyFilter
            title="No bids for this item"
            subtitle="Please feel free to make a bid!"
          />
        ) : (
          <>
            {bids?.map((bid) => (
              <BidItem key={bid.id} bid={bid} />
            ))}
          </>
        )}
      </div>

      <div className="px-2 pb-2 text-gray-500">
        {!open ? (
          <div className="flex items-center justify-center p-2 text-lg font-semibold">
            This auction has finished
          </div>
        ) : !user ? (
          <div className="flex items-center justify-center p-2 text-lg font-semibold">
            Please login to place a bid
          </div>
        ) : user && user.username === auction.seller ? (
          <div className="flex items-center justify-center p-2 text-lg font-semibold">
            You cannot bid on your own auction
          </div>
        ) : (
          <BidForm auctionId={auction.id} highBid={highBid} />
        )}
      </div>
    </div>
  );
};
export default BidList;
