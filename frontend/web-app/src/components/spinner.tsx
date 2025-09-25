import { cn } from "@/lib/utils";

type Props = {
  size?: "sm" | "md" | "lg";
  className?: string;
};

const Spinner = ({ size = "md", className }: Props) => {
  return (
    <div
      className={cn(
        "animate-spin rounded-full h-8 w-8 border-2 border-b-0 border-r-0 ",
        size === "sm"
          ? "h-6 w-6 border-t-1 border-b-1"
          : size === "lg"
          ? "h-16 w-16 "
          : "",
        className
      )}
    />
  );
};
export default Spinner;
