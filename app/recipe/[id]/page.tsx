"use client";

import Image from "next/image";
import recipesData from "@/public/data/recipes.json";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Share2, Copy, Check } from "lucide-react";

interface Recipe {
  id: string;
  name: string;
  image: string;
  ingredients?: string[];
  instructions?: string;
  prepTime?: string;
  cookTime?: string;
  servings?: number;
  difficulty?: string;
}

export default function RecipeDetailPage() {
  const params = useParams();
  const { id } = params as { id: string };
  const recipe: Recipe | undefined = (recipesData as Recipe[]).find(
    (r) => r.id === id
  );

  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: recipe?.name,
      text: `Check out this recipe: ${recipe?.name}`,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  if (!recipe) {
    return (
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-red-600">
          Recipe not found
        </h1>
        <p className="mt-2 text-gray-600 text-sm sm:text-base">
          We couldn&apos;t find the recipe you were looking for.
        </p>
        <Link
          href="/recipes"
          className="inline-block mt-6 text-green-700 hover:underline text-sm sm:text-base"
        >
          Back to recipes
        </Link>
      </main>
    );
  }

  return (
    <main className="bg-gradient-to-b from-green-50 to-white min-h-screen">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-800">
            {recipe.name}
          </h1>
          <button
            onClick={handleShare}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 sm:px-4 py-2 rounded-lg transition text-sm sm:text-base"
          >
            {copied ? (
              <Check size={16} className="sm:w-4 sm:h-4" />
            ) : (
              <Share2 size={16} className="sm:w-4 sm:h-4" />
            )}
            {copied ? "Copied!" : "Share"}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start">
          <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-lg group">
            <Image
              src={recipe.image}
              alt={recipe.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div>
            <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 text-xs sm:text-sm">
              {recipe.prepTime && (
                <div className="bg-green-100 border border-green-200 rounded-lg p-3 text-center shadow-sm">
                  <span className="block text-green-700">Prep</span>
                  <span className="font-semibold text-slate-800">
                    {recipe.prepTime}
                  </span>
                </div>
              )}
              {recipe.cookTime && (
                <div className="bg-yellow-100 border border-yellow-200 rounded-lg p-3 text-center shadow-sm">
                  <span className="block text-yellow-700">Cook</span>
                  <span className="font-semibold text-slate-800">
                    {recipe.cookTime}
                  </span>
                </div>
              )}
              {typeof recipe.servings === "number" && (
                <div className="bg-blue-100 border border-blue-200 rounded-lg p-3 text-center shadow-sm">
                  <span className="block text-blue-700">Servings</span>
                  <span className="font-semibold text-slate-800">
                    {recipe.servings}
                  </span>
                </div>
              )}
              {recipe.difficulty && (
                <div className="bg-pink-100 border border-pink-200 rounded-lg p-3 text-center shadow-sm">
                  <span className="block text-pink-700">Difficulty</span>
                  <span className="font-semibold text-slate-800">
                    {recipe.difficulty}
                  </span>
                </div>
              )}
            </div>

            {recipe.ingredients && recipe.ingredients.length > 0 && (
              <div className="mt-6 sm:mt-8">
                <h2 className="text-lg sm:text-xl font-bold text-slate-800 mb-2 sm:mb-3">
                  Ingredients
                </h2>
                <ul className="list-disc pl-4 sm:pl-5 space-y-1 sm:space-y-2 text-sm sm:text-base text-gray-700">
                  {recipe.ingredients.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {recipe.instructions && (
          <div className="mt-8 sm:mt-10">
            <h2 className="text-lg sm:text-xl font-bold text-slate-800 mb-2 sm:mb-3">
              Instructions
            </h2>
            <ol className="list-decimal pl-4 sm:pl-5 space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-700">
              {recipe.instructions.split("\n").map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ol>
          </div>
        )}

        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Link
            href="/recipes"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition text-sm sm:text-base text-center"
          >
            Back to recipes
          </Link>
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition text-sm sm:text-base"
          >
            {copied ? (
              <Check size={16} className="sm:w-4 sm:h-4" />
            ) : (
              <Copy size={16} className="sm:w-4 sm:h-4" />
            )}
            {copied ? "Copied!" : "Copy Link"}
          </button>
        </div>
      </section>
    </main>
  );
}
