"use client";

import React, { useState, useEffect } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useAuth } from "@/contexts/AuthContext";
import { Search, X, Plus, Check } from "lucide-react";

// TypeScript interfaces with strict null checks
interface Instrument {
  id: number;
  symbol: string;
  name: string;
}

interface WatchList {
  id: number;
  symbols: Instrument[];
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface GetInstrumentsResponse {
  availableInstruments: Instrument[];
}

interface GetWatchListResponse {
  watchList: WatchList | null;
}

// GraphQL Queries with proper null handling
const GET_INSTRUMENTS = gql`
  query GetInstruments {
    availableInstruments {
      id
      symbol
      name
    }
  }
`;

const GET_WATCHLIST = gql`
  query GetWatchList {
    watchList {
      id
      symbols {
        id
        symbol
        name
      }
    }
  }
`;

const ADD_TO_WATCHLIST = gql`
  mutation AddSingleToWatchList($input: WatchListInput!) {
    addSingleToWatchList(input: $input) {
      id
      symbol
      name
    }
  }
`;

const REMOVE_FROM_WATCHLIST = gql`
  mutation RemoveFromWatchList($input: WatchListInput!) {
    removeFromWatchList(input: $input) {
      id
      symbol
      name
    }
  }
`;

const WatchlistModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const { logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedStocks, setSelectedStocks] = useState<Set<number>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Query for all instruments with proper error handling and skip option
  const {
    data: instrumentsData,
    loading: instrumentsLoading,
    error: instrumentsError,
    refetch: refetchInstruments
  } = useQuery<GetInstrumentsResponse>(GET_INSTRUMENTS, {
    skip: !isOpen, // Skip query when modal is closed
    fetchPolicy: 'network-only',
    onError: (error) => {
      console.error("Instruments query error:", error);
      setError("Failed to load instruments");
      if (error.message.includes("Unauthorized")) {
        logout();
      }
    },
  });

  // Query for watchlist with proper error handling and skip option
  const {
    data: watchlistData,
    loading: watchlistLoading,
    error: watchlistError,
    refetch: refetchWatchlist
  } = useQuery<GetWatchListResponse>(GET_WATCHLIST, {
    skip: !isOpen, // Skip query when modal is closed
    fetchPolicy: 'network-only',
    onError: (error) => {
      console.error("Watchlist query error:", error);
      setError("Failed to load watchlist");
      if (error.message.includes("Unauthorized")) {
        logout();
      }
    },
  });

  // Mutations
  const [addToWatchlist] = useMutation(ADD_TO_WATCHLIST, {
    onError: (error) => {
      console.error("Add to watchlist error:", error);
      setError("Failed to add to watchlist");
      if (error.message.includes("Unauthorized")) {
        logout();
      }
    },
  });

  const [removeFromWatchlist] = useMutation(REMOVE_FROM_WATCHLIST, {
    onError: (error) => {
      console.error("Remove from watchlist error:", error);
      setError("Failed to remove from watchlist");
      if (error.message.includes("Unauthorized")) {
        logout();
      }
    },
  });

  // Reset state when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setSelectedStocks(new Set());
      setSearchTerm("");
      setError(null);
    }
  }, [isOpen]);

  // Initialize selected stocks from watchlist with proper null checks
  useEffect(() => {
    if (watchlistData?.watchList?.symbols) {
      try {
        const watchlistIds = new Set(
          watchlistData.watchList.symbols
            .filter((symbol): symbol is Instrument => 
              symbol != null && typeof symbol.id === 'number'
            )
            .map(symbol => symbol.id)
        );
        setSelectedStocks(watchlistIds);
      } catch (error) {
        console.error("Error setting selected stocks:", error);
        setError("Error initializing selected stocks");
      }
    }
  }, [watchlistData]);

  if (!isOpen) return null;

  // Safely get watchlist symbols with null checks
  const watchlistSymbols = watchlistData?.watchList?.symbols?.filter(
    (symbol): symbol is Instrument => symbol != null
  ) || [];

  // Safely get instruments with null checks
  const instruments = instrumentsData?.availableInstruments?.filter(
    (instrument): instrument is Instrument => 
      instrument != null && 
      typeof instrument.id === 'number' &&
      typeof instrument.symbol === 'string' &&
      typeof instrument.name === 'string'
  ) || [];

  const isInWatchlist = (instrumentId: number): boolean => {
    return selectedStocks.has(instrumentId);
  };

  const toggleStock = async (instrumentId: number) => {
    try {
      setSelectedStocks(prev => {
        const newSelected = new Set(prev);
        if (newSelected.has(instrumentId)) {
          newSelected.delete(instrumentId);
        } else {
          newSelected.add(instrumentId);
        }
        return newSelected;
      });
    } catch (error) {
      console.error("Error toggling stock:", error);
      setError("Failed to toggle stock selection");
    }
  };

  const handleDone = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      const currentWatchlistIds = new Set(
        watchlistSymbols
          .filter((symbol): symbol is Instrument => 
            symbol != null && typeof symbol.id === 'number'
          )
          .map(symbol => symbol.id)
      );

      const stocksToAdd = Array.from(selectedStocks)
        .filter(id => !currentWatchlistIds.has(id));
      const stocksToRemove = Array.from(currentWatchlistIds)
        .filter(id => !selectedStocks.has(id));

      // Process additions
      for (const instrumentId of stocksToAdd) {
        await addToWatchlist({
          variables: {
            input: { instrumentId }
          }
        });
      }

      // Process removals
      for (const instrumentId of stocksToRemove) {
        await removeFromWatchlist({
          variables: {
            input: { instrumentId }
          }
        });
      }

      // Refetch data after updates
      await Promise.all([
        refetchWatchlist(),
        refetchInstruments()
      ]);

      onClose();
    } catch (error) {
      console.error("Error updating watchlist:", error);
      setError("Failed to update watchlist");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter instruments with null checks
  const filteredInstruments = instruments.filter((instrument) => {
    if (!instrument) return false;
    const searchLower = searchTerm.toLowerCase();
    return (
      instrument.symbol.toLowerCase().includes(searchLower) ||
      instrument.name.toLowerCase().includes(searchLower)
    );
  });

  // Show loading state while data is being fetched
  if (instrumentsLoading || watchlistLoading) {
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
          <h2 className="text-center text-2xl font-bold text-gray-900">Add Stocks</h2>
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
                {selectedStocks.size}/{instruments.length}
              </span>
            </p>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-4 text-red-500">
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
          {instrumentsError || watchlistError ? (
            <div className="text-center text-red-500">
              Error loading data. Please try again.
            </div>
          ) : filteredInstruments.length === 0 ? (
            <div className="text-center text-gray-500">No instruments found</div>
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
                    <p className="font-semibold text-gray-900">{instrument.symbol}</p>
                    <p className="text-sm text-gray-500">{instrument.name}</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleStock(instrument.id)}
                  className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 ${
                    isInWatchlist(instrument.id)
                      ? "bg-green-500 text-white shadow-lg shadow-green-500/30"
                      : "border-2 border-gray-200 text-gray-400 hover:border-primary hover:text-primary"
                  }`}
                >
                  {isInWatchlist(instrument.id) ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <Plus className="h-5 w-5" />
                  )}
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleDone}
            disabled={isSubmitting}
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