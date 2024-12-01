import React, { useState } from "react";
import { Popover } from "antd";
import { FiBriefcase, FiMoreVertical, FiTrash2 } from "react-icons/fi";
import { BuyTradeModal } from "../Modals/BuyTradeModal";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";

interface WatchlistActionMenuProps {
  instrumentId: number;
  onRemove: (id: number) => void;
  onAddToPortfolio: (id: number) => void;
  symbol: string;  
  name: string;    
  portfolioId: number; // or number, depending on your type

}

const WatchlistActionMenu: React.FC<WatchlistActionMenuProps> = ({
  instrumentId,
  onRemove,
  onAddToPortfolio,
  symbol,
  name,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const portfolioId = useSelector((state: RootState) => state.watchlist.currentPortfolioId);


  const handleAddToPortfolio = () => {
    setIsModalOpen(true);
    onAddToPortfolio(instrumentId);
  };
  const content = (
    <div className="w-48 py-1">
      <button
        onClick={() => onRemove(instrumentId)}
        className="flex w-full items-center px-1 py-2 text-sm text-red-600 hover:bg-red-50"
      >
        <FiTrash2 className="mr-2 h-4 w-4" />
        Remove from Watchlist
      </button>
      <div className="my-1 h-px bg-gray-200" />
      <button
        onClick={handleAddToPortfolio}
        className="flex w-full items-center px-1 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        <FiBriefcase className="mr-2 h-4 w-4" />
        Add to Portfolio
      </button>
    </div>
  );
  return (
    <div>
      <Popover
        content={content}
        trigger="click"
        placement="bottomRight"
        overlayClassName="watchlist-actions-popover"
      >
        <button
          className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-black"
          aria-label="More options"
        >
          <FiMoreVertical size={20} />
        </button>
      </Popover>
      
      {isModalOpen && (
  <BuyTradeModal
    isOpen={isModalOpen}
    onClose={() => setIsModalOpen(false)}
    preSelectedSymbol={symbol}
    preSelectedName={name}
    portfolioId={portfolioId as number} // Explicit type assertion
    onTradeComplete={(transaction) => {
      setIsModalOpen(false);
    }}
  />
)}
    </div>
  );
};

export default WatchlistActionMenu;