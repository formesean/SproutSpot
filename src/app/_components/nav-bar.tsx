"use client";

import { Button } from "~/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState } from "react";

interface NavBarProps {
  session: any;
}

export default function NavBar({ session }: NavBarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="container mx-auto px-6 py-8">
      <nav className="flex items-center justify-between">
        {/* Logo and Brand Name */}
        <div className="flex items-center space-x-2">
          <Image
            src={"/icon.svg"}
            height={32}
            width={32}
            alt="SproutSpot logo"
          />
          <span className="text-2xl font-bold text-green-800">SproutSpot</span>
        </div>

        {/* Hamburger Menu Icon (Visible on Mobile) */}
        <div className="sm:hidden">
          <button
            onClick={toggleMenu}
            className="text-green-800 focus:outline-none"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Navigation Links (Hidden on Mobile, Visible on Desktop) */}
        <div
          className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-green-50 transition-transform duration-300 sm:static sm:flex sm:translate-x-0 sm:flex-row sm:space-x-4 sm:bg-transparent sm:transition-none ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } sm:translate-x-0`}
        >
          {/* Close Button (Visible on Mobile) */}
          <button
            onClick={toggleMenu}
            className="absolute right-4 top-4 text-green-800 focus:outline-none sm:hidden"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Navigation Links */}
          <div className="flex flex-col items-center space-y-6 sm:flex-row sm:space-x-4 sm:space-y-0">
            <a href="#features">
              <Button
                variant="ghost"
                className="text-green-700 hover:bg-green-100 hover:text-green-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Button>
            </a>
            <a href="#about">
              <Button
                variant="ghost"
                className="text-green-700 hover:bg-green-100 hover:text-green-800"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Button>
            </a>
            <Link
              href={
                session
                  ? "/api/auth/signout"
                  : `/api/auth/signin?callbackUrl=/farm`
              }
            >
              <Button
                variant="outline"
                className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                {session ? "Sign out" : "Sign in"}
              </Button>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
