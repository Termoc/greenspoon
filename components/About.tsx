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
      <div className="relative z-10 max-w-6xl px-4 sm:px-6 lg:px-8 text-center text-white">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 sm:mb-6">
          How It Works
        </h1>
        <p className="text-sm sm:text-base md:text-lg mb-8 sm:mb-12 font-medium leading-relaxed max-w-2xl mx-auto">
          Discover how Greenspoon connects local farms
          <br className="hidden sm:block" />
          with your kitchen in 3 easy steps.
        </p>

        {/* 3 Card Langkah */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {/* Card 1 */}
          <div className="bg-white p-4 sm:p-6 rounded-tr-[15px] rounded-bl-[15px] shadow-lg">
            <div className="mb-3 sm:mb-4 flex items-center justify-center">
              <Image
                src="/icons/basket.svg"
                alt="Choose Ingredients"
                width={80}
                height={80}
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
              />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-gray-700 mb-2">
              Choose Your Ingredients
            </h3>
            <p className="text-xs sm:text-sm text-gray-700">
              Pick fresh, local farm produce for your recipe needs.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-4 sm:p-6 rounded-tr-[15px] rounded-bl-[15px] shadow-lg">
            <div className="mb-3 sm:mb-4 flex items-center justify-center">
              <Image
                src="/icons/recipe.svg"
                alt="Follow Recipes"
                width={60}
                height={60}
                className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20"
              />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-gray-700 mb-2">
              Follow Our Recipes
            </h3>
            <p className="text-xs sm:text-sm text-gray-700">
              Use our curated farm-to-table recipes for healthy meals.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-4 sm:p-6 rounded-tr-[15px] rounded-bl-[15px] shadow-lg sm:col-span-2 lg:col-span-1">
            <div className="mb-3 sm:mb-4 flex items-center justify-center">
              <Image
                src="/icons/farm.svg"
                alt="Support Local Farming"
                width={90}
                height={90}
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
              />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-gray-700 mb-2">
              Support Local Farming
            </h3>
            <p className="text-xs sm:text-sm text-gray-700">
              Every meal you cook helps strengthen local farms and empower
              communities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
