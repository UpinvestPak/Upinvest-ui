import React, { useState, useCallback, useEffect } from "react";
import { Calendar } from "lucide-react";
import { useMutation, useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { GET_AVAILABLE_INSTRUMENTS } from "@/graphql/mutations";
import {
  TradeType,
  CommissionType,
  TradeModalProps,
  TradeFormData,
  FormErrors,
  TradeTypeButtonProps,
  CommissionTypeRadioProps,
  Instrument,
} from "@/types/buyModal";
import { RootState } from "@/lib/redux/store";
import { ADD_TRANSACTION, GET_USER_PORTFOLIO } from "@/graphql/portfolio";

// Validation utility
const validateTradeForm = (formData: TradeFormData): FormErrors => {
  const errors: FormErrors = {};

  if (!formData.symbol?.trim()) {
    errors.symbol = "Symbol is required";
  }

  if (!formData.price || formData.price <= 0) {
    errors.price = "Price must be greater than 0";
  }

  if (!formData.quantity || formData.quantity <= 0) {
    errors.quantity = "Quantity must be greater than 0";
  }

  if (formData.commission < 0) {
    errors.commission = "Commission cannot be negative";
  }

  const selectedDate = new Date(formData.date);
  if (selectedDate > new Date()) {
    errors.date = "Date cannot be in future";
  }

  return errors;
};

// Trade Type Button Component
const TradeTypeButton: React.FC<TradeTypeButtonProps> = ({
  type,
  selected,
  onClick,
  disabled,
}) => (
  <button
    type="button"
    onClick={() => onClick(type)}
    disabled={disabled}
    className={`flex-1 rounded-lg px-4 py-3 text-center text-sm font-medium transition-colors ${
      selected
        ? "bg-primary text-white"
        : "border-2 border-gray-200 bg-white text-black hover:bg-gray-50"
    } ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
  >
    {type}
  </button>
);

// Commission Type Radio Component
const CommissionTypeRadio: React.FC<CommissionTypeRadioProps> = ({
  value,
  label,
  selected,
  onChange,
  disabled,
}) => (
  <label
    className={`flex items-center space-x-2 ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
  >
    <input
      type="radio"
      name="commissionType"
      value={value}
      checked={selected === value}
      onChange={() => onChange(value)}
      disabled={disabled}
      className="h-4 w-4 text-primary focus:ring-primary"
    />
    <span className="text-sm font-medium text-gray-700">{label}</span>
  </label>
);

export const BuyTradeModal: React.FC<TradeModalProps> = ({
  isOpen,
  onClose,
  portfolioId,
  onTradeComplete,
}) => {
  const dispatch = useDispatch();
  const portfolio = useSelector(
    (state: RootState) => state.portfolio.portfolio,
  );

  // Form State
  const [formData, setFormData] = useState<TradeFormData>({
    symbol: "",
    price: 0,
    quantity: 0,
    commission: 0,
    date: new Date().toISOString().split("T")[0],
    portfolioId,
    tradeType: TradeType.LONG,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [commissionType, setCommissionType] = useState<CommissionType>(
    CommissionType.FIXED,
  );

  // Apollo Queries and Mutations
  const [addTransactionMutation, { error: mutationError }] = useMutation(
    ADD_TRANSACTION,
    {
      refetchQueries: [{ query: GET_USER_PORTFOLIO }],
      onCompleted: (data) => {
        onTradeComplete?.(data.addTransaction);
        onClose();
      },
      onError: (error) => {
        setErrors((prev) => ({
          ...prev,
          submit: error.message || "Failed to add transaction",
        }));
        setIsSubmitting(false);
      },
    },
  );
  const handleDateChange = (date: Date | null) => {
    if (date) {
      setFormData((prev) => ({
        ...prev,
        date: date.toISOString().split("T")[0],
      }));
    }
  };
  const {
    data: instrumentsData,
    loading: instrumentsLoading,
    error: instrumentsError,
  } = useQuery(GET_AVAILABLE_INSTRUMENTS, {
    fetchPolicy: "cache-and-network",
  });

  // Effects
  useEffect(() => {
    if (portfolio?.id) {
      setFormData((prev) => ({
        ...prev,
        portfolioId: portfolio.id,
      }));
    }
  }, [portfolio?.id]);

  useEffect(() => {
    if (!isOpen) {
      // Reset form when modal closes
      setFormData({
        symbol: "",
        price: 0,
        quantity: 0,
        commission: 0,
        date: new Date().toISOString().split("T")[0],
        portfolioId,
        tradeType: TradeType.LONG,
      });
      setErrors({});
    }
  }, [isOpen, portfolioId]);

  // Calculations
  const calculateDeduction = useCallback((): number => {
    switch (commissionType) {
      case CommissionType.FIXED:
        return 20;
      case CommissionType.STANDARD:
        return formData.price * formData.quantity * 0.02;
      case CommissionType.CUSTOM:
        return formData.commission;
      default:
        return 0;
    }
  }, [commissionType, formData]);

  const netCost = formData.price * formData.quantity;
  const deduction = calculateDeduction();
  const totalCost = netCost + deduction;
  const pricePerShare = formData.quantity ? totalCost / formData.quantity : 0;

  // Event Handlers
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "symbol" ? value : parseFloat(value) || 0,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const validationErrors = validateTradeForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      await addTransactionMutation({
        variables: {
          input: {
            symbol: formData.symbol,
            tradeType: formData.tradeType,
            date: formData.date,
            price: formData.price,
            quantity: formData.quantity,
            portfolioId: formData.portfolioId,
          },
        },
      });
    } catch (error) {
      console.error("Transaction error:", error);
    }
  };

  if (!isOpen) return null;

  if (instrumentsLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="rounded-lg bg-white p-6">
          <p className="text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50">
      <div className="absolute inset-0" onClick={onClose} />

      <form
        onSubmit={handleSubmit}
        className="relative max-h-[93vh] w-full max-w-2xl transform overflow-y-auto rounded-2xl bg-white shadow-xl"
      >
        <div className="px-6 py-6">
          <div className="space-y-6">
            <div>
              <h3 className="mb-2 text-lg font-medium">Trade Type</h3>
              <div className="flex gap-2">
                <TradeTypeButton
                  type={TradeType.LONG}
                  selected={formData.tradeType === TradeType.LONG}
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      tradeType: TradeType.LONG,
                    }))
                  }
                  disabled={isSubmitting}
                />
                <TradeTypeButton
                  type={TradeType.SHORT}
                  selected={formData.tradeType === TradeType.SHORT}
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      tradeType: TradeType.SHORT,
                    }))
                  }
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-medium">Symbol</h3>
              <select
                name="symbol"
                value={formData.symbol}
                onChange={handleInputChange}
                disabled={isSubmitting}
                className={`w-full rounded-lg border-2 ${
                  errors.symbol ? "border-red-500" : "border-gray-200"
                } bg-white p-3`}
              >
                <option value="">Select an Instrument</option>
                {instrumentsData?.availableInstruments.map(
                  (instrument: Instrument) => (
                    <option key={instrument.id} value={instrument.symbol}>
                      {instrument.symbol} - {instrument.name}
                    </option>
                  ),
                )}
              </select>
              {errors.symbol && (
                <p className="mt-1 text-sm text-red-500">{errors.symbol}</p>
              )}
            </div>

            <div>
              <h3 className="mb-3 text-lg font-medium">Date</h3>
              <div className="relative">
                <DatePicker
                  selected={new Date(formData.date)}
                  onChange={handleDateChange}
                  disabled={isSubmitting}
                  maxDate={new Date()}
                  dateFormat="yyyy-MM-dd"
                  className="w-full rounded-lg border-2 border-gray-200 p-3 pr-10"
                  wrapperClassName="w-full"
                  customInput={
                    <input
                      type="text"
                      name="date"
                      value={formData.date}
                      className="w-full rounded-lg border-2 border-gray-200 p-3 pr-10"
                    />
                  }
                />
                <Calendar className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              </div>
              {errors.date && (
                <p className="mt-1 text-sm text-red-500">{errors.date}</p>
              )}
            </div>

            {/* Price and Quantity */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="mb-3 text-lg font-medium">Price</h3>
                <input
                  type="number"
                  name="price"
                  value={formData.price || ""}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className={`w-full rounded-lg border-2 ${
                    errors.price ? "border-red-500" : "border-gray-200"
                  } p-3`}
                  min="0"
                  step="0.01"
                />
                {errors.price && (
                  <p className="mt-1 text-sm text-red-500">{errors.price}</p>
                )}
              </div>
              <div>
                <h3 className="mb-3 text-lg font-medium">Quantity</h3>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity || ""}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className={`w-full rounded-lg border-2 ${
                    errors.quantity ? "border-red-500" : "border-gray-200"
                  } p-3`}
                  min="1"
                />
                {errors.quantity && (
                  <p className="mt-1 text-sm text-red-500">{errors.quantity}</p>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium">Commission Type</h3>
              <div className="mt-2 grid grid-cols-3 gap-4">
                <CommissionTypeRadio
                  value={CommissionType.STANDARD}
                  label="Standard"
                  selected={commissionType}
                  onChange={setCommissionType}
                  disabled={isSubmitting}
                />
                <CommissionTypeRadio
                  value={CommissionType.FIXED}
                  label="Fixed"
                  selected={commissionType}
                  onChange={setCommissionType}
                  disabled={isSubmitting}
                />
                <CommissionTypeRadio
                  value={CommissionType.CUSTOM}
                  label="Custom"
                  selected={commissionType}
                  onChange={setCommissionType}
                  disabled={isSubmitting}
                />
              </div>

              {commissionType === CommissionType.CUSTOM && (
                <div className="mt-2">
                  <input
                    type="number"
                    name="commission"
                    value={formData.commission || ""}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className={`w-full rounded-lg border-2 ${
                      errors.commission ? "border-red-500" : "border-gray-200"
                    } p-3`}
                    min="0"
                    step="0.01"
                  />
                  {errors.commission && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.commission}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Cost Summary */}
            <div className="grid grid-cols-4 gap-4 rounded-lg bg-gray-50 p-4">
              <div>
                <p className="text-sm text-gray-600">Investment</p>
                <p className="text-sm font-medium">PKR {netCost.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Commission</p>
                <p className="text-sm font-medium">
                  PKR {deduction.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Cost</p>
                <p className="text-sm font-medium">
                  PKR {totalCost.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Price/Share</p>
                <p className="text-sm font-medium">
                  PKR {pricePerShare.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 border-t border-gray-200 px-6 py-4">
          <button
            onClick={onClose}
            className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 text-center font-medium"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full rounded-lg bg-primary px-4 py-3 text-center font-medium text-white disabled:opacity-50"
          >
            {isSubmitting ? "Adding Trade..." : "Add Trade"}
          </button>
        </div>
      </form>
    </div>
  );
};
