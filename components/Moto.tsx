import Image from "next/image";

export default function Moto() {
  return (
    <section className="w-full bg-[var(--bg-secondary)] py-8 sm:py-12 md:py-16 px-4 sm:px-6">
      <div className="container mx-auto py-8 sm:py-12 md:py-16 lg:py-[10rem] flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-10 lg:gap-16">
        {/* === BAGIAN GAMBAR YANG DIPERBARUI === */}
        <div className="relative w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[300px] md:h-[300px] lg:w-[350px] lg:h-[350px] flex-shrink-0 rounded-full bg-[var(--bg-primary)] shadow-2xl overflow-hidden">
          <Image
            src="/model_farm_owner.png"
            alt="Pemilik Greenspoon"
            fill
            priority
            className="object-cover object-bottom scale-115 absolute top-auto left-0 w-full h-full"
            style={{
              transform: "translateY(0%)",
            }}
          />
        </div>
        {/* === AKHIR BAGIAN GAMBAR === */}

        {/* Konten Teks */}
        <div className="max-w-xl text-center lg:text-left text-gray-800 px-4 sm:px-0">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
            My Journey with Greenspoon
          </h2>
          <p className="text-sm sm:text-base md:text-lg leading-relaxed">
            I believe that good food starts with good soil. Through Greenspoon,
            my mission is to connect local farmers with your kitchen, bringing
            you fresh, healthy recipes inspired by generations of agricultural
            wisdom. From field to fork, I&apos;m committed to supporting
            sustainable farming and creating flavorful meals you can enjoy.
          </p>
        </div>
      </div>
    </section>
  );
}
