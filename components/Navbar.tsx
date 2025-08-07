"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top bar with logo and search */}
      <div className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
        <div className="h-3 bg-[#5C832F]"></div>
        <div
          className={`flex items-center justify-between px-6 py-2 bg-linear-to-bl from-[#BBE08F] to-transparent transition-all duration-300 ${
            scrolled ? "py-2" : "py-3"
          }`}
        >
          {/* Logo */}
          <div className="text-xl font-extrabold text-green-700 flex items-center gap-1">
            GREEN SPOON <span className="text-green-600 text-2xl">🥄</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden items-center md:flex gap-[40px] text-gray-800 font-medium">
            <Link href="/#hero">Home</Link>
            <Link href="/#recipes">Recipes</Link>
            <Link href="/#about">About</Link>
            {/* Search bar */}
            <div className="flex items-center bg-gray-100 rounded-[15px] px-3 py-1">
              <input
                type="text"
                placeholder="Search for recipes..."
                className="bg-transparent focus:outline-none text-sm px-2 py-1 w-[140px] md:w-[180px]"
              />
              <FaSearch className="text-green-600 text-sm" />
            </div>
          </div>
        </div>
      </div>

      {/* Spacer to push content below navbar */}
      <div
        className={`transition-all duration-300 ${
          scrolled ? "h-[64px]" : "h-[72px]"
        }`}
      ></div>
    </>
  );
}
