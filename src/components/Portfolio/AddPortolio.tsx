"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Plus,
  BarChart3,
  ArrowLeftRight,
  Coins,
  Settings,

} from "lucide-react";
import { BuyTradeModal } from "../Modals/BuyTradeModal";

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  color: string;
}

interface TradeTypeButtonProps {
  type: "Long" | "Short";
  selected: boolean;
}

interface CommissionTypeRadioProps {
  value: "fixed" | "standard" | "custom";
  label: string;
}

export default function AddPortfolio(): JSX.Element {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedAction, setSelectedAction] = useState<MenuItem | null>(null);

  const [commissionType, setCommissionType] = useState<
    "fixed" | "standard" | "custom"
  >("fixed");
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const menuItems: MenuItem[] = [
    {
      icon: <BarChart3 className="h-5 w-5" />,
      label: "New Buy Trade",
      color: "text-blue-600",
    },
    {
      icon: <ArrowLeftRight className="h-5 w-5" />,
      label: "New Sell Trade",
      color: "text-green-600",
    },
    {
      icon: <Coins className="h-5 w-5" />,
      label: "Add a Dividend",
      color: "text-yellow-600",
    },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleActionClick = (item: MenuItem): void => {
    setSelectedAction(item);
    setIsModalOpen(true);
    setIsDropdownOpen(false);
  };

  return (
    <div>
      <div className="mt-2 space-y-4">
        <div className="flex items-center justify-end gap-2 pr-3">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="hidden items-center gap-2 rounded-lg border-2 border-blue-600 bg-white px-6 py-2.5 text-blue-600 shadow-sm transition-all duration-200 hover:bg-blue-600 hover:text-white md:flex"
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
          <button className="hidden rounded-full p-2 hover:bg-gray-50 md:flex">
            <Settings className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      <BuyTradeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
