"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface Recipe {
  id: string;
  name: string;
  image: string;
  ingredients?: string[];
  instructions?: string;
  prepTime?: string;
}

export default function TopRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocalRecipes = async () => {
      try {
        setLoading(true);
        const res = await fetch("/data/recipes.json");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data: Recipe[] = await res.json();

        // Ambil 8 resep acak
        const shuffled = [...data].sort(() => 0.5 - Math.random());
        const randomEight = shuffled.slice(0, 8);

        setRecipes(randomEight);
      } catch (err) {
        setError(`Failed to load recipes from local data. ${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchLocalRecipes();
  }, []);

  return (
    <section
      id="recipes"
      className="bg-gradient-to-br from-green-50 to-emerald-50 py-12 sm:py-16 md:py-20 font-inter"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 items-center text-center">
        <div className="mb-8 sm:mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            Featured Collection
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-800 mb-3 sm:mb-4">
            Today&apos;s Signature Recipes
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Inspiration from local farm harvests for your kitchen.
          </p>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            <span className="ml-3 text-gray-600">Loading featured recipes...</span>
          </div>
        )}
        {error && <p className="text-red-500 text-sm sm:text-base">{error}</p>}
        {!loading && !error && recipes.length === 0 && (
          <p className="text-gray-700 text-sm sm:text-base">
            Tidak ada resep ditemukan.
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {recipes.map((recipe, index) => (
            <Link
              key={recipe.id}
              href={`/recipe/${recipe.id}`}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col transform hover:-translate-y-2"
            >
              <div className="relative w-full h-48 sm:h-52">
                <Image
                  src={recipe.image}
                  alt={recipe.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Featured badge for first 3 cards */}
                {index < 3 && (
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-orange-400 to-red-500 text-white shadow-lg">
                      <span className="w-1.5 h-1.5 bg-white rounded-full mr-1"></span>
                      Featured
                    </span>
                  </div>
                )}
                
                {/* Quick stats overlay */}
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
                    <span className="text-xs font-medium text-gray-700">
                      ⏱ {recipe.prepTime ?? "15–20 Min"}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 sm:p-5 flex flex-col flex-grow">
                <h3 className="text-sm sm:text-base lg:text-lg font-bold text-slate-800 mb-2 group-hover:text-green-600 transition-colors duration-300">
                  {recipe.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-4 line-clamp-3 flex-grow">
                  {recipe.instructions?.split(". ")[0] ||
                    "Resep ini adalah hidangan lezat yang mudah dibuat."}
                </p>

                <div className="flex justify-between items-center text-gray-600 text-xs sm:text-sm border-t border-gray-100 pt-3 mt-auto">
                  <span className="flex items-center gap-1.5 text-green-600 font-medium">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {recipe.prepTime ?? "15–20 Min"}
                  </span>
                  <span className="flex items-center gap-1.5 text-orange-600 font-medium">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                    Popular
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 sm:mt-12">
          <Link href="/recipes">
            <button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 sm:py-4 px-8 sm:px-12 rounded-xl text-sm sm:text-base lg:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Explore All Recipes
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
