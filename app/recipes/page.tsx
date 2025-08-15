import { Suspense } from "react";
import RecipesContent from "./RecipesContent";

export default function RecipesPage() {
  return (
    <main>
      <Suspense fallback={<div>Loading recipes...</div>}>
        <RecipesContent />
      </Suspense>
    </main>
  );
} 