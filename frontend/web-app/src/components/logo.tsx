"use client";
import { useParamsStore } from "@/hooks";
import Icon from "./icon";
import { usePathname, useRouter } from "next/navigation";

const Logo = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { reset } = useParamsStore();

  const handleReset = () => {
    if (pathname !== "/") router.push("/");
    reset();
  };

  return (
    <div
      onClick={handleReset}
      className="cursor-pointer flex items-center gap-2 text-3xl font-semibold text-red-400"
    >
      <h1 className="text-2xl font-bold">BidDrive</h1>
      <Icon name="Car" size={32} />
    </div>
  );
};
export default Logo;
