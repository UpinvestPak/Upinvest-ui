
"use client"
import React, { useState, useRef, useEffect } from "react";
import { Plus, BarChart3, ArrowLeftRight, Coins, Settings, X } from "lucide-react";
import { BuyTradeModal } from "../Modals/BuyTradeModal";
import AddDividendModal from "../Modals/AddDividendModal";
import { useQuery } from "@apollo/client";
import { GET_USER_PORTFOLIO } from "@/graphql/portfolio";


interface MenuItem {
  [x: string]: any;
  icon: React.ReactNode;
  label: string;
  color: string;
  bgColor: string;
  
}

const AddPortfolio = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [buyModalOpen, setBuyModalOpen] = useState(false);
  const [dividendModalOpen, setDividendModalOpen] = useState(false);

  const [selectedAction, setSelectedAction] = useState<MenuItem | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const { data: portfolioData } = useQuery(GET_USER_PORTFOLIO);


  const menuItems: MenuItem[] = [
    {
      icon: <BarChart3 className="h-5 w-5" />,
      label: "New Buy Trade",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: <ArrowLeftRight className="h-5 w-5" />,
      label: "New Sell Trade",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      icon: <Coins className="h-5 w-5" />,
      label: "Add a Dividend",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleActionClick = (item: MenuItem) => {
    setSelectedAction(item);
    if (item.label === "Add a Dividend") {
      setDividendModalOpen(true);
    } else if (item.label === "New Buy Trade" || item.label === "New Sell Trade") {
      setBuyModalOpen(true);
    }

    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <div>
      {/* Desktop View */}
      <div className="mt-2 hidden space-y-4 md:block">
        <div className="flex items-center justify-end gap-2 pr-3">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 rounded-lg border-2 border-blue-600 bg-white px-6 py-2.5 text-blue-600 shadow-sm transition-all duration-200 hover:bg-blue-600 hover:text-white"
            >
              <Plus className="h-4 w-4" />
              Add New
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 z-40 mt-2 w-56 rounded-xl border border-gray-100 bg-white shadow-xl">
                <div className="py-2">
                  {menuItems.map((item, index) => (
                    <button
                      key={index}
                      className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-gray-50"
                      onClick={() => handleActionClick(item)}
                    >
                      <span className={item.color}>{item.icon}</span>
                      <span className="font-medium">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <button className="rounded-full p-2 hover:bg-gray-50">
            <Settings className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Mobile Floating Action Button */}
    

      <div className="fixed bottom-24 right-6 z-50 md:hidden">
        <div className="relative">
          {/* Mobile Menu Items */}
          {isMobileMenuOpen && (
            <div className="absolute bottom-16 right-0 flex flex-col  gap-3">
              {menuItems.map((item, index) => (
                <div key={index} className="flex items-center justify-end gap-3"
                onClick={() => handleActionClick(item)}
>
                  {/* Text Label */}
                  <div className="rounded-lg bg-primary text-white  px-3 py-2 shadow-lg text-nowrap">
                    <span className="text-sm font-medium text-white text-nowrap">
                      {item.label}
                    </span>
                  </div>
                  
                  {/* Action Button */}
                  <button
                    onClick={() => handleActionClick(item)}
                    className={`group flex h-14 w-14 items-center text-nowrap justify-center rounded-full border border-gray-100 shadow-lg transition-all duration-200 ${item.bgColor} ${item.hoverBg}`}
                  >
                    <span className={`${item.color} transition-transform duration-200 group-hover:scale-110`}>
                      {item.icon}
                    </span>
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Main FAB Button with improved shadow and animation */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-xl transition-all duration-50 hover:bg-blue-700 hover:shadow-blue-200"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 transition-transform duration-1000 hover:rotate-90" />
            ) : (
              <Plus className="h-6 w-6 transition-transform duration-1000 hover:rotate-90" />
            )}
          </button>
        </div>
      </div>

      <BuyTradeModal
        isOpen={buyModalOpen}
        onClose={() => setBuyModalOpen(false)}
        portfolioId={portfolioData?.getUserPortfolio?.id}



      /> 
      <AddDividendModal
      isOpen={dividendModalOpen}
      onClose={() => setDividendModalOpen(false)}
      />
      </div>
  );
};

export default AddPortfolio;