"use client";
import { useParamsStore } from "@/hooks";
import Icon from "./icon";

const Logo = () => {
  const { reset } = useParamsStore();
  return (
    <div
      onClick={reset}
      className="cursor-pointer flex items-center gap-2 text-3xl font-semibold text-red-400"
    >
      <h1 className="text-2xl font-bold">BidDrive</h1>
      <Icon name="Car" size={32} />
    </div>
  );
};
export default Logo;
