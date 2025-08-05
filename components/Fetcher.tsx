// lib/fetcher.ts
export interface Recipe {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strInstructions: string;
  strMealThumb: string;
  strYoutube: string;
}

const MEALDB_BASE_URL = "https://www.themealdb.com/api/json/v1/1/";

export async function fetchBySearch(term: string): Promise<Recipe[]> {
  const url = `${MEALDB_BASE_URL}search.php?s=${term}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  const data = await response.json();
  return data.meals || [];
}

export async function fetchByCategory(category: string): Promise<Recipe[]> {
  const url = `${MEALDB_BASE_URL}filter.php?c=${category}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  const data = await response.json();
  return data.meals || [];
}

export async function fetchAllAlphabetically(): Promise<Recipe[]> {
  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
  const fetches = alphabet.map(async (letter) => {
    const url = `${MEALDB_BASE_URL}search.php?f=${letter}`;
    try {
      const response = await fetch(url);
      if (!response.ok) return [];
      const data = await response.json();
      return data.meals || [];
    } catch {
      return [];
    }
  });

  const allResults = await Promise.all(fetches);
  const unique = new Map<string, Recipe>();
  allResults.flat().forEach((meal: Recipe) => {
    unique.set(meal.idMeal, meal);
  });
  return Array.from(unique.values());
}
