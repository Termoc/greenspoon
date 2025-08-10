"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

import Card from "@/components/Card";
import {
  fetchBySearch,
  fetchByCategory,
  fetchAllAlphabetically,
} from "@/components/Fetcher";

// Define a clear type for the recipe data structure.
interface Recipe {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strInstructions: string;
  strMealThumb: string;
  strYoutube: string;
}

/**
 * Renders a grid of recipe cards with search, filtering, and pagination.
 */
export default function RecipePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State for the full list of recipes fetched from the API.
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  // State for UI status, such as loading and errors.
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Memoize values from URL search parameters to avoid re-parsing on every render.
  const searchTerm = useMemo(() => searchParams.get("s") || "", [searchParams]);
  const selectedCategory = useMemo(
    () => searchParams.get("c") || "All",
    [searchParams]
  );
  const currentPage = useMemo(
    () => parseInt(searchParams.get("page") || "1", 10),
    [searchParams]
  );

  const ITEMS_PER_PAGE = 9;

  /**
   * Fetches recipes based on the search term and category.
   * This function is wrapped in useCallback to prevent it from being recreated on every render,
   * which is important for its usage in the useEffect dependency array.
   */
  const fetchRecipes = useCallback(
    async (term: string, category: string) => {
      setIsLoading(true);
      setError(null);
      setAllRecipes([]);

      try {
        let meals: Recipe[] = [];

        // Simplified data fetching logic.
        if (term) {
          const mealsByName = await fetchBySearch(term);
          // If a category is also selected, filter the search results.
          if (category !== "All") {
            meals = mealsByName.filter(
              (meal) =>
                meal.strCategory?.toLowerCase() === category.toLowerCase()
            );
            // Set an error if the search term is not found within the specified category.
            if (mealsByName.length > 0 && meals.length === 0) {
              setError(
                `Meal "${term}" not found in the "${category}" category.`
              );
            }
          } else {
            meals = mealsByName;
          }
        } else if (category !== "All") {
          meals = await fetchByCategory(category);
        } else {
          // Default case: fetch all recipes alphabetically.
          meals = await fetchAllAlphabetically();
        }

        setAllRecipes(meals);
        if (meals.length === 0 && !error) {
          setError("No recipes found for your search.");
        }
      } catch (err) {
        console.error("Failed to fetch recipes:", err);
        setError("Failed to load recipes. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    },
    [error]
  ); // Dependency array includes `error` to allow resetting the error message on a new fetch.

  // Effect to fetch recipes whenever the search term or category in the URL changes.
  useEffect(() => {
    fetchRecipes(searchTerm, selectedCategory);
  }, [searchTerm, selectedCategory, fetchRecipes]);

  /**
   * Updates the URL with a new page number, triggering a re-render.
   * @param newPage - The page number to navigate to.
   */
  const handlePageChange = (newPage: number) => {
    // Create a new URLSearchParams object from the current one to preserve other params.
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("page", newPage.toString());
    // Use router.push to navigate without a full page reload.
    router.push(`/recipe?${newSearchParams.toString()}`);
  };

  // Memoize calculations for pagination to avoid re-computing on every render.
  const totalPages = useMemo(
    () => Math.ceil(allRecipes.length / ITEMS_PER_PAGE),
    [allRecipes.length]
  );

  const currentRecipes = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return allRecipes.slice(startIndex, endIndex);
  }, [allRecipes, currentPage]);

  /**
   * Generates pagination buttons with ellipsis for large page numbers.
   * @returns An array of JSX elements representing the pagination controls.
   */
  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pageButtons = [];
    const maxPagesToShow = 5; // Max number of page buttons to show.

    // Helper to create a page button.
    const createButton = (pageNum: number | string, key: string) => (
      <button
        key={key}
        onClick={() => typeof pageNum === "number" && handlePageChange(pageNum)}
        disabled={typeof pageNum !== "number"}
        className={`w-10 h-10 flex items-center justify-center rounded-full border text-sm font-medium transition-all duration-200 ${
          currentPage === pageNum
            ? "bg-green-600 text-white border-green-600 cursor-default"
            : "bg-white text-gray-700 border-gray-300 hover:bg-green-50 disabled:bg-gray-100 disabled:cursor-not-allowed"
        }`}
      >
        {pageNum}
      </button>
    );

    // Logic to show pages: 1 ... 4 5 6 ... 10
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageButtons.push(createButton(i, `page-${i}`));
      }
    } else {
      // Always show first page
      pageButtons.push(createButton(1, "page-1"));
      if (currentPage > 3) {
        pageButtons.push(createButton("...", "start-ellipsis"));
      }

      // Determine the range of pages to show around the current page
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage === 1) end = 3;
      if (currentPage === totalPages) start = totalPages - 2;

      for (let i = start; i <= end; i++) {
        pageButtons.push(createButton(i, `page-${i}`));
      }

      if (currentPage < totalPages - 2) {
        pageButtons.push(createButton("...", "end-ellipsis"));
      }
      // Always show last page
      pageButtons.push(createButton(totalPages, `page-${totalPages}`));
    }

    return pageButtons;
  };

  return (
    <>
      <Card>
        <div className="flex flex-col min-h-[calc(100vh-150px)]">
          {/* Main Content Area */}
          <div className="flex-grow max-w-6xl mx-auto w-full">
            {isLoading && (
              <p className="text-center text-lg mt-8">Loading recipes...</p>
            )}
            {error && !isLoading && (
              <p className="text-center text-red-500 mt-8 text-lg">{error}</p>
            )}

            {/* Recipe Grid */}
            {!isLoading && currentRecipes.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                {currentRecipes.map((recipe) => (
                  <div
                    key={recipe.idMeal}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out overflow-hidden flex flex-col"
                  >
                    <div className="relative w-full h-56">
                      <Image
                        src={recipe.strMealThumb}
                        alt={recipe.strMeal}
                        fill
                        style={{ objectFit: "cover" }}
                        className="rounded-t-2xl"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={true} // Prioritize loading images that are visible in the viewport
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-2xl font-bold mb-2 text-slate-800">
                        {recipe.strMeal}
                      </h3>
                      <p className="text-gray-700 text-base mb-4 line-clamp-3 flex-grow">
                        {recipe.strInstructions?.split(". ")[0] ||
                          "This is a delicious and easy-to-make dish."}
                      </p>
                      <div className="flex justify-between items-center text-gray-600 text-sm border-t border-gray-200 pt-4 mt-auto">
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
                          15-20 Min
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
                          1 Serving
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pagination Section */}
          {!isLoading && totalPages > 0 && (
            <div className="flex flex-col items-center mt-8 space-y-4 pb-8">
              <span className="text-lg font-medium text-slate-700">
                Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
                {Math.min(currentPage * ITEMS_PER_PAGE, allRecipes.length)} of{" "}
                {allRecipes.length} recipes
              </span>
              <div className="flex items-center space-x-2">
                {renderPagination()}
              </div>
            </div>
          )}
        </div>
      </Card>
    </>
  );
}
