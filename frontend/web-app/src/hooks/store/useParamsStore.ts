import { create } from "zustand";

type State = {
  pageNumber: number;
  pageSize: number;
  pageCount: number;
  searchTerm: string;
  searchValue: string;
  orderBy: string;
  filterBy: string;
  seller?: string;
  winner?: string;
};

type Actions = {
  setParams: (params: Partial<State>) => void;
  reset: () => void;
};

const initialState: State = {
  pageNumber: 1,
  pageSize: 12,
  pageCount: 1,
  searchTerm: "",
  searchValue: "",
  orderBy: "make",
  filterBy: "live",
  seller: undefined,
  winner: undefined,
};

export const useParamsStore = create<Actions & State>((set) => ({
  ...initialState,
  setParams: (params: Partial<State>) => {
    set((state) => {
      if (params.pageNumber) {
        return { ...state, pageNumber: params.pageNumber };
      } else {
        return { ...state, ...params };
      }
    });
  },
  reset: () => set(initialState),
}));
