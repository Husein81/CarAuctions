"use client";

import { Shad } from "@/components";
import { Auction } from "@/types";

type Props = {
  auction: Auction;
};
export default function DetailedSpecs({ auction }: Props) {
  return (
    <Shad.Table>
      <Shad.TableBody>
        <Shad.TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Shad.TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            Seller
          </Shad.TableCell>
          <Shad.TableCell>{auction?.seller ?? "-"}</Shad.TableCell>
        </Shad.TableRow>
        <Shad.TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Shad.TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            Make
          </Shad.TableCell>
          <Shad.TableCell>{auction.make}</Shad.TableCell>
        </Shad.TableRow>
        <Shad.TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Shad.TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            Model
          </Shad.TableCell>
          <Shad.TableCell>{auction.model}</Shad.TableCell>
        </Shad.TableRow>
        <Shad.TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Shad.TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            Year manufactured
          </Shad.TableCell>
          <Shad.TableCell>{auction.year}</Shad.TableCell>
        </Shad.TableRow>
        <Shad.TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Shad.TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            Mileage
          </Shad.TableCell>
          <Shad.TableCell>{auction.mileage}</Shad.TableCell>
        </Shad.TableRow>
        <Shad.TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Shad.TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            Has reserve price?
          </Shad.TableCell>
          <Shad.TableCell>
            {auction.reservePrice > 0 ? "Yes" : "No"}
          </Shad.TableCell>
        </Shad.TableRow>
      </Shad.TableBody>
    </Shad.Table>
  );
}
