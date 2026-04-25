import { Suspense } from "react";
import SuccessPage from "../page";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessPage />
    </Suspense>
  );
}