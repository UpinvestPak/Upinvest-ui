"use client";

import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Search, X, Plus, Check } from "lucide-react";
import { useWatchlist } from "@/hooks/useWatchlist";
import { Instrument } from "@/types/watchList";
import { GET_AVAILABLE_INSTRUMENTS } from "@/graphql/mutations";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { addToWatchlist } from "@/lib/redux/features/watchList/watchlistSlice";
import { useApolloClient } from '@apollo/client';


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WatchlistModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedStocks, setSelectedStocks] = useState<Set<number>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();  // Properly typed dispatch
  const client = useApolloClient();


  // Get the current state of adding instruments
  const isAddingInstrument = useSelector(
    (state: RootState) => state.watchlist.isAddingInstrument
  );

  const {
    data,
    loading: instrumentsLoading,
    error: instrumentsError,
    refetch,
  } = useQuery<{ availableInstruments: Instrument[] }>(
    GET_AVAILABLE_INSTRUMENTS,
    {
      fetchPolicy: "network-only",
      skip: !isOpen,
      context: {
        headers: {
          'Cache-Control': 'no-cache',
        }
    }
  }
  );

  useEffect(() => {
    if (isOpen) {
      refetch();
      setSelectedStocks(new Set());
      setError(null);
    }
  }, [isOpen, refetch]);

  const filteredInstruments = React.useMemo(() => {
    if (!data?.availableInstruments) return [];

    return data.availableInstruments.filter((instrument) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        instrument.symbol.toLowerCase().includes(searchLower) ||
        instrument.name.toLowerCase().includes(searchLower)
      );
    });
  }, [data?.availableInstruments, searchTerm]);

  const toggleStock = (instrumentId: number) => {
    setSelectedStocks((prev) => {
      const next = new Set(prev);
      if (next.has(instrumentId)) {
        next.delete(instrumentId);
      } else {
        next.add(instrumentId);
      }
      return next;
    });
  };

  const handleDone = async () => {
    if (selectedStocks.size === 0) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const selectedStocksArray = Array.from(selectedStocks);
      const promises = selectedStocksArray.map((instrumentId) =>
        dispatch(addToWatchlist(instrumentId)).unwrap()
      );

      await Promise.all(promises);
      
      // Refetch available instruments and watchlist after adding
      await Promise.all([
        refetch(),
        client.refetchQueries({
          include: ['GetWatchList'],
        }),
      ]);

      onClose();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to add stocks to watchlist"
      );
      // If unauthorized, handle the error
      if (err instanceof Error && 
          (err.message.includes('Unauthorized') || err.message.includes('jwt'))) {
        // Handle unauthorized error
        window.location.href = '/auth/signin';
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  if (instrumentsLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
        <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl">
          <div className="flex items-center justify-center py-8">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl">
        {/* Header */}
        <div className="relative mb-6">
          <h2 className="text-center text-2xl font-bold text-gray-900">
            Add Stocks
          </h2>
          <button
            onClick={onClose}
            className="absolute right-0 top-0 rounded-full p-2 text-gray-500 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="mt-2 text-center">
            <p className="text-sm text-gray-600">
              Selected Stocks{" "}
              <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-sm font-medium text-primary">
                {selectedStocks.size}/{data?.availableInstruments.length || 0}
              </span>
            </p>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-500">
            {error}
          </div>
        )}

        {/* Search Bar */}
        <div className="relative mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search stocks by name or symbol"
              className="w-full rounded-lg border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        {/* Instruments List */}
        <div className="custom-scrollbar max-h-[400px] space-y-2 overflow-y-auto rounded-lg bg-gray-50 p-4">
          {filteredInstruments.length === 0 ? (
            <div className="text-center text-gray-500">
              {searchTerm
                ? "No matching instruments found"
                : "No instruments available"}
            </div>
          ) : (
            filteredInstruments.map((instrument) => (
              <div
                key={instrument.id}
                className="flex items-center justify-between rounded-lg bg-white p-3 shadow-sm transition-all duration-200 hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                    <div className="flex h-full w-full items-center justify-center text-xl font-bold text-gray-400">
                      {instrument.symbol.charAt(0)}
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {instrument.symbol}
                    </p>
                    <p className="text-sm text-gray-500">{instrument.name}</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleStock(instrument.id)}
                  disabled={isAddingInstrument[instrument.id]}
                  className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 ${
                    selectedStocks.has(instrument.id)
                      ? "bg-green-500 text-white shadow-lg shadow-green-500/30"
                      : "border-2 border-gray-200 text-gray-400 hover:border-primary hover:text-primary"
                  } ${isAddingInstrument[instrument.id] ? "opacity-50" : ""}`}
                >
                  {selectedStocks.has(instrument.id) ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <Plus className="h-5 w-5" />
                  )}
                </button>
              </div>
            ))
          )}
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={handleDone}
            disabled={isSubmitting || selectedStocks.size === 0}
            className="rounded-lg bg-primary px-8 py-3 font-medium text-white shadow-lg shadow-primary/30 transition-all duration-200 hover:bg-primary/90 disabled:opacity-50"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                Updating...
              </div>
            ) : (
              "Done"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WatchlistModal;