"use client";

import { User } from "next-auth";
import DropdownMenu from "./dropdown-menu";
import { signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useParamsStore } from "@/hooks";

type Props = {
  user: User;
};

const UserActions = ({ user }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const { setParams } = useParamsStore();

  const setWinner = () => {
    setParams({ winner: user.username, seller: undefined });
    if (pathname !== "/") router.push("/");
  };

  const setSeller = () => {
    setParams({ seller: user.username, winner: undefined });
  };

  const options = [
    {
      id: "my-auctions",
      label: "My Auctions",
      icon: "User",
      checked: false,
      onChange: () => setSeller(),
    },
    {
      id: "auctions-win",
      label: "Auctions Win",
      icon: "Trophy",
      checked: false,
      onChange: () => setWinner(),
    },
    {
      id: "sell-my-car",
      label: "Sell My Car",
      icon: "Car",
      checked: false,
      onChange: () => router.push("/auctions/create"),
    },
    {
      id: "session",
      label: "Session (dev only!)",
      icon: "Terminal",
      checked: false,
      onChange: () => router.push("/session"),
    },
    {
      id: "logout",
      label: "Logout",
      icon: "LogOut",
      checked: false,
      onChange: () => signOut({ callbackUrl: "/" }),
    },
  ];
  return (
    <DropdownMenu
      label={`Welcome ${user.name}`}
      options={options}
      className="flex-row-reverse"
      iconName="ChevronDown"
    />
  );
};
export default UserActions;
