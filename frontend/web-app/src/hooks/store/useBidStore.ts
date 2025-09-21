import { Bid } from "@/types";
import { create } from "zustand";

type State = {
  bids: Bid[];
  open: boolean;
};

type Actions = {
  setBids: (bids: Bid[]) => void;
  addBid: (bid: Bid) => void;
  setOpen: (open: boolean) => void;
};

export const useBidStore = create<State & Actions>((set) => ({
  bids: [],
  open: false,

  setBids: (bids: Bid[]) => set({ bids }),
  addBid: (bid) =>
    set((state) => ({
      bids: !state.bids.find((b) => b.id === bid.id)
        ? [...state.bids, bid]
        : state.bids,
    })),
  setOpen: (open: boolean) => set({ open }),
}));
