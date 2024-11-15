export interface Instrument {
    id: number;
    symbol: string;
    name: string;
    type: string;
  }
  
  export interface WatchlistSymbol {
    id: number;
    symbol: string;
    name: string;
  }
  
  export interface Watchlist {
    id: number;
    symbols: WatchlistSymbol[];
  }