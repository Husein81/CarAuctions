import axios from "axios";
import { useSession } from "next-auth/react";

export const updateAuctionTest = async (): Promise<{
  status: number;
  message: string;
}> => {
  const data = {
    mileage: Math.floor(Math.random() * 10000) + 1,
  };

  const session = useSession();

  const token = session.data?.access_token;

  const res = await axios.get("http://localhost:5001/auctions/", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return {
    status: res.status,
    message: res.data.message,
  };
};
