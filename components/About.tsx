import Image from "next/image";

export default function About() {
  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center"
    >
      {/* Background Gambar + Overlay Hijau Transparan */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/model_farm_worker.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#628B32] opacity-60"></div>
      </div>

      {/* Konten */}
      <div className="relative z-10 max-w-6xl px-6 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          How It Works
        </h1>
        <p className="text-base md:text-lg mb-12 font-medium leading-relaxed">
          Discover how Greenspoon connects local farms
          <br />
          with your kitchen in 3 easy steps.
        </p>

        {/* 3 Card Langkah */}
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-6">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-tr-[15px] rounded-bl-[15px] shadow-lg flex-1">
            <div className="mb-4 flex items-center justify-center">
              <Image
                src="/icons/basket.svg"
                alt="Choose Ingredients"
                width={120}
                height={120}
              />
            </div>
            <h3 className="text-lg font-bold text-gray-700 mb-2">Choose Your Ingredients</h3>
            <p className="text-gray-700 text-sm">
              Pick fresh, local farm produce for your recipe needs.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-tr-[15px] rounded-bl-[15px] shadow-lg flex-1">
            <div className="mb-4 flex items-center justify-center">
              <Image
                src="/icons/recipe.svg"
                alt="Follow Recipes"
                width={60}
                height={60}
              />
            </div>
            <h3 className="text-lg font-bold text-gray-700 mb-2">Follow Our Recipes</h3>
            <p className="text-gray-700 text-sm">
              Use our curated farm-to-table recipes for healthy meals.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-tr-[15px] rounded-bl-[15px] shadow-lg flex-1">
            <div className="mb-4 flex items-center justify-center">
              <Image
                src="/icons/farm.svg"
                alt="Support Local Farming"
                width={90}
                height={90}
              />
            </div>
            <h3 className="text-lg font-bold text-gray-700 mb-2">Support Local Farming</h3>
            <p className="text-gray-700 text-sm">
              Every meal you cook helps strengthen local farms and empower
              communities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
