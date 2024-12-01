export enum TradeType {
  LONG = "LONG",
  SHORT = "SHORT"
}

export enum CommissionType {
  FIXED = "fixed",
  STANDARD = "standard",
  CUSTOM = "custom"
}

export interface Instrument {

  symbol: string;
  type: string;
  name:string;
  id:number
}

export interface Transaction {
  id: number;
  instrument: Instrument;
  instrumentId: number;
  tradeType: TradeType;
  assetType: string;
  date: Date;
  price: number;
  quantity: number;
  portfolioId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Dividend {
  id: number;
  instrument: Instrument;
  numberOfShares: number;
  dividendPerShare: number;
  totalAmount: number;
  date: Date;
  taxType: string;
}

export interface Portfolio {
  id: number;
  userId: number;
  name: string;
  transactions: Transaction[];
  dividends: Dividend[];
}

// Props interfaces
export interface TradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  portfolioId: number;
  onTradeComplete?: (transaction: Transaction) => void;
  preSelectedSymbol?: string;
  preSelectedName?: string;

}

export interface TradeTypeButtonProps {
  type: TradeType;
  selected: boolean;
  onClick: (type: TradeType) => void;
  disabled?: boolean;
}

export interface CommissionTypeRadioProps {
  value: CommissionType;
  label: string;
  selected: CommissionType;
  onChange: (value: CommissionType) => void;
  disabled?: boolean;
}

// Form interfaces
export interface TradeFormData {
  symbol: string;
  price: number;
  quantity: number;
  commission: number;
  date: string;
  portfolioId: number;
  tradeType: TradeType;
  
}

export interface FormErrors {
  symbol?: string;
  price?: string;
  quantity?: string;
  commission?: string;
  date?: string;
  submit?: string;
}

// API input types
export interface CreateTransactionInput {
  portfolioId: number;
  symbol: string;
  tradeType: TradeType;
  date: string;
  price: number;
  quantity: number;
}