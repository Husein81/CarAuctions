import { auctionsApi } from "@/lib/api";
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

export const useUpdateAuction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, auction }: { id: string; auction: any }) =>
      auctionsApi.updateAuction(id, auction),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auctions"] });
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
