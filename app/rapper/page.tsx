import { Suspense } from "react";
import RapperClient from "./RapperClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RapperClient />
    </Suspense>
  );
}
