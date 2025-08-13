"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface Recipe {
  id: string;
  name: string;
  image: string;
  ingredients: string[];
  instructions: string;
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
    <section id="recipes" className="bg-white py-20 font-inter">
      <div className="max-w-7xl mx-auto px-6 items-center text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-3">
          Today&apos;s Signature Recipes
        </h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Inspiration from local farm harvests for your kitchen.
        </p>

        {loading && (
          <p className="text-lg text-gray-700">Memuat resep pilihan...</p>
        )}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && recipes.length === 0 && (
          <p className="text-gray-700">Tidak ada resep ditemukan.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden flex flex-col"
            >
              <div className="relative w-full h-48">
                <Image
                  src={recipe.image}
                  alt={recipe.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-slate-800 mb-2">
                  {recipe.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                  {recipe.instructions?.split(". ")[0] ||
                    "Resep ini adalah hidangan lezat yang mudah dibuat."}
                </p>

                <div className="flex justify-between items-center text-gray-600 text-sm border-t border-gray-200 pt-3 mt-auto">
                  <span className="flex items-center gap-1">⏱ 15-20 Menit</span>
                  <span className="flex items-center gap-1">🍽 1 Porsi</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <Link href="/menu">
            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-10 rounded-xl text-lg transition duration-300">
              See All Recipes
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
