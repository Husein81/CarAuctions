import React from "react";

type Props = {
  amount?: number;
  reservePrice: number;
};

export default function CurrentBid({ amount, reservePrice }: Props) {
  const text = amount ? "$" + amount : "No bids";
  const color = amount
    ? amount > reservePrice
      ? "bg-green-600"
      : "bg-amber-600"
    : "bg-red-500";

  return (
    <div
      className={`
          text-white py-1 border-2 border-white px-2 rounded-lg flex items-center justify-between
           ${color}
        `}
    >
      {text}
    </div>
  );
}
