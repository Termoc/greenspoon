"use client";

import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface SearchbarProps {
  initialSearch?: string;
  onSubmit: (value: string) => void;
}

export default function Searchbar({
  initialSearch = "",
  onSubmit,
}: SearchbarProps) {
  const [term, setTerm] = useState(initialSearch);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(term);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const value = e.currentTarget.search.value.trim();
        if (value) {
          router.push(`/recipe?s=${encodeURIComponent(value)}`);
        }
      }}
      className="flex items-center bg-gray-100 rounded-[15px] px-3 py-1"
    >
      <input
        name="search"
        type="text"
        placeholder="Search for recipes..."
        className="bg-transparent focus:outline-none text-sm px-2 py-1 w-[140px] md:w-[180px]"
      />
      <FaSearch
        className="text-green-600 text-sm cursor-pointer"
        onClick={(e) => {
          const form = e.currentTarget.closest("form") as HTMLFormElement;
          form?.requestSubmit(); // Trigger submit kalau ikon diklik
        }}
      />
    </form>
  );
}
