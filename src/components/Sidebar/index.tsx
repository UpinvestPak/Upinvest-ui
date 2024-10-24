"use client";
import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SidebarLinkGroup from "./SidebarLinkGroup";
import Modal from "@/utils/modalPorfilio";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);
  let storedSidebarExpanded = "true";
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true",
  );
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen); // Toggles the dropdown open/close state
  };
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  return (
    <aside
      ref={sidebar}
      className={`w-${sidebarExpanded ? "50" : "20"}  absolute left-0 top-0  z-40 flex h-screen flex-col  bg-[#ffffff] duration-300 ease-linear  lg:static lg:translate-x-0 ${
        sidebarOpen
          ? "translate-x-0"
          : "-translate-x-full  border-r-2 border-r-primary"
      }`}
    >
      {/* SIDEBAR HEADER */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5 ">
        <Link href="/">
          <Image
            width={146}
            height={32}
            src={"/Upinvest logos.png"}
            alt="Logo"
            priority
            className={`${!sidebarExpanded ? "hidden" : "block"}`} // Hide logo when sidebar is collapsed
          />
        </Link>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block rounded-md bg-white p-2 lg:hidden" // Added background and padding for visibility
        >
          <svg
            className="fill-current text-black" // Set icon color for better visibility
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill="white"
            />
          </svg>
        </button>
      </div>

      <div className="no-scrollbar flex flex-col duration-300 ease-linear   ">
        <div className="relative mt-13 flex items-end justify-end">
          <button
            onClick={() => setSidebarExpanded(!sidebarExpanded)}
            className="absolute right-[-16px] top-1/2 z-50 hidden h-7 w-7 -translate-y-1/2 transform rounded-full border-2 border-primary bg-primary md:flex"
            style={{ overflow: "visible" }} // Ensure overflow is visible for the button
          >
            <svg
              className={`transform transition-transform ${sidebarExpanded ? "rotate-180" : ""}`} // Flip the arrow horizontally when expanded
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7" // Left to right arrow path
              />
            </svg>
          </button>
        </div>

        <nav className="mt-5 px-2 py-4 lg:mt-9 lg:px-2">
          <div>
            <ul className="mb-6 flex flex-col gap-6">
              <li>
                <Link
                  href="/portfolio"
                  onClick={toggleDropdown}
                  className={`group relative flex items-center gap-2 rounded-sm py-2 font-medium text-bodydark1 duration-300 ease-in-out  ${
                    pathname.includes("/portfolio") && "w-full "
                  }`}
                >
                  <svg
                    className="transform fill-current text-black transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
                    width="30"
                    height="30"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.10322 0.956299H2.53135C1.5751 0.956299 0.787598 1.7438 0.787598 2.70005V6.27192C0.787598 7.22817 1.5751 8.01567 2.53135 8.01567H6.10322C7.05947 8.01567 7.84697 7.22817 7.84697 6.27192V2.72817C7.8751 1.7438 7.0876 0.956299 6.10322 0.956299ZM6.60947 6.30005C6.60947 6.5813 6.38447 6.8063 6.10322 6.8063H2.53135C2.2501 6.8063 2.0251 6.5813 2.0251 6.30005V2.72817C2.0251 2.44692 2.2501 2.22192 2.53135 2.22192H6.10322C6.38447 2.22192 6.60947 2.44692 6.60947 2.72817V6.30005Z"
                      fill=""
                    />
                    <path
                      d="M15.4689 0.956299H11.8971C10.9408 0.956299 10.1533 1.7438 10.1533 2.70005V6.27192C10.1533 7.22817 10.9408 8.01567 11.8971 8.01567H15.4689C16.4252 8.01567 17.2127 7.22817 17.2127 6.27192V2.72817C17.2127 1.7438 16.4252 0.956299 15.4689 0.956299ZM15.9752 6.30005C15.9752 6.5813 15.7502 6.8063 15.4689 6.8063H11.8971C11.6158 6.8063 11.3908 6.5813 11.3908 6.30005V2.72817C11.3908 2.44692 11.6158 2.22192 11.8971 2.22192H15.4689C15.7502 2.22192 15.9752 2.44692 15.9752 2.72817V6.30005Z"
                      fill=""
                    />
                    <path
                      d="M6.10322 9.92822H2.53135C1.5751 9.92822 0.787598 10.7157 0.787598 11.672V15.2438C0.787598 16.2001 1.5751 16.9876 2.53135 16.9876H6.10322C7.05947 16.9876 7.84697 16.2001 7.84697 15.2438V11.7001C7.8751 10.7157 7.0876 9.92822 6.10322 9.92822ZM6.60947 15.272C6.60947 15.5532 6.38447 15.7782 6.10322 15.7782H2.53135C2.2501 15.7782 2.0251 15.5532 2.0251 15.272V11.7001C2.0251 11.4188 2.2501 11.1938 2.53135 11.1938H6.10322C6.38447 11.1938 6.60947 11.4188 6.60947 11.7001V15.272Z"
                      fill=""
                    />
                    <path
                      d="M15.4689 9.92822H11.8971C10.9408 9.92822 10.1533 10.7157 10.1533 11.672V15.2438C10.1533 16.2001 10.9408 16.9876 11.8971 16.9876H15.4689C16.4252 16.9876 17.2127 16.2001 17.2127 15.2438V11.7001C17.2127 10.7157 16.4252 9.92822 15.4689 9.92822ZM15.9752 15.272C15.9752 15.5532 15.7502 15.7782 15.4689 15.7782H11.8971C11.6158 15.7782 11.3908 15.5532 11.3908 15.272V11.7001C11.3908 11.4188 11.6158 11.1938 11.8971 11.1938H15.4689C15.7502 11.1938 15.9752 11.4188 15.9752 11.7001V15.272Z"
                      fill=""
                    />
                  </svg>

                  {sidebarExpanded && (
                    <span className="text-black">DashBoard</span>
                  )}
                </Link>
              </li>
              <SidebarLinkGroup
                activeCondition={pathname === "#" || pathname.includes("/port")}
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="/portfolio"
                        className={`group relative flex items-center gap-2 rounded-sm py-2 font-medium text-black duration-300 ease-in-out ${
                          (pathname === "/" || pathname.includes("/portfolio")) && ""
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="28"
                          height="28"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-shopping-bag stroke-primary-blue"
                        >
                          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                          <path d="M3 6h18"></path>
                          <path d="M16 10a4 4 0 0 1-8 0"></path>
                        </svg>
                        {sidebarExpanded && <span>My Portfolio</span>}
                      </Link>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              <li>
                <Link
                  href="/watch-list"
                  onClick={toggleDropdown} // Toggles the dropdown when clicked
                  className={`group relative flex items-center gap-2 rounded-sm py-2 font-medium 
                       text-black duration-300 ease-in-out ${
                         pathname.includes("watch-list") && "w-full  "
                       }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="29"
                    height="29"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-bookmark bg-white "
                  >
                    <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path>
                  </svg>
                  {sidebarExpanded && (
                    <span className="text-black">Watch List</span>
                  )}
                </Link>
              </li>
              <li>
                <Link
                  href="/market"
                  onClick={toggleDropdown} // Toggles the dropdown when clicked
                  className={`group relative flex items-center gap-2 rounded-sm py-2 font-medium 
                       text-black duration-300 ease-in-out ${
                         pathname.includes("indeces") && "w-full  "
                       }`}
                >
                  <Image
              width={28}
              height={28}
              src="https://img.icons8.com/ios/50/combo-chart--v1.png"
              alt="combo-chart--v1"
            />
                  {sidebarExpanded && (
                    <span className="text-black">Market</span>
                  )}
                </Link>
              </li>
              <li>
                <Link
                  href="/indeces"
                  onClick={toggleDropdown} // Toggles the dropdown when clicked
                  className={`group relative flex items-center gap-2 rounded-sm py-2 font-medium 
                       text-black duration-300 ease-in-out ${
                         pathname.includes("market") && "w-full  "
                       }`}
                >
                <Image
              width="28"
              height="28"
              src="https://img.icons8.com/ios/50/overview-pages-4.png"
              alt="overview-pages-4"
            />
                  {sidebarExpanded && (
                    <span className="text-black">indeces</span>
                  )}
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </aside>
  );
};

export default Sidebar;
