export interface Instrument {
  id: number;
  symbol: string;
  name: string;
}

export interface WatchlistState {
  instruments: Instrument[];
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
  isAddingInstrument: { [key: number]: boolean };
  isDeletingInstrument: { [key: number]: boolean };
}

export interface WatchListInput {
  instrumentId: number;
}

export interface WatchListBatchInput {
  instrumentIds: number[];
}