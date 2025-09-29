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

  const { data: currentAuction } = useGetAuction(params.id ?? "");

  const handleAuctionFinished = useCallback(
    (finishedAuction: AuctionFinished) => {
      if (currentAuction?.id === finishedAuction.auctionId) {
        toast.info(`Auction for ${currentAuction.make} has finished!`);
      }
    },
    [currentAuction]
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

  // useEffect(() => {
  //   if (!connection.current) {
  //     const notifyUrl = process.env.NEXT_PUBLIC_NOTIFY_URL;
  //     connection.current = new HubConnectionBuilder()
  //       .withUrl(`${notifyUrl}`)
  //       .withAutomaticReconnect()
  //       .build();

  //     const startConnection = async () => {
  //       try {
  //         await connection.current?.start();
  //         console.log("Connected to notification hub");
  //       } catch (err) {
  //         console.error("SignalR Connection failed:", err);
  //         // Retry after 5 seconds
  //         setTimeout(startConnection, 5000);
  //       }
  //     };

  //     startConnection();
  //   }

  //   connection.current.on("BidPlaced", handleBidPlaced);
  //   connection.current.on("AuctionFinished", handleAuctionFinished);

  //   return () => {
  //     connection.current?.off("BidPlaced", handleBidPlaced);
  //     connection.current?.off("AuctionFinished", handleAuctionFinished);
  //   };
  // }, [handleBidPlaced, handleAuctionFinished]);

  return <>{children}</>;
}
