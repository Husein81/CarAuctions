"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui";

export default function AuthTest() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>();

  return (
    <div className="flex items-center gap-4">
      <Button onClick={() => {}}>Test auth</Button>
      <div>{JSON.stringify(result, null, 2)}</div>
    </div>
  );
}
