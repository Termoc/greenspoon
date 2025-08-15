"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Searchbar from "@/components/Searchbar";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

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
            <Image
              src="/icons/Logo.svg"
              alt="Green Spoon Logo"
              width={150}
              height={150}
            />
          </div>

          {/* Navigation Links */}
          <div className="hidden items-center md:flex gap-[40px] text-gray-800 font-medium">
            <Link href="/#">Home</Link>
            <Link href="/menu">Menu</Link>
            <Link href="/#about">About</Link>
            {/* Search bar */}
            <Searchbar
              onSubmit={(value) => {
                router.push(`/menu?s=${encodeURIComponent(value)}`);
              }}
            />
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
