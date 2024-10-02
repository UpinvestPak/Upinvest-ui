import React, { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [hideTab, setHideTab] = useState(false);
  const [activeTab, setActiveTab] = useState("All");
  const [updatedMarkets, setUpdatedMarkets] = useState(markets);


  if (!isOpen) return null;
  const tabs = ["All", "Power", "Cement", "Banking" , "IT"];



  const toggleMarketAdded = (name: string) => {
    setUpdatedMarkets((prevMarkets) =>
      prevMarkets.map((item) =>
        item.name === name ? { ...item, added: !item.added } : item
      )
    );
  };

  return (
    <div
    className="fixed inset-0 z-50 flex items-center justify-center"
    style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
  >
    <div className="w-full max-w-xl rounded-lg bg-white p-4">
      <div className="relative mb-2 flex items-center justify-center text-fullBlack">
        <h2 className="text-fullBlack text-xl font-bold">Add Markets</h2>
        <button
          onClick={onClose}
          className="text-fullBlack absolute right-0 p-2"
        >
          ✖
        </button>
      </div>

      <p className=" mb-4 text-center text-sm text-black">
        My Watchlist <span className="font-semibold">28/100</span>
      </p>

      {/* Search Bar */}
      <div className="relative mb-7">
        <input
          type="text"
          placeholder="Search assets"
          className="w-full rounded-md bg-[#f7f7f7] py-2 pl-6 pr-8 text-gray-600"
        />
        <div className="mt-4">
          {!hideTab && (
            <div className="flex md:space-x-4 space-x-2 ">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 md:px-6 py-1 md:py-2 text-sm font-medium  border-2 rounded-full  ${
                    activeTab === tab
                      ? " bg-primary  text-white"
                      : "text-black font-normal"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Market List with Scrollbar */}
      <div className="space-y-2 py-4 max-h-64 overflow-y-auto">
        {updatedMarkets.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between rounded-md bg-white p-2 hover:bg-gray-100"
          >
            {/* Image and Text */}
            <div className="flex items-start text-start space-x-0 md:space-x-1.5 ">
            <img
                src={item.icon}
                alt={item.label}
                className="h-8 w-7 rounded-full md:w-9 md:h-10"
                />
                  <div className="flex flex-col">
            <p className="text-xs font-medium leading-tight text-black md:text-base">
              {item.name}
            </p>
            <p className="text-[10px] leading-tight text-gray-500 md:text-xs md:-mt-1">
              {item.label}
            </p>
          </div>
            </div>
            {/* Add/Added Button */}
            <button
              onClick={() => toggleMarketAdded(item.name)}
              className={`flex h-9 w-9 items-center justify-center rounded-full ${
                item.added
                  ? "bg-green-500 text-white"
                  : "border border-gray-400 text-gray-500"
              }`}
            >
              {item.added ? "✔" : "+"}
            </button>
          </div>
        ))}
      </div>

      {/* Done Button */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={onClose}
          className="rounded-lg bg-primary px-6 py-2 text-white"
        >
          Done
        </button>
      </div>
    </div>
  </div>
  );
};

export default Modal;




const markets = [
  {
    name: "BTC",
    label: "Bitcoin",
    icon: "https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=025",
    added: true,
  },
  {
    name: "MATIC",
    label: "Polygon",
    icon: "https://cryptologos.cc/logos/polygon-matic-logo.png?v=025",
    added: false,
  },
  {
    name: "ETH",
    label: "Ethereum",
    icon: "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=025",
    added: false,
  },
  {
    name: "ADA",
    label: "Cardano",
    icon: "https://cryptologos.cc/logos/cardano-ada-logo.png?v=025",
    added: false,
  },
  {
    name: "MATIC",
    label: "Polygon",
    icon: "https://cryptologos.cc/logos/polygon-matic-logo.png?v=025",
    added: false,
  },
  {
    name: "XRP",
    label: "XRP",
    icon: "https://cryptologos.cc/logos/xrp-xrp-logo.png?v=025",
    added: false,
  },
  {
    name: "BNB",
    label: "Binance Coin",
    icon: "https://cryptologos.cc/logos/binance-coin-bnb-logo.png?v=025",
    added: true,
  },
  {
    name: "SOL",
    label: "Solana",
    icon: "https://cryptologos.cc/logos/solana-sol-logo.png?v=025",
    added: false,
  },
  {
    name: "DOGE",
    label: "Dogecoin",
    icon: "https://cryptologos.cc/logos/dogecoin-doge-logo.png?v=025",
    added: false,
  },
  {
    name: "DOT",
    label: "Polkadot",
    icon: "https://cryptologos.cc/logos/polkadot-new-dot-logo.png?v=025",
    added: true,
  },
  {
    name: "MATIC",
    label: "Polygon",
    icon: "https://cryptologos.cc/logos/polygon-matic-logo.png?v=025",
    added: false,
  },
];
