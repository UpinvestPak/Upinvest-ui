import {
  ADD_DIVIDEND,
  ADD_TRANSACTION,
  GET_USER_PORTFOLIO,
} from "@/graphql/portfolio";
import {
  CreateDividendInput,
  CreateTransactionInput,
  Portfolio,
  Transaction,
  Dividend,
  LoadingState,
  PortfolioState,
} from "@/types/portfolio";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState, store } from "../../store";
import { DocumentNode, print } from "graphql";
import Cookies from 'js-cookie';


// Configuration
const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_URL || "/graphql";
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

// Helper function for GraphQL requests
async function graphqlRequest<T>(
  document: DocumentNode,
  variables?: Record<string, unknown>,
): Promise<T> {
  if (!GRAPHQL_ENDPOINT) {
    throw new Error("GraphQL endpoint URL is not configured");
  }

 
  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      query: print(document),
      variables,
    }),
  });

  if (!response.ok) {
    throw new Error(`Network error: ${response.status} ${response.statusText}`);
  }

  const json = await response.json();
  if (json.errors?.length) {
    throw new Error(json.errors.map((e: any) => e.message).join(", "));
  }

  return json.data;
}

// Async Thunks
export const fetchUserPortfolio = createAsyncThunk<Portfolio>(
  "portfolio/fetchUserPortfolio",
  async () => {
    const data = await graphqlRequest<{ getUserPortfolio: Portfolio }>(GET_USER_PORTFOLIO);
    return data.getUserPortfolio;
  }
);

export const addTransaction = createAsyncThunk<
  Transaction,
  CreateTransactionInput
>(
  "portfolio/addTransaction",
  async (input) => {
    const data = await graphqlRequest<{ addTransaction: Transaction }>(
      ADD_TRANSACTION,
      { input }
    );
    return data.addTransaction;
  }
);

export const addDividend = createAsyncThunk<
  Dividend,
  CreateDividendInput
>(
  "portfolio/addDividend",
  async (input) => {
    const data = await graphqlRequest<{ addDividend: Dividend }>(
      ADD_DIVIDEND,
      { input }
    );
    return data.addDividend;
  }
);

// Initial State
const initialState: PortfolioState = {
  portfolio: null,
  loading: "idle",
  error: null,
  lastUpdated: null,
};

// Slice
const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    resetPortfolioState: () => initialState,
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Portfolio
    builder
      .addCase(fetchUserPortfolio.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(fetchUserPortfolio.fulfilled, (state, action) => {
        state.portfolio = action.payload;
        state.loading = "succeeded";
        state.lastUpdated = Date.now();
        state.error = null;
      })
      .addCase(fetchUserPortfolio.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message ?? "Failed to fetch portfolio";
      })

    // Add Transaction
    builder
      .addCase(addTransaction.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        if (state.portfolio) {
          state.portfolio.transactions = [
            ...state.portfolio.transactions,
            action.payload,
          ];
        }
        state.loading = "succeeded";
        state.error = null;
      })
      .addCase(addTransaction.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message ?? "Failed to add transaction";
      })

    // Add Dividend
    builder
      .addCase(addDividend.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(addDividend.fulfilled, (state, action) => {
        if (state.portfolio) {
          state.portfolio.dividends = [
            ...state.portfolio.dividends,
            action.payload,
          ];
        }
        state.loading = "succeeded";
        state.error = null;
      })
      .addCase(addDividend.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message ?? "Failed to add dividend";
      });
  },
});

export const { resetPortfolioState, clearError } = portfolioSlice.actions;

// Selectors

// In your portfolioSlice.ts
export const selectPortfolio = (state: RootState) => state.portfolio.portfolio;
export const selectPortfolioLoading = (state: { portfolio: PortfolioState }) => 
  state.portfolio.loading;
export const selectPortfolioError = (state: { portfolio: PortfolioState }) => 
  state.portfolio.error;
export const selectLastUpdated = (state: { portfolio: PortfolioState }) => 
  state.portfolio.lastUpdated;


export default portfolioSlice.reducer;