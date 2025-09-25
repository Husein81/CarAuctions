"use client";

import { useParamsStore } from "@/hooks";
import { signIn } from "next-auth/react";
import Heading from "./heading";
import { Button } from "./ui";

type Props = {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
  showLogin?: boolean;
  callbackUrl?: string;
};

export default function EmptyFilter({
  title = "No matches for this filter",
  subtitle = "Try changing or resetting the filter",
  showReset,
  showLogin,
  callbackUrl,
}: Props) {
  const reset = useParamsStore((state) => state.reset);

  return (
    <div className="h-[40vh] flex flex-col gap-2 justify-center items-center rounded-md shadow-lg">
      <Heading title={title} subtitle={subtitle} center />
      <div className="mt-4 flex items-center gap-4 flex-col">
        {showReset && <Button onClick={reset}>Remove Filters</Button>}
        {showLogin && (
          <Button onClick={() => signIn("id-server", { callbackUrl })}>
            Login
          </Button>
        )}
      </div>
    </div>
  );
}
