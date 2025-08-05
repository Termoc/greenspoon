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
        <div className="absolute inset-0 bg-green-700 opacity-60"></div>
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

        <div className="flex flex-col md:flex-row justify-center items-stretch gap-6">
          <p>hqk</p>
          <p>hqk</p>
          <p>hqk</p>
        </div>
      </div>
    </section>
  );
}
