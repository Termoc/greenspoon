"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Searchbar from "@/components/Searchbar";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMobileSearch = (value: string) => {
    router.push(`/recipes?s=${encodeURIComponent(value)}`);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top bar with logo and search */}
      <div className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
        <div className="h-3 bg-[#5C832F]"></div>
        <div
          className={`flex items-center justify-between px-4 sm:px-6 py-2 bg-linear-to-bl from-[#BBE08F] to-transparent transition-all duration-300 ${
            scrolled ? "py-2" : "py-3"
          }`}
        >
          {/* Logo */}
          <div className="text-xl font-extrabold text-green-700 flex items-center gap-1">
            <Image
              src="/icons/Logo.svg"
              alt="Green Spoon Logo"
              width={120}
              height={120}
              className="w-24 sm:w-32 md:w-36"
            />
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden items-center md:flex gap-6 lg:gap-8 xl:gap-[40px] text-gray-800 font-medium">
            <Link href="/#" className="hover:text-green-700 transition">Home</Link>
            <Link href="/recipes" className="hover:text-green-700 transition">Recipes</Link>
            <Link href="/#about" className="hover:text-green-700 transition">About</Link>
            {/* Search bar */}
            <Searchbar
              onSubmit={(value) => {
                router.push(`/recipes?s=${encodeURIComponent(value)}`);
              }}
            />
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 text-gray-800 hover:text-green-700 transition"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white shadow-lg border-t border-gray-200">
            <div className="px-4 py-4 space-y-4">
              <Link 
                href="/#" 
                className="block text-gray-800 hover:text-green-700 transition py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/recipes" 
                className="block text-gray-800 hover:text-green-700 transition py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Recipes
              </Link>
              <Link 
                href="/#about" 
                className="block text-gray-800 hover:text-green-700 transition py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <div className="pt-2">
                <Searchbar onSubmit={handleMobileSearch} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Spacer to push content below navbar */}
      <div
        className={`transition-all duration-300 ${
          scrolled ? "h-[64px]" : mobileMenuOpen ? "h-[200px]" : "h-[72px]"
        }`}
      ></div>
    </>
  );
}
