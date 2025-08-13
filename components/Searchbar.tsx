// src/components/Searchbar.tsx

"use client";

import { useState } from "react";
import { FaSearch } from "react-icons/fa";

// Tambahkan prop 'onSubmit' ke dalam interface
interface SearchbarProps {
  initialSearch?: string;
  onSubmit: (value: string) => void; // 👈 Menambahkan prop ini
}

export default function Searchbar({
  initialSearch = "",
  onSubmit,
}: SearchbarProps) {
  const [term, setTerm] = useState(initialSearch);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (term.trim()) {
      onSubmit(term.trim()); // 👈 Panggil fungsi yang datang dari parent
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center bg-gray-100 rounded-[15px] px-3 py-1"
    >
      <input
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Search for recipes..."
        className="bg-transparent focus:outline-none text-sm px-2 py-1 w-[140px] md:w-[180px]"
      />
      {/* Tombol submit untuk memastikan form dapat disubmit dengan Enter */}
      <button type="submit" className="text-green-600 text-sm cursor-pointer">
        <FaSearch />
      </button>
    </form>
  );
}
