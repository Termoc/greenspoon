"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

import Card from "@/components/Card";
import Searchbar from "@/components/Searchbar";
import {
  fetchBySearch,
  fetchByCategory,
  fetchAllAlphabetically,
} from "@/components/Fetcher";

interface RecipeType {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strInstructions: string;
  strMealThumb: string;
  strYoutube: string;
}

export default function RecipeP() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const [search, setSearch] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const initialPage = parseInt(searchParams.get("page") || "1", 10);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const itemsPerPage = 9;

  const fetchRecipes = useCallback(async (term: string, category: string) => {
    setLoading(true);
    setError(null);
    setRecipes([]);

    try {
      let meals: RecipeType[] = [];

      if (term) {
        const mealsByName = await fetchBySearch(term);

        if (category !== "All") {
          meals = mealsByName.filter(
            (meal) =>
              meal.strCategory &&
              meal.strCategory.toLowerCase() === category.toLowerCase()
          );
          if (mealsByName.length > 0 && meals.length === 0) {
            setError(
              `Makanan "${term}" tidak terdapat di kategori "${category}".`
            );
          }
        } else {
          meals = mealsByName;
        }
      } else if (category !== "All") {
        meals = await fetchByCategory(category);
      } else {
        meals = await fetchAllAlphabetically();
      }

      setRecipes(meals);
    } catch (err) {
      console.error("Gagal mengambil resep:", err);
      setError("Gagal memuat resep. Silakan coba lagi nanti.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const searchTermFromUrl = searchParams.get("s") || "";
    const categoryFromUrl = searchParams.get("c") || "All";
    const pageFromUrl = parseInt(searchParams.get("page") || "1", 10);

    setSearch(searchTermFromUrl);
    setSelectedCategory(categoryFromUrl);
    setCurrentPage(pageFromUrl);

    fetchRecipes(searchTermFromUrl, categoryFromUrl);
  }, [searchParams, fetchRecipes]);

  const handleSearchSubmit = () => {
    const newSearchParams = new URLSearchParams();
    if (search) newSearchParams.set("s", search);
    if (selectedCategory && selectedCategory !== "All")
      newSearchParams.set("c", selectedCategory);
    newSearchParams.set("page", "1");
    router.push(`/menu?${newSearchParams.toString()}`);
  };

  const indexOfLastRecipe = currentPage * itemsPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - itemsPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  const totalPages = Math.ceil(recipes.length / itemsPerPage);

  const updatePageInUrl = (newPage: number) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("page", newPage.toString());
    router.push(`/recipe?${newSearchParams.toString()}`);
  };

  const handleNextPage = () => {
    const newPage = Math.min(currentPage + 1, totalPages);
    setCurrentPage(newPage);
    updatePageInUrl(newPage);
  };

  const handlePrevPage = () => {
    const newPage = Math.max(currentPage - 1, 1);
    setCurrentPage(newPage);
    updatePageInUrl(newPage);
  };

  return (
    <>
      <Searchbar
        search={search}
        setSearch={setSearch}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        onSubmit={handleSearchSubmit}
      />

      <Card>
        <div className="flex flex-col min-h-[calc(100vh-150px)]">
          {loading && (
            <p className="text-center text-lg mt-4">Memuat resep...</p>
          )}
          {error && <p className="text-center text-red-500 mt-4">{error}</p>}
          {!loading && !error && recipes.length === 0 && (
            <p className="text-center text-gray-700 mt-4">
              {error || `Tidak ada resep ditemukan untuk pencarian Anda.`}
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 mx-auto max-w-6xl flex-grow">
            {currentRecipes.map((recipe) => (
              <div
                key={recipe.idMeal}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out overflow-hidden flex flex-col"
              >
                {recipe.strMealThumb && (
                  <div className="relative w-full h-56">
                    <Image
                      src={recipe.strMealThumb}
                      alt={recipe.strMeal}
                      fill
                      style={{ objectFit: "cover" }}
                      className="rounded-t-2xl"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold mb-2 text-slate-800">
                    {recipe.strMeal}
                  </h3>
                  <p className="text-gray-700 text-base mb-4 line-clamp-3 flex-grow">
                    {recipe.strInstructions?.split(". ")[0] ||
                      "Resep ini adalah hidangan lezat yang mudah dibuat."}
                  </p>
                  <div className="flex justify-between items-center text-gray-600 text-sm border-t border-gray-200 pt-4 mt-auto">
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

          {!loading && !error && recipes.length > 0 && (
            <div className="flex justify-center items-center mt-8 space-x-4 pb-8">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="rounded-md bg-[#EA2F14] py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-[#C02610] focus:shadow-none active:bg-[#A1200D] hover:bg-[#C02610] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              >
                Sebelumnya
              </button>
              <span className="text-lg font-medium text-slate-700">
                Halaman {currentPage} dari {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="rounded-md bg-[#EA2F14] py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-[#C02610] focus:shadow-none active:bg-[#A1200D] hover:bg-[#C02610] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              >
                Berikutnya
              </button>
            </div>
          )}
        </div>
      </Card>
    </>
  );
}
