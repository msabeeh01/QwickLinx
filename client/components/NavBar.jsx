"use client";
// crreate a navbar with nextjs and tailwindcss

import Link from "next/link";
import { useState } from "react";
const NavBar = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div>
              <Link
                className="text-2xl font-bold text-gray-800 dark:text-white lg:text-3xl hover:text-gray-700 dark:hover:text-gray-300"
                href="/"
              >
                QwickLinx
              </Link>
            </div>

            <div className="hidden md:flex items-center -mx-2">
              <Link
                className="mx-2 text-gray-700 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400"
                href="/about"
              >
                About
              </Link>
              <Link
                className="mx-2 text-gray-700 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400"
                href="/contact"
              >
                Contact
              </Link>
            </div>

            <div className="md:hidden flex items-center -mx-2">
              {/* <!-- Mobile menu button */}
              <button className="focus:outline-none" onClick={() => setShowMenu(!showMenu)}>
                <svg
                  className="w-6 h-6 text-gray-500 dark:text-gray-200"
                  x-show="!showMenu"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>

                {/* <svg
                  className="w-6 h-6 text-gray-500 dark:text-gray-200"
                  x-show="showMenu"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12"></path>
                </svg> */}
              </button>
            </div>
          </div>
        </div>

        {/* <!-- Mobile Menu open: "block", Menu closed: "hidden" --> */}
        <div className={`${showMenu ? "block" : "hidden"} md:hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              className="block text-gray-700 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400"
              href="/about"
            >
              About
            </Link>
            <Link
              className="block text-gray-700 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400"
              href="/contact"
            >
              Contact
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
