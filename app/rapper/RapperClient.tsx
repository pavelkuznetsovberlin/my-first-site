"use client";

import { useSearchParams } from "next/navigation";

export default function RapperClient() {
  const sp = useSearchParams();
  const name = sp.get("name") ?? "Rapper";

  return (
    <main>
      <h1>{name}</h1>
    </main>
  );
}
