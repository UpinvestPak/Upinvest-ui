import React, { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [hideTab, setHideTab] = useState(false);
  const [activeTab, setActiveTab] = useState("All");

  if (!isOpen) return null;
  const tabs = ["All", "Power", "Cement", "Banking" , "IT"];

  const markets = [
    {
      name: "BTC",
      label: "Bitcoin",
      icon: "https://img.icons8.com/color/48/nvidia.png",
      added: true,
    },
    {
      name: "ETH",
      label: "Ethereum",
      icon: "https://img.icons8.com/plasticine/100/xrp.png",
      added: false,
    },
    {
      name: "ADA",
      label: "Cardano",
      icon: "https://img.icons8.com/plasticine/100/xrp.png",
      added: false,
    },
    { name: "XRP", label: "XRP", icon: "/path-to-xrp-icon.png", added: false },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center "
      style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
    >
      <div className="w-full max-w-xl rounded-lg bg-white p-4">
        <div className="relative mb-2 flex items-center justify-center text-fullBalck">
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
            className="w-full rounded-md  bg-[#f7f7f7] py-2 pl-6 pr-8 text-gray-600"
          />
           <div className="mt-4">
            {!hideTab && (
              <div className="flex space-x-4">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`rounded-full border-2 px-5 py-2  text-sm font-medium ${
                      activeTab === tab
                        ? "border-1  bg-primary  text-white "
                        : "text-black"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            )}
          </div>
         
        </div>

        {/* Market List */}
        <div className="space-y-2 py-4">
          {markets.map((item) => (
            <div
              key={item.name}
              className="flex  items-center justify-between rounded-md bg-white p-2 hover:bg-gray-100"
            >
              {/* Image and Text */}
              <div className="flex items-center space-x-4 ">
                <img
                  src={item.icon}
                  alt={item.label}
                  className="h-10 w-10 rounded-full"
                />
                <div>
                  <div className="text-lg font-bold">{item.name}</div>
                  <div className="text-gray-500">{item.label}</div>
                </div>
              </div>
              {/* Add/Added Button */}
              <button
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
