import Image from "next/image";

export default function Moto() {
  return (
    <section className="w-full bg-[var(--bg-secondary)] py-16 px-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16">
        {/* === BAGIAN GAMBAR YANG DIPERBARUI === */}
        <div className="relative w-[300px] h-[300px] md:w-[350px] md:h-[350px] flex-shrink-0 rounded-full bg-[var(--bg-primary)] shadow-2xl overflow-hidden">
          <Image
            src="/model_farm_owner.png"
            alt="Pemilik Greenspoon"
            fill
            priority
            // 'object-cover' tetap digunakan untuk menutupi area.
            // 'object-bottom' akan memposisikan gambar sehingga bagian bawahnya menyentuh batas bawah wadah.
            // 'scale-115' mungkin perlu disesuaikan; kita perkecil sedikit dari sebelumnya.
            // 'top-auto' akan menetralkan pengaturan 'top' sebelumnya.
            className="object-cover object-bottom scale-115 absolute top-auto left-0 w-full h-full"
            style={{
              // Anda mungkin perlu menambahkan sedikit 'transform: translateY(5%)' atau nilai positif kecil lainnya
              // jika 'object-bottom' saja belum sepenuhnya menempel di batas bawah karena perspektif gambar.
              transform: "translateY(0%)", // Reset transformasi vertikal sebelumnya
            }}
          />
        </div>
        {/* === AKHIR BAGIAN GAMBAR === */}

        {/* Konten Teks */}
        <div className="max-w-xl text-center md:text-left text-gray-800">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            My Journey with Greenspoon
          </h2>
          <p className="text-base md:text-lg leading-relaxed">
            I believe that good food starts with good soil. Through Greenspoon,
            my mission is to connect local farmers with your kitchen, bringing
            you fresh, healthy recipes inspired by generations of agricultural
            wisdom. From field to fork, I’m committed to supporting sustainable
            farming and creating flavorful meals you can enjoy.
          </p>
        </div>
      </div>
    </section>
  );
}
