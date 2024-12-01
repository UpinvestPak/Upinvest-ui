// watchlistSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Instrument {
  id: number;
  symbol: string;
  name: string;
}

export interface WatchlistState {
  instruments: Instrument[];
  availableInstruments: Instrument[];
  allInstruments: Instrument[];
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
  isAddingInstrument: { [key: number]: boolean };
  isDeletingInstrument: { [key: number]: boolean };
  isAuthenticated: boolean;
  currentPortfolioId: number | null; 

}

const initialState: WatchlistState = {
  instruments: [],
  availableInstruments: [],
  allInstruments: [],
  status: 'idle',
  error: null,
  isAddingInstrument: {},
  isDeletingInstrument: {},
  isAuthenticated: false,
  currentPortfolioId: null, // Add this line

};

export const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {
    setWatchlist: (state, action: PayloadAction<Instrument[]>) => {
      state.instruments = action.payload;
    },
    setAvailableInstruments: (state, action: PayloadAction<Instrument[]>) => {
      state.availableInstruments = action.payload;
    },
    setAllInstruments: (state, action: PayloadAction<Instrument[]>) => {
      state.allInstruments = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.status = action.payload ? 'loading' : 'idle';
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.status = action.payload ? 'failed' : 'idle';
    },
    setAddingInstrument: (state, action: PayloadAction<{ id: number; loading: boolean }>) => {
      state.isAddingInstrument[action.payload.id] = action.payload.loading;
    },
    setDeletingInstrument: (state, action: PayloadAction<{ id: number; loading: boolean }>) => {
      state.isDeletingInstrument[action.payload.id] = action.payload.loading;
    },
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setCurrentPortfolioId: (state, action: PayloadAction<number>) => {
      state.currentPortfolioId = action.payload;
    },
  },
});

export const {
  setWatchlist,
  setAvailableInstruments,
  setAllInstruments,
  setLoading,
  setError,
  setAddingInstrument,
  setDeletingInstrument,
  setAuthenticated,
  setCurrentPortfolioId, // Add this line

} = watchlistSlice.actions;

export default watchlistSlice.reducer;