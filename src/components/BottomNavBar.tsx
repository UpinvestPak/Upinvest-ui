import React, { useState } from "react";
import Link from "next/link";

function BottomNavBar() {
  const [showSearchMenu, setShowSearchMenu] = useState(false);

  const handleSearchClick = () => {
    setShowSearchMenu(!showSearchMenu); // Toggle the menu visibility
  };

  return (
    <div className="2xsm:flex md:hidden">
      <div className="fixed z-50 w-full h-18 max-w-lg -translate-x-1/2 bg-white border border-gray-200 rounded-full left-1/2 dark:bg-gray-700 bottom-0">
        <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
          {/* Home Button */}
          <Link href="/" className="inline-flex flex-col items-center justify-center px-5 rounded-s-full hover:bg-gray-50 dark:hover:bg-gray-800 group">
            <svg
              className="w-7 h-7 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
            </svg>
            <span className="sr-only">Home</span>
          </Link>

          {/* Market Button */}
          <Link href="auth/coming-soon" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
            <img
              width={30}
              height={30}
              src="https://img.icons8.com/ios/50/combo-chart--v1.png"
              alt="combo-chart--v1"
            />
            <span className="sr-only">Market</span>
          </Link>

          {/* Watchlist Button */}
          <Link href="/watch-list" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
            <img
              width={30}
              height={30}
              src="https://img.icons8.com/external-tanah-basah-basic-outline-tanah-basah/24/external-bookmark-library-tanah-basah-basic-outline-tanah-basah.png"
              alt="bookmark"
            />
            <span className="sr-only">Watchlist</span>
          </Link>

          {/* Portfolio Button */}
          <Link href="/portfolio" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
            <img
              width={40}
              height={40}
              src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/50/external-portfolio-advertising-kiranshastry-lineal-kiranshastry.png"
              alt="portfolio"
            />
            <span className="sr-only">Portfolio</span>
          </Link>

          {/* Stocks Button */}
          <Link href="auth/coming-soon" className="inline-flex flex-col items-center justify-center px-5 rounded-e-full hover:bg-gray-50 dark:hover:bg-gray-800 group">
            <img
              width={38}
              height={38}
              src="https://img.icons8.com/pulsar-gradient/48/stocks.png"
              alt="stocks"
            />
            <span className="sr-only">Stocks</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BottomNavBar;
