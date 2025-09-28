import { auctionsApi, bidsApi } from "@/lib";
import { Auction } from "@/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

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
    queryFn: () => auctionsApi.getAuctions(params),
  });

export const useGetAuction = (id: string) =>
  useQuery({
    queryKey: ["auction", id],
    queryFn: () => auctionsApi.getAuction(id),
  });

export const useGetBidsForAuction = (auctionId: string) =>
  useQuery({
    queryKey: ["bids", auctionId],
    queryFn: () => bidsApi.getBidsForAuction(auctionId),
    enabled: !!auctionId,
  });

export const useCreateAuction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: auctionsApi.createAuction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auctions"] });
      toast.success("Auction created successfully");
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    },
  });
};

export const usePlaceBidForAuction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      auctionId,
      amount,
    }: {
      auctionId: string;
      amount: number;
    }) => bidsApi.placeBidForAuction(auctionId, amount),
    onSuccess: (_, { auctionId }) => {
      queryClient.invalidateQueries({ queryKey: ["bids", auctionId] });
      toast.success("Bid placed successfully");
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    },
  });
};

export const useUpdateAuction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, auction }: { id: string; auction: Partial<Auction> }) =>
      auctionsApi.updateAuction(id, auction),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auctions"] });
      toast.success("Auction updated successfully");
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    },
  });
};

export const useDeleteAuction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => auctionsApi.deleteAuction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auctions"] });
      toast.success("Auction deleted successfully");
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    },
  });
};
