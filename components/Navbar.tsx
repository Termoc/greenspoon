"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

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
      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
        {/* Bar hijau atas */}
        <div
          className={`bg-[var(--bg-primary-darker)] w-full transition-all duration-300 ${
            scrolled ? "h-0 opacity-0" : "h-7 opacity-100"
          }`}
        ></div>

        {/* Main navbar */}
        <div
          className={`flex justify-around items-center bg-[var(--bg-primary)] transition-all duration-300 ${
            scrolled ? "py-2 text-base" : "py-4 text-lg"
          }`}
        >
          <div className="font-bold">Green Spoon</div>
          <div className="flex gap-5">
            <Link href="/#hero">Home</Link>
            <Link href="/#recipes">Recipes</Link>
            <Link href="/#about">About</Link>
          </div>
        </div>
      </div>

      {/* Spacer untuk mendorong konten ke bawah */}
      <div
        className={`transition-all duration-300 ${
          scrolled ? "h-[56px]" : "h-[88px]"
        }`}
      ></div>
    </>
  );
}
