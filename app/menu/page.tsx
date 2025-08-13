"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Fuse from "fuse.js";
import recipesData from "@/public/data/recipes.json";

interface Recipe {
  id: string;
  name: string;
  image: string;
  ingredients: string[];
  instructions: string;
}

export default function Menu() {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("s")?.toLowerCase() || "";

  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fuse = new Fuse(recipesData as Recipe[], {
      keys: ["name", "ingredients", "instructions"],
      threshold: 0.3, // semakin kecil semakin ketat pencariannya
    });

    if (searchTerm) {
      const results = fuse.search(searchTerm).map((r) => r.item);
      setRecipes(results);
    } else {
      setRecipes(recipesData as Recipe[]);
    }
  }, [searchTerm]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Search Bar */}

      {/* Recipes Grid */}
      {recipes.length === 0 ? (
        <p className="text-gray-600">No recipes found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col"
            >
              <div className="relative w-full h-48">
                <Image
                  src={recipe.image}
                  alt={recipe.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <h3 className="mt-4 font-bold text-lg">{recipe.name}</h3>
              <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                {recipe.instructions}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
