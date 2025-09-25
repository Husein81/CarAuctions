"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  imageUrl: string;
};

export default function CarImage({ imageUrl }: Props) {
  const [isLoading, setLoading] = useState(true);

  if (!imageUrl || imageUrl.trim() === "") {
    return (
      <div className="w-full h-full bg-gray-300 flex items-center justify-center rounded-lg">
        <span className="text-gray-500">No image</span>
      </div>
    );
  }

  return (
    <Image
      src={imageUrl}
      alt="image"
      fill
      priority
      className={cn(
        "object-cover rounded-lg group-hover:opacity-75 duration-700 ease-in-out",
        {
          "grayscale blur-2xl scale-110": isLoading,
          "grayscale-0 blur-0 scale-100": !isLoading,
        }
      )}
      sizes="(max-width:768px) 100vw, (max-width: 1200px) 50vw, 25vw"
      onLoad={() => setLoading(false)}
    />
  );
}
