export interface Instrument {
  id: number;
  symbol: string;
  name: string;
}
export interface WatchListState {
  watchlist: Instrument[];
  availableInstruments: Instrument[];
  allInstruments: Instrument[];
  loading: boolean;
  error: string | null; // Should also match `null` in initialState
}

export interface WatchlistState {
  instruments: Instrument[];
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
  isAddingInstrument: { [key: number]: boolean };
  isDeletingInstrument: { [key: number]: boolean };
  isAuthenticated:boolean;
}

export interface WatchListInput {
  instrumentId: number;
}

export interface WatchListBatchInput {
  instrumentIds: number[];
}