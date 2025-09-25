"use client";

import React from "react";
import CountdownTimer from "@/components/auction/countdown-timer";
import Heading from "@/components/heading";
import { useDeleteAuction, useGetAuction } from "@/hooks";
import { Button, Spinner } from "@/components";
import CarImage from "@/components/auction/car-image";
import DetailedSpecs from "./DetailedSpecs";
import { User } from "next-auth";
import Link from "next/dist/client/link";
import { useRouter } from "next/navigation";

type Props = {
  id: string;
  user?: User;
};

export default function AuctionDetailsClient({ id, user }: Props) {
  const router = useRouter();
  const { data: auction, isLoading, error } = useGetAuction(id);

  const deleteAuction = useDeleteAuction();

  const handleDelete = async (id: string) => {
    await deleteAuction.mutateAsync(id);
    router.push("/");
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-36">
        <Spinner className="border-gray-500" />
      </div>
    );

  return (
    <>
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <Heading title={`${auction?.make} ${auction?.model}`} />
          {user?.username === auction?.seller && (
            <>
              <Button>
                <Link
                  href={`/auctions/update/${auction?.id}`}
                  className="text-white"
                >
                  Edit
                </Link>
              </Button>
              <Button
                variant={"destructive"}
                onClick={() => handleDelete(auction?.id ?? "")}
              >
                Delete
              </Button>
            </>
          )}
        </div>
        <div className="flex gap-4">
          <h3 className="text-2xl font-semibold">Time remaining:</h3>
          <CountdownTimer auctionEnd={auction?.auctionEnd ?? ""} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-3">
        <div className="relative w-full aspect-video  rounded-lg overflow-hidden">
          <CarImage imageUrl={auction?.imageUrl ?? ""} />
        </div>
        <div className="border-2 rounded-lg p-2 bg-gray-200">
          <Heading title="Bids" />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 rounded-lg">
        <DetailedSpecs auction={auction!} />
      </div>
    </>
  );
}
