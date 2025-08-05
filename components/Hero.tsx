import Link from "next/link";

export default function Hero() {
  return (
    <div
      id="hero"
      className="grid grid-cols-2 h-screen bg-amber-500 items-center"
    >
      {/* Kiri: Teks */}
      <div className="flex flex-col justify-center text-left px-16 gap-6">
        <h1 className="text-5xl font-bold">
          From <span className="text-green-700">Farm Harvest</span> to Flavorful
          Recipes
        </h1>
        <h1 className="text-2xl font-semibold">
          Follow easy cooking guides, create heartwarming dishes at home, and
          share the joy with your loved ones.
        </h1>
        <button className="bg-[var(--bg-primary)] text-white py-5 px-8 max-w-45 rounded-3xl text-xl font-bold hover:bg-[var(--bg-primary-darker)] hover:cursor-pointer transition">
          <Link href="/#recipes">See Recipes</Link>
        </button>
      </div>

      {/* Kanan: Gambar */}
      <div className="flex justify-center">
        <h1>GAMBAR</h1>
      </div>
    </div>
  );
}
