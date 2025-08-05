"use client"; // Diperlukan untuk menggunakan hooks seperti useState dan useEffect

import React, { useState, useEffect } from "react";

interface SearchbarProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: () => void;
}

interface CategoryMeal {
  strCategory: string;
}

const Searchbar: React.FC<SearchbarProps> = ({
  search,
  setSearch,
  selectedCategory,
  setSelectedCategory,
  onSubmit,
}) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [loadingCategories, setLoadingCategories] = useState<boolean>(true);
  const [errorCategories, setErrorCategories] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      setErrorCategories(null);
      try {
        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/list.php?c=list"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data && data.meals) {
          const categoryNames = data.meals.map(
            (meal: CategoryMeal) => meal.strCategory
          );
          setCategories(["All", ...categoryNames]);
        } else {
          setCategories(["All"]);
        }
      } catch (err) {
        console.error("Gagal mengambil kategori:", err);
        setErrorCategories("Gagal memuat kategori.");
        setCategories(["All"]);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center p-5 gap-4 mx-auto max-w-2xl">
      <div className="w-full md:w-auto md:flex-grow-0">
        {loadingCategories ? (
          <select
            className="w-full bg-transparent text-slate-700 text-sm border border-slate-200 rounded-md py-2 px-3 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow disabled:opacity-50"
            disabled
          >
            <option>Memuat Kategori...</option>
          </select>
        ) : errorCategories ? (
          <select
            className="w-full bg-transparent text-slate-700 text-sm border border-slate-200 rounded-md py-2 px-3 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow disabled:opacity-50"
            disabled
          >
            <option>Gagal Memuat Kategori</option>
          </select>
        ) : (
          <select
            className="w-full bg-transparent text-slate-700 text-sm border border-slate-200 rounded-md py-2 px-3 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        )}
      </div>

      <form
        className="w-full flex justify-center items-center"
        onSubmit={handleFormSubmit}
      >
        <div className="relative flex justify-center items-center w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="absolute w-5 h-5 top-1/2 -translate-y-1/2 left-3 text-slate-500"
          >
            <path
              fillRule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="text"
            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            placeholder="Cari resep..."
            value={search}
            onChange={handleInputChange}
          />
          <button
            className="rounded-md bg-[#EA2F14] py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-[#C02610] focus:shadow-none active:bg-[#A1200D] hover:bg-[#C02610] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
            type="submit"
          >
            Cari
          </button>
        </div>
      </form>
    </div>
  );
};

export default Searchbar;
