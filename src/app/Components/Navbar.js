"use client";
import React from "react";

export default function Navbar() {
  return (
    <header className="bg-zinc-900 shadow-md fixed top-0 left-0 w-full z-50">
      <div className=" w-[90%] mx-auto px-6 py-4 flex justify-between  items-center">
        <h1 className="text-2xl font-bold text-white tracking-wide cursor-pointer hover:opacity-80 transition">
          Github Explorer
        </h1>
      </div>
    </header>
  );
}
