import Image from "next/image";
import recipesData from "@/public/data/recipes.json";
import Link from "next/link";

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

export default function RecipeDetailPage({ params }: { params: { id: string } }) {
	const recipe: Recipe | undefined = (recipesData as Recipe[]).find(
		(r) => r.id === params.id
	);

	if (!recipe) {
		return (
			<main className="max-w-5xl mx-auto px-6 py-12">
				<h1 className="text-2xl font-bold text-red-600">Recipe not found</h1>
				<p className="mt-2 text-gray-600">We couldn't find the recipe you were looking for.</p>
				<Link href="/menu" className="inline-block mt-6 text-green-700 hover:underline">Back to menu</Link>
			</main>
		);
	}

	return (
		<main className="bg-white">
			<section className="max-w-6xl mx-auto px-6 py-10">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
					<div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow">
						<Image src={recipe.image} alt={recipe.name} fill className="object-cover" />
					</div>

					<div>
						<h1 className="text-3xl md:text-4xl font-extrabold text-slate-800">{recipe.name}</h1>
						<div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm text-gray-700">
							{recipe.prepTime && (
								<div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
									<span className="block text-gray-500">Prep</span>
									<span className="font-semibold">{recipe.prepTime}</span>
								</div>
							)}
							{recipe.cookTime && (
								<div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
									<span className="block text-gray-500">Cook</span>
									<span className="font-semibold">{recipe.cookTime}</span>
								</div>
							)}
							{typeof recipe.servings === "number" && (
								<div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
									<span className="block text-gray-500">Servings</span>
									<span className="font-semibold">{recipe.servings}</span>
								</div>
							)}
							{recipe.difficulty && (
								<div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
									<span className="block text-gray-500">Difficulty</span>
									<span className="font-semibold">{recipe.difficulty}</span>
								</div>
							)}
						</div>

						{recipe.ingredients && recipe.ingredients.length > 0 && (
							<div className="mt-8">
								<h2 className="text-xl font-bold text-slate-800 mb-3">Ingredients</h2>
								<ul className="list-disc pl-5 space-y-2 text-gray-700">
									{recipe.ingredients.map((item, idx) => (
										<li key={idx}>{item}</li>
									))}
								</ul>
							</div>
						)}
					</div>
				</div>

				{recipe.instructions && (
					<div className="mt-10">
						<h2 className="text-xl font-bold text-slate-800 mb-3">Instructions</h2>
						<ol className="list-decimal pl-5 space-y-3 text-gray-700">
							{recipe.instructions.split("\n").map((step, idx) => (
								<li key={idx}>{step}</li>
							))}
						</ol>
					</div>
				)}

				<div className="mt-10">
					<Link href="/menu" className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition">
						Back to menu
					</Link>
				</div>
			</section>
		</main>
	);
} 