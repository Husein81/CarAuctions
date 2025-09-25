"use client";
import Heading from "@/components/heading";
import { AuctionForm } from "../auction-form";

export default function page() {
  return (
    <div className="mx-auto max-w-3/4 shadow-lg p-10 bg-white rounded-lg">
      <Heading
        title="Sell Your Car"
        subtitle="Please enter the details of your car"
      />
      <AuctionForm />
    </div>
  );
}
