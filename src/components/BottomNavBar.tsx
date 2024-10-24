import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

function BottomNavBar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <div className="2xsm:flex md:hidden">
      <div className="fixed bottom-0.5 left-1/2 z-50 h-18 w-full max-w-lg -translate-x-1/2 rounded-t-[2rem] border border-gray-200 bg-white dark:bg-gray-700">
        <div className="mx-auto grid h-full max-w-lg grid-cols-5">
          <Link
            href="/"
            className="group inline-flex flex-col items-center justify-center rounded-s-full px-5 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <svg
              className={`mb-1 h-7 w-7 ${isActive("/") ? "text-blue-600" : "text-gray-500"} group-hover:text-blue-600`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
            </svg>
            <span
              className={`${isActive("/") ? "text-blue-600" : "text-gray-500"} text-sm`}
            >
              Home
            </span>
          </Link>

          <Link
            href="/market"
            className="group inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <Image
              width={38}
              height={38}
              src="https://img.icons8.com/ios/50/combo-chart--v1.png"
              alt="combo-chart--v1"
              className={`${isActive("/market") ? "text-blue-600" : "text-gray-500"} group-hover:text-blue-600`}
            />
            <span
              className={`${isActive("/market") ? "text-blue-600" : "text-gray-500"} text-sm`}
            >
              Market
            </span>
          </Link>

          <Link
            href="/portfolio"
            className="group inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <Image
              width={40}
              height={40}
              src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/50/external-portfolio-advertising-kiranshastry-lineal-kiranshastry.png"
              alt="portfolio"
              className={`${isActive("/portfolio") ? "text-blue-600" : "text-gray-500"} group-hover:text-blue-600`}
            />
            <span
              className={`${isActive("/portfolio") ? "text-blue-600" : "text-gray-500"} text-sm`}
            >
              Portfolio
            </span>
          </Link>

          <Link
            href="/watch-list"
            className="group inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <Image
              width={38}
              height={38}
              src="https://img.icons8.com/external-tanah-basah-basic-outline-tanah-basah/24/external-bookmark-library-tanah-basah-basic-outline-tanah-basah.png"
              alt="bookmark"
              className={`${isActive("/watch-list") ? "text-blue-600" : "text-gray-500"} group-hover:text-blue-600`}
            />
            <span
              className={`${isActive("/watch-list") ? "text-blue-600" : "text-gray-500"} text-sm`}
            >
              Watchlist
            </span>
          </Link>

          {/* Indices Button */}
          <Link
            href="/indeces"
            className="group inline-flex flex-col items-center justify-center rounded-e-full px-5 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <Image
              width="38"
              height="38"
              src="https://img.icons8.com/ios/50/overview-pages-4.png"
              alt="overview-pages-4"
              className={`${isActive("/indeces") ? "text-blue-600" : "text-gray-500"} group-hover:text-blue-600`}
            />
            <span
              className={`${isActive("/indeces") ? "text-blue-600" : "text-gray-500"} text-sm`}
            >
              Indices
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BottomNavBar;
