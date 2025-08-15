import { Suspense } from "react";
import RecipesContent from "./RecipesContent";

export default function RecipesPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Suspense fallback={<div className="flex-1 flex items-center justify-center">Loading recipes...</div>}>
        <RecipesContent />
      </Suspense>
    </main>
  );
} 