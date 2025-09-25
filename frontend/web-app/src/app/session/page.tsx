"use client";
import Heading from "@/components/heading";
import { useSession } from "next-auth/react";

export default function Session() {
  const { data: session } = useSession();
  return (
    <div>
      <Heading title="Session dashboard" />
      <div className="bg-blue-200 border-2 border-blue-400 p-2 max-w-6xl">
        <h3 className="text-lg">Session data</h3>
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </div>
    </div>
  );
}
