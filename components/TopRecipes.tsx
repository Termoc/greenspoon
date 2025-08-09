"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

const MEALDB_BASE_URL = "https://www.themealdb.com/api/json/v1/1/";

interface Recipe {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strInstructions: string;
  strMealThumb: string;
  strYoutube: string;
}

export default function TopRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRandomRecipes = useCallback(async () => {
    setLoading(true);
    setError(null);
    const fetchedMeals: Recipe[] = [];
    const uniqueMealIds = new Set<string>();

    try {
      while (fetchedMeals.length < 8) {
        const res = await fetch(`${MEALDB_BASE_URL}random.php`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        const meal = data?.meals?.[0];

        if (meal && !uniqueMealIds.has(meal.idMeal)) {
          const detailRes = await fetch(
            `${MEALDB_BASE_URL}lookup.php?i=${meal.idMeal}`
          );
          if (!detailRes.ok) continue;
          const detailData = await detailRes.json();
          const detailedMeal = detailData?.meals?.[0];
          if (detailedMeal) {
            fetchedMeals.push(detailedMeal);
            uniqueMealIds.add(detailedMeal.idMeal);
          }
        }
      }
    } catch (err) {
      setError("Failed to load recipes. Please try again later.");
    } finally {
      setRecipes(fetchedMeals);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRandomRecipes();
  }, [fetchRandomRecipes]);

  return (
    <section className="bg-white py-20 font-inter">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-3">
          Today's Signature Recipes
        </h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Inspiration from local farm harvests for your kitchen.
        </p>

        {/* Loading / Error */}
        {loading && (
          <p className="text-lg text-gray-700">Memuat resep pilihan...</p>
        )}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && recipes.length === 0 && (
          <p className="text-gray-700">
            Tidak ada resep yang tersedia saat ini.
          </p>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {recipes.map((recipe) => (
            <div
              key={recipe.idMeal}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden flex flex-col"
            >
              <div className="relative w-full h-48">
                <Image
                  src={recipe.strMealThumb}
                  alt={recipe.strMeal}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-slate-800 mb-2">
                  {recipe.strMeal}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                  {recipe.strInstructions?.split(". ")[0] ||
                    "Resep ini adalah hidangan lezat yang mudah dibuat."}
                </p>

                <div className="flex justify-between items-center text-gray-600 text-sm border-t border-gray-200 pt-3 mt-auto">
                  <span className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-green-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l3 3a1 1 0 001.414-1.414L11 9.586V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    15-20 Menit
                  </span>
                  <span className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-green-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zm-6 9a5 5 0 0110 0v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2a5 5 0 015-5z" />
                    </svg>
                    1 Porsi
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="mt-12">
          <Link href="/recipe">
            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-10 rounded-xl text-lg transition duration-300">
              See All Recipes
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
