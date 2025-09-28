"use client";
import { useGetAuction, usePlaceBidForAuction } from "@/hooks";
import { AuctionFinished, Bid } from "@/types";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import { toast } from "react-toastify";

export default function SignalRProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = useSession();
  const user = session.data?.user;

  const connection = useRef<HubConnection | null>(null);
  const params = useParams<{ id: string }>();
  const placeBidForAuction = usePlaceBidForAuction();

  const handleAuctionFinished = useCallback(
    (finishedAuction: AuctionFinished) => {
      const { data: auction } = useGetAuction(finishedAuction.auctionId);
      return toast.info(`Auction for ${auction?.make} has finished!`);
    },
    []
  );

  const handleBidPlaced = useCallback(
    (bid: Bid) => {
      if (bid.bidStatus.includes("Accepted") && params.id === bid.auctionId) {
        placeBidForAuction.mutate({
          auctionId: bid.auctionId,
          amount: bid.amount,
        });
      }
    },
    [placeBidForAuction, params.id]
  );

  useEffect(() => {
    if (!connection.current) {
      connection.current = new HubConnectionBuilder()
        .withUrl(process.env.NEXT_PUBLIC_NOTIFY_URL!)
        .withAutomaticReconnect()
        .build();

      connection.current
        .start()
        .then(() => console.log("Connected to notification hub"))
        .catch((err) => console.error("Connection failed: ", err));
    }

    connection.current.on("BidPlaced", handleBidPlaced);
    connection.current.on("AuctionFinished", handleAuctionFinished);

    return () => {
      connection.current?.off("BidPlaced", handleBidPlaced);
      connection.current?.off("AuctionFinished", handleAuctionFinished);
    };
  }, [handleBidPlaced, handleAuctionFinished]);

  return <>{children}</>;
}
