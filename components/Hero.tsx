// Refactored Hero.tsx from original to match UI design 100%
"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative bg-[url('/model_farm_worker.jpg')] bg-cover bg-center py-20 md:py-32 px-4 md:px-20 text-white">
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm"></div>
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            From <span className="text-[#6F9D39]">Farm Harvest</span> to <br />
            <span className="text-gray-800">Flavorful Recipes</span>
          </h1>
          <p className="text-gray-700 max-w-md">
            Follow easy cooking guides, create heartwarming dishes at home, and
            share the joy with your loved ones.
          </p>
          <Link
            href="#recipes"
            className="inline-block bg-[#6F9D39] text-white font-semibold py-3 px-6 rounded hover:bg-green-700 transition"
          >
            See Recipes
          </Link>
        </div>

        <div className="hidden md:block">
          <Image
            src="/mix_salad.png"
            alt="Mix Salad"
            width={619}
            height={619}
            className="rounded-full"
          />
        </div>
      </div>
    </section>
  );
}
