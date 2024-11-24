export type TradeType = 'LONG' | 'SHORT';
export type TaxType = 'FILER' | 'NON_FILER';

export interface Transaction {
  id: number;
  symbol: string;
  tradeType: TradeType;
  assetType: string;
  date: string;
  price: number;
  quantity: number;
}

export interface Dividend {
  id: number;
  symbol: string;
  numberOfShares: number;
  dividendPerShare: number;
  totalAmount: number;
  date: string;
  taxType: TaxType;
}

export interface Portfolio {
  id: number;
  name: string;
  transactions: Transaction[];
  dividends: Dividend[];
}

export interface CreateTransactionInput {
  symbol: string;
  tradeType: TradeType;
  date: string;
  price: number;
  quantity: number;
}

export interface CreateDividendInput {
  symbol: string;
  numberOfShares: number;
  dividendPerShare: number;
  date: string;
  taxType: TaxType;
}

// Updated Redux slice types
export type LoadingState = 'idle' | 'pending' | 'succeeded' | 'failed';

export interface PortfolioState {
  portfolio: Portfolio | null;
  loading: LoadingState;
  error: string | null;
  lastUpdated: number | null;
}