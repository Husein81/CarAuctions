import { getTokenWorkaround } from "@/app/actions/authAuctions";
import { Auction, auctionSchema, PagedResult } from "@/types";
import axios from "axios";
import { getSession } from "next-auth/react";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5001/api/";

const api = axios.create({
  baseURL: API_BASE,
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

      const accessToken = token?.accessToken;
      console.log(
        "Resolved Access Token:",
        accessToken ? "<redacted>" : null,
        token
      );
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

export const auctionsApi = {
  getAuctions: async (params: {
    pageNumber?: number;
    pageSize?: number;
    searchTerm?: string;
    orderBy?: string;
    filterBy?: string;
    seller?: string;
    winner?: string;
  }): Promise<PagedResult<typeof auctionSchema>> => {
    const response = await axios.get("http://localhost:5002/api/search", {
      params,
    });
    return response.data;
  },
  getAuction: async (id: string): Promise<Auction> => {
    const response = await api.get(`auctions/${id}`);
    return response.data;
  },
  createAuction: async (auction: Partial<Auction>): Promise<Auction> => {
    const response = await api.post("auctions", auction);
    return response.data;
  },
  updateAuction: async (
    id: string,
    auction: Partial<Auction>
  ): Promise<Auction> => {
    const response = await api.put(`auctions/${id}`, auction);
    return response.data;
  },
  deleteAuction: async (id: string) => {
    await api.delete(`auctions/${id}`);
  },
};
