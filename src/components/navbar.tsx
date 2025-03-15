"use client";

import Link from "next/link";
import GitHubButton from "./GithubButton";
import Image from "next/image";
import { ModeToggle } from "./mode-toggle";
import { Palette } from "lucide-react";

export default function Navbar() {
  return (
    <div className="col-span-12 mb-8 rounded-lg bg-gray-200/50 dark:bg-black/30 backdrop-blur-md leading-snug py-2 flex gap-4 justify-between sticky top-2 z-50 px-2 sm:px-8">
      <div className="flex text-3xl items-center gap-4">
        <Palette className="text-primary" size={32} />
        <p className="text-lg font-bold md:text-xl lg:text-2xl hidden sm:block">
          ShadcnThemes
        </p>
      </div>
      <div className="flex items-center gap-10">
        {/* <Link
          href="/about"
          className="hover:underline hover:text-primary duration-300 transition-all md:text-lg font-semibold"
        >
          About
        </Link> */}
        <GitHubButton />
        <ModeToggle />
      </div>
    </div>
  );
}