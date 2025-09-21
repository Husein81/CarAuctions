import { auctionSchema, PagedResult } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetAuctions = (params: {
  pageNumber?: number;
  pageSize?: number;
  searchTerm?: string;
  orderBy?: string;
  filterBy?: string;
  seller?: string;
  winner?: string;
}) =>
  useQuery({
    queryKey: ["auctions", params],
    queryFn: async (): Promise<PagedResult<typeof auctionSchema>> => {
      const response = await axios.get("http://localhost:5002/api/search", {
        params,
      });
      return response.data;
    },
  });
