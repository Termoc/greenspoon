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
  prepTime?: string;
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
      {recipes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 sm:py-16">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">No recipes found</h3>
            <p className="text-gray-600 text-sm sm:text-base mb-6">Try adjusting your search terms or browse all recipes.</p>
            <Link href="/recipes" className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
              View All Recipes
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {recipes.map((recipe) => (
            <Link
              key={recipe.id}
              href={`/recipe/${recipe.id}`}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden flex flex-col"
            >
              <div className="relative w-full h-40 sm:h-48">
                <Image
                  src={recipe.image}
                  alt={recipe.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-3 sm:p-4 lg:p-5 flex flex-col flex-grow">
                <h3 className="text-sm sm:text-base lg:text-lg font-bold text-slate-800 mb-2">
                  {recipe.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 line-clamp-3 flex-grow">
                  {recipe.instructions?.split(". ")[0] || "Discover the full recipe details."}
                </p>
                <div className="flex justify-between items-center text-gray-600 text-xs sm:text-sm border-t border-gray-200 pt-2 sm:pt-3 mt-auto">
                  <span className="flex items-center gap-1">
                    ⏱ {recipe.prepTime ?? "15–20 Min"}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
