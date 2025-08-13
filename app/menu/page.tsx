import { Suspense } from "react";
import MenuContent from "./MenuContent";

export default function MenuPage() {
  return (
    <main>
      <h1>Menu</h1>
      <Suspense fallback={<div>Loading menu...</div>}>
        <MenuContent />
      </Suspense>
    </main>
  );
}
