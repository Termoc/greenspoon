// Refactored Hero.tsx from original to match UI design 100%
"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative bg-[url('/model_farm_worker.jpg')] bg-cover bg-center py-12 sm:py-16 md:py-20 lg:py-32 px-4 sm:px-6 md:px-12 lg:px-20 text-white min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] flex items-center">
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm"></div>
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div className="space-y-4 sm:space-y-6 text-center lg:text-left">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
            From <span className="text-[#6F9D39]">Farm Harvest</span> to{" "}
            <span className="text-gray-800">Flavorful Recipes</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-700 max-w-md mx-auto lg:mx-0 leading-relaxed">
            Follow easy cooking guides, create heartwarming dishes at home, and
            share the joy with your loved ones.
          </p>
          <Link
            href="#recipes"
            className="inline-block bg-[#6F9D39] text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg hover:bg-green-700 transition text-sm sm:text-base"
          >
            See Recipes
          </Link>
        </div>

        <div className="hidden lg:block">
          <Image
            src="/mix_salad.png"
            alt="Mix Salad"
            width={619}
            height={619}
            className="rounded-full w-full max-w-md lg:max-w-lg xl:max-w-xl"
          />
        </div>
      </div>
    </section>
  );
}
