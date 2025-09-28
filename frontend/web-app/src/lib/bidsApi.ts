import { getTokenWorkaround } from "@/app/actions/authAuctions";
import { Bid } from "@/types";
import axios from "axios";
import { getSession } from "next-auth/react";

const BIDS_API_BASE = process.env.NEXT_PUBLIC_BIDS_API_BASE_URL;

const api = axios.create({
  baseURL: BIDS_API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    try {
      let token = null;
      token = await getTokenWorkaround();

      if (!token) {
        const session = await getSession();
        token = session;
      }

      const accessToken = token?.access_token;

      if (accessToken) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    } catch (error) {
      console.error("Error getting session:", error);
      return config;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optional: Add response interceptor for handling 401s
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.log("Unauthorized - redirecting to login");
    }
    return Promise.reject(error);
  }
);

export const bidsApi = {
  getBidsForAuction: async (auctionId: string): Promise<Bid[]> => {
    try {
      const response = await api.get(`/bids/${auctionId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching bids:", error);
      throw error;
    }
  },
  placeBidForAuction: async (
    auctionId: string,
    amount: number
  ): Promise<void> => {
    try {
      const res = await api.post("/bids", { auctionId, amount });
      return res.data;
    } catch (error) {
      console.error("Error placing bid:", error);
      throw error;
    }
  },
};
