import React from 'react';
import { Popover } from 'antd';
import { FiBriefcase, FiMoreVertical, FiTrash2 } from 'react-icons/fi';

interface WatchlistActionMenuProps {
  instrumentId: number;
  onRemove: (id: number) => void;
  onAddToPortfolio: (id: number) => void;
}

const WatchlistActionMenu: React.FC<WatchlistActionMenuProps> = ({
  instrumentId,
  onRemove,
  onAddToPortfolio,
}) => {
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
        onClick={() => onAddToPortfolio(instrumentId)}
        className="flex w-full items-center px-1 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        <FiBriefcase className="mr-2 h-4 w-4" />
        Add to Portfolio
      </button>
      
      
    
    </div>
  );

  return (
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
  );
};

export default WatchlistActionMenu;