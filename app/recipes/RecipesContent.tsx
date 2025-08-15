"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Fuse from "fuse.js";
import recipesData from "@/public/data/recipes.json";
import Link from "next/link";

interface Recipe {
  id: string;
  name: string;
  image: string;
  ingredients?: string[];
  instructions?: string;
}

export default function RecipesContent() {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("s")?.toLowerCase() || "";
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fuse = new Fuse(recipesData as Recipe[], {
      keys: ["name", "ingredients", "instructions"],
      threshold: 0.3,
    });

    if (searchTerm) {
      const results = fuse.search(searchTerm).map((r) => r.item);
      setRecipes(results);
    } else {
      setRecipes(recipesData as Recipe[]);
    }
  }, [searchTerm]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 items-center justify-center text-center">
      {recipes.length === 0 ? (
        <p className="text-gray-600 text-sm sm:text-base">No recipes found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {recipes.map((recipe) => (
            <Link
              key={recipe.id}
              href={`/recipe/${recipe.id}`}
              className="bg-white rounded-xl shadow hover:shadow-lg transition p-3 sm:p-4 lg:p-6 flex flex-col"
            >
              <div className="relative w-full h-40 sm:h-48 lg:h-56">
                <Image
                  src={recipe.image}
                  alt={recipe.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <h3 className="mt-3 sm:mt-4 font-bold text-sm sm:text-base lg:text-lg">
                {recipe.name}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-2 line-clamp-3">
                {recipe.instructions || "Discover the full recipe details."}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
