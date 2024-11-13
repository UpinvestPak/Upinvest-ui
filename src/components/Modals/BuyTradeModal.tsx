// TradeModal.tsx
import React, { useState } from "react";
import { Calendar } from "lucide-react";

interface TradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TradeTypeButtonProps {
  type: "Long" | "Short";
  selected: boolean;
  onClick: (type: "Long" | "Short") => void;
}

interface CommissionTypeRadioProps {
  value: "fixed" | "standard" | "custom";
  label: string;
  selected: string;
  onChange: (value: "fixed" | "standard" | "custom") => void;
}

const TradeTypeButton: React.FC<TradeTypeButtonProps> = ({
  type,
  selected,
  onClick,
}) => (
  <button
    onClick={() => onClick(type)}
    className={`flex-1 rounded-lg px-4 py-3 text-center text-sm font-medium transition-colors ${
      selected
        ? "bg-primary text-white"
        : "border-2 border-gray-200 bg-white text-black"
    }`}
  >
    {type}
  </button>
);

const CommissionTypeRadio: React.FC<CommissionTypeRadioProps> = ({
  value,
  label,
  selected,
  onChange,
}) => (
  <label className="flex items-center space-x-2">
    <input
      type="radio"
      name="commissionType"
      value={value}
      checked={selected === value}
      onChange={() => onChange(value)}
      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
    />
    <span className="text-sm font-medium text-gray-700">{label}</span>
  </label>
);

export const BuyTradeModal: React.FC<TradeModalProps> = ({ isOpen, onClose }) => {
  const [tradeType, setTradeType] = useState<"Long" | "Short">("Long");
  const [commissionType, setCommissionType] = useState<"fixed" | "standard" | "custom">("fixed");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-gray-500 bg-opacity-50">
      <div className="absolute inset-0" onClick={onClose}></div>

      <div className="relative md:max-h-[98vh] max-h-[93vh] w-full max-w-2xl transform overflow-y-auto rounded-2xl bg-white shadow-xl scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-400 hover:scrollbar-thumb-primary">
        <div className="bg-white px-6 pb-6 pt-6">
          <div className="space-y-2">
            {/* Trade Type */}
            <div>
              <h3 className="mb-2 text-lg font-medium">Trade Type</h3>
              <div className="flex gap-2">
                <TradeTypeButton
                  type="Long"
                  selected={tradeType === "Long"}
                  onClick={setTradeType}
                />
                <TradeTypeButton
                  type="Short"
                  selected={tradeType === "Short"}
                  onClick={setTradeType}
                />
              </div>
            </div>

            {/* Symbol Selection */}
            <div>
              <h3 className="mb-3 text-lg font-medium">Select Symbol</h3>
              <select className="w-full appearance-none rounded-lg border-2 border-gray-200 bg-white p-3">
                <option>Select</option>
              </select>
            </div>

            {/* Date Selection */}
            <div>
              <h3 className="mb-3 text-lg font-medium">Date</h3>
              <div className="relative">
                <input
                  type="text"
                  className="w-full rounded-lg border-2 border-gray-200 p-3 pr-10"
                  value="November 8th, 2024"
                  readOnly
                />
                <Calendar className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
              </div>
            </div>

            {/* Price and Quantity */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="mb-3 text-lg font-medium">Buy Price</h3>
                <input
                  type="number"
                  className="w-full rounded-lg border-2 border-gray-200 p-3"
                  placeholder="0"
                />
              </div>
              <div>
                <h3 className="mb-3 text-lg font-medium">Shares</h3>
                <input
                  type="number"
                  className="w-full rounded-lg border-2 border-gray-200 p-3"
                  placeholder="0"
                />
              </div>
            </div>

            {/* Commission Type Radio Buttons */}
            <div>
              <h3 className=" text-lg font-medium">Deductions Type</h3>
              <div className="grid grid-cols-3 gap-4 rounded-lg border-gray-200 bg-white px-4 py-2 ">
              <CommissionTypeRadio
                  value="standard"
                  label="Standard"
                  selected={commissionType}
                  onChange={setCommissionType}
                />
                <CommissionTypeRadio
                  value="fixed"
                  label="Fixed"
                  selected={commissionType}
                  onChange={setCommissionType}
                />
               
                <CommissionTypeRadio
                  value="custom"
                  label="Custom"
                  selected={commissionType}
                  onChange={setCommissionType}
                />
              </div>
              <input
                type="number"
                className="w-full rounded-lg border-2 border-gray-200 p-3"
                placeholder="0"
              />
            </div>

            {/* Summary Box */}
            <div className="grid grid-cols-4 md:gap-4 gap-2  rounded-lg bg-gray-50 md:p-3 p-2">
              <div>
                <p className="text-sm text-gray-600">Investment</p>
                <p className="text-sm font-medium">PKR 0.00</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Deduction</p>
                <p className="text-sm font-medium">PKR 0.00</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Net Cost</p>
                <p className="text-sm font-medium">PKR 0.00</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Price/Share</p>
                <p className="text-sm font-medium">PKR 0.00</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 border-t border-gray-200 px-6 py-4">
          <button
            onClick={onClose}
            className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 text-center font-medium"
          >
            Cancel
          </button>
          <button className="w-full rounded-lg bg-primary px-4 py-3 text-center font-medium text-white">
            Add Trade
          </button>
        </div>
      </div>
    </div>
  );
};