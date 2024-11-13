import React, { useState } from "react";
import { Calendar } from "lucide-react";

interface AddDividendModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TaxTypeSelectProps {
  value: "filer" | "non-filer" | "na";
  onChange: (value: "filer" | "non-filer" | "na") => void;
}

const TaxTypeSelect: React.FC<TaxTypeSelectProps> = ({ value, onChange }) => (
  <select 
    className="w-full rounded-lg border-2 border-gray-200 p-3"
    value={value}
    onChange={(e) => onChange(e.target.value as "filer" | "non-filer" | "na")}
  >
    <option value="filer">Filer (15%)</option>
    <option value="non-filer">Non-Filer (25%)</option>
    <option value="na">N/A</option>
  </select>
);

export const AddDividendModal: React.FC<AddDividendModalProps> = ({ isOpen, onClose }) => {
  const [taxType, setTaxType] = useState<"filer" | "non-filer" | "na">("filer");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-gray-500 bg-opacity-50">
      <div className="absolute inset-0" onClick={onClose}></div>

      <div className="relative md:max-h-[100vh] max-h-[93vh] w-full max-w-2xl transform overflow-y-auto rounded-2xl bg-[#ffffff] shadow-xl scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-400 hover:scrollbar-thumb-primary">
        <div className="bg-white px-6 pb-6 pt-6">
          <div className="space-y-4">
            {/* Symbol Selection */}
            <div>
              <h3 className="mb-3 text-lg font-medium">Select Symbol</h3>
              <select className="w-full appearance-none rounded-lg border-2 border-gray-200 bg-white p-3">
                <option>Select</option>
              </select>
            </div>

            {/* Number of Shares */}
            <div>
              <h3 className="mb-3 text-lg font-medium">Number of Shares</h3>
              <input
                type="number"
                className="w-full rounded-lg border-2 border-gray-200 p-3"
                placeholder="Enter number of shares"
              />
            </div>

            {/* Dividend per Share */}
            <div>
              <h3 className="mb-3 text-lg font-medium">Dividend per Share</h3>
              <input
                type="number"
                className="w-full rounded-lg border-2 border-gray-200 p-3"
                placeholder="Enter dividend per share"
              />
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

            {/* Tax Type */}
            <div>
              <h3 className="mb-3 text-lg font-medium">Tax Type</h3>
              <TaxTypeSelect value={taxType} onChange={setTaxType} />
            </div>

            {/* Summary Box */}
            <div className="grid grid-cols-3 gap-4 rounded-lg bg-gray-50 p-3">
              <div>
                <p className="text-sm text-gray-600">Gross Dividend</p>
                <p className="text-sm font-medium">PKR 0.00</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Tax Amount</p>
                <p className="text-sm font-medium">PKR 0.00</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Net Dividend</p>
                <p className="text-sm font-medium">PKR 0.00</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 border-t border-gray-200 px-6 py-2">
          <button
            onClick={onClose}
            className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 text-center font-medium"
          >
            Cancel
          </button>
          <button className="w-full rounded-lg bg-primary px-4 py-3 text-center font-medium text-white">
            Add Dividend
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddDividendModal;