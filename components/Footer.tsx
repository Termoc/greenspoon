// Impor ikon yang dibutuhkan dari react-icons
import { FaInstagram, FaFacebookF } from "react-icons/fa";
import { MdEmail } from "react-icons/md"; // Untuk ikon email
import { FaXTwitter } from "react-icons/fa6"; // Untuk ikon X (sebelumnya Twitter)
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[var(--bg-secondary-darker)] py-8 sm:py-12 px-4 sm:px-6 text-[var(--color-footer-text)] bottom-0">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center lg:items-start gap-6 sm:gap-8 lg:gap-10">
        {/* Bagian Kiri: Logo dan Deskripsi */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-md">
          <div className="flex items-center mb-3 sm:mb-4">
            {/* Placeholder untuk logo Green Spoon */}
            <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--bg-primary)]">
              GREEN SPOON
            </span>
            {/* Anda bisa mengganti ini dengan komponen Image jika ada logo SVG/gambar */}
            {/* <Image src="/path/to/greenspoon-logo.svg" alt="Green Spoon Logo" width={40} height={40} className="ml-2" /> */}
          </div>
          <p className="text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 text-white">
            Green spoon is dedicated to bridging the gap between local farmers
            and your kitchen by sharing fresh, healthy, and sustainable recipes.
            We celebrate the richness of locally grown ingredients and turn them
            into meals that nourish both your body and the environment.
          </p>
          <p className="text-xs text-white">
            © 2025 Greenspoon. All rights reserved.
          </p>
        </div>

        {/* Bagian Kanan: Quick Links dan Ikon Sosial */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-[var(--bg-primary)]">
            Quick Links
          </h3>
          <ul className="space-y-1 sm:space-y-2 mb-4 sm:mb-6 text-white text-sm sm:text-base">
            <li>
              <Link
                href="/#"
                className="hover:underline text-[var(--color-footer-link)]"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/recipes"
                className="hover:underline text-[var(--color-footer-link)]"
              >
                Recipes
              </Link>
            </li>
            <li>
              <Link
                href="/#about"
                className="hover:underline text-[var(--color-footer-link)]"
              >
                About
              </Link>
            </li>
          </ul>

          {/* Ikon Sosial */}
          <div className="flex space-x-3 sm:space-x-4 text-white">
            {/* Instagram */}
            <Link
              href="#"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[var(--color-footer-icon-bg)] flex items-center justify-center hover:opacity-80 transition-opacity"
            >
              <FaInstagram className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--color-footer-text)]" />
            </Link>
            {/* Email */}
            <Link
              href="#"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[var(--color-footer-icon-bg)] flex items-center justify-center hover:opacity-80 transition-opacity"
            >
              <MdEmail className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--color-footer-text)]" />
            </Link>
            {/* X (Twitter) */}
            <Link
              href="#"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[var(--color-footer-icon-bg)] flex items-center justify-center hover:opacity-80 transition-opacity"
            >
              <FaXTwitter className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--color-footer-text)]" />
            </Link>
            {/* Facebook */}
            <Link
              href="#"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[var(--color-footer-icon-bg)] flex items-center justify-center hover:opacity-80 transition-opacity"
            >
              <FaFacebookF className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--color-footer-text)]" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
