"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

// Base URL for the MealDB API
const MEALDB_BASE_URL = "https://www.themealdb.com/api/json/v1/1/";

// Interface for recipe data structure
interface Recipe {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strInstructions: string; // Adding instructions for description
  strMealThumb: string;
  strYoutube: string;
}

// Main component to display the top 8 recipes
export default function TopRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch random recipes
  const fetchRandomRecipes = useCallback(async () => {
    setLoading(true);
    setError(null);
    const fetchedMeals: Recipe[] = [];
    const uniqueMealIds = new Set<string>();

    try {
      // Fetching 8 unique random recipes
      while (fetchedMeals.length < 8) {
        const url = `${MEALDB_BASE_URL}random.php`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const meal: Recipe | null = data && data.meals ? data.meals[0] : null;

        // Ensure the recipe is valid and not already in the list
        if (meal && !uniqueMealIds.has(meal.idMeal)) {
          // Fetch details to get strInstructions and strCategory
          const detailUrl = `${MEALDB_BASE_URL}lookup.php?i=${meal.idMeal}`;
          const detailResponse = await fetch(detailUrl);
          if (!detailResponse.ok) {
            console.warn(
              `Failed to fetch details for ${meal.strMeal}: ${detailResponse.status}`
            );
            continue; // Continue to the next recipe if details fail
          }
          const detailData = await detailResponse.json();
          const detailedMeal: Recipe | null =
            detailData && detailData.meals ? detailData.meals[0] : null;

          if (detailedMeal) {
            fetchedMeals.push(detailedMeal);
            uniqueMealIds.add(detailedMeal.idMeal);
          }
        }
      }
    } catch (err) {
      console.error("Failed to fetch random recipes:", err);
      setError("Failed to load recipes. Please try again later.");
    } finally {
      setRecipes(fetchedMeals);
      setLoading(false);
    }
  }, []);

  // useEffect to load recipes when the component mounts
  useEffect(() => {
    fetchRandomRecipes();
  }, [fetchRandomRecipes]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 font-inter">
      <h1 className="text-4xl font-extrabold text-slate-800 mb-8 text-center">
        Resep Pilihan Hari Ini
      </h1>

      {/* Main wrapper div with Card styling */}
      {/* This div now acts as the large central card, incorporating the styles from your Card component */}
      <div className="mx-auto my-4 w-full max-w-6xl flex flex-col flex-grow">
        <div className="flex flex-col flex-grow min-h-[calc(100vh-250px)]">
          {" "}
          {/* Adjusting minimum height */}
          {loading && (
            <p className="text-center text-lg text-gray-700">
              Memuat resep pilihan...
            </p>
          )}
          {error && <p className="text-center text-red-500">{error}</p>}
          {!loading && !error && recipes.length === 0 && (
            <p className="text-center text-gray-700">
              Tidak ada resep yang tersedia saat ini.
            </p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto">
            {recipes.map((recipe) => (
              <div
                key={recipe.idMeal}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out overflow-hidden flex flex-col"
              >
                {recipe.strMealThumb && (
                  <div className="relative w-full h-56">
                    {" "}
                    {/* Adjusted image height */}
                    <Image
                      src={recipe.strMealThumb}
                      alt={recipe.strMeal}
                      fill
                      style={{ objectFit: "cover" }}
                      className="rounded-t-2xl"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-grow">
                  {" "}
                  {/* Removed pb-4 here */}
                  <h3 className="text-2xl font-bold mb-2 text-slate-800">
                    {recipe.strMeal}
                  </h3>
                  {/* Short description from strInstructions */}
                  <p className="text-gray-700 text-base mb-4 line-clamp-3 flex-grow">
                    {" "}
                    {/* Added flex-grow here */}
                    {recipe.strInstructions?.split(". ")[0] ||
                      "Resep ini adalah hidangan lezat yang mudah dibuat."}
                  </p>
                  {/* Container for time and servings, sticking to the bottom with a top border */}
                  <div className="flex justify-between items-center text-gray-600 text-sm border-t border-gray-200 pt-4 mt-auto">
                    {" "}
                    {/* Added mt-auto to push it to the bottom */}
                    {/* Placeholder for time and servings, as API doesn't provide directly */}
                    <span className="flex items-center mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1 text-green-600"
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
                    <span className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1 text-green-600"
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
        </div>
      </div>
      <Link
        href={"/recipe"}
        className="bg-[var(--bg-primary)] text-white font-semibold py-4 px-20 rounded-2xl text-2xl"
      >
        <button>See All Recipes</button>
      </Link>
    </div>
  );
}
