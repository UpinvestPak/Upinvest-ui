import { createAsyncThunk } from '@reduxjs/toolkit';
import { gql } from '@apollo/client';
import { 
  setWatchlist, 
  setAvailableInstruments, 
  setAllInstruments,
  setLoading, 
  setError 
} from './watchlistSlice';
import client from '@/lib/apollo/client';
import Cookies from 'js-cookie';


const WATCHLIST_QUERY = gql`
  query GetWatchList {
    watchList {
      id
      symbols {
        id
        name
        symbol
      }
    }
  }
`;

const AVAILABLE_INSTRUMENTS_QUERY = gql`
  query GetAvailableInstruments {
    availableInstruments {
      id
      name
      symbol
    }
  }
`;

const ALL_INSTRUMENTS_QUERY = gql`
  query GetAllInstruments {
    allInstruments {
      id
      name
      symbol
    }
  }
`;

const ADD_TO_WATCHLIST_MUTATION = gql`
  mutation AddToWatchList($input: WatchListBatchInput!) {
    addToWatchList(input: $input) {
      id
      name
      symbol
    }
  }
`;

const REMOVE_FROM_WATCHLIST_MUTATION = gql`
  mutation RemoveFromWatchList($input: WatchListInput!) {
    removeFromWatchList(input: $input) {
      id
      name
      symbol
    }
  }
`;

// watchlistThunks.ts
export const fetchWatchlist = createAsyncThunk(
  'watchlist/fetch',
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      
      const { data } = await client.query({
        query: WATCHLIST_QUERY,
        context: { 
          credentials: 'include'
        },
        fetchPolicy: 'network-only'
      });
      
      console.log('GraphQL response:', data);
      console.log('Watchlist symbols:', data.watchList.symbols);
      
      // Make sure we're dispatching the symbols array
      dispatch(setWatchlist(data.watchList.symbols));
      return data.watchList.symbols;
    } catch (error) {
      console.error('Fetch watchlist error:', error);
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);
export const fetchAvailableInstruments = createAsyncThunk(
  'watchlist/fetchAvailable',
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      
      const { data } = await client.query({
        query: AVAILABLE_INSTRUMENTS_QUERY,
        context: { credentials: 'include' },
        fetchPolicy: 'network-only'
      });
      
      dispatch(setAvailableInstruments(data.availableInstruments));
      return data.availableInstruments;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch available instruments';
      dispatch(setError(errorMessage));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const fetchAllInstruments = createAsyncThunk(
  'watchlist/fetchAll',
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      
      const { data } = await client.query({
        query: ALL_INSTRUMENTS_QUERY,
        context: { credentials: 'include' }
      });
      
      dispatch(setAllInstruments(data.allInstruments));
      return data.allInstruments;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch all instruments';
      dispatch(setError(errorMessage));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const addToWatchlist = createAsyncThunk(
  'watchlist/add',
  async (instrumentIds: number[], { dispatch }) => {
    try {
      dispatch(setLoading(true));
      
      const { data } = await client.mutate({
        mutation: ADD_TO_WATCHLIST_MUTATION,
        variables: { input: { instrumentIds } },
        context: { credentials: 'include' }
      });
      
      // Refetch watchlist and available instruments to keep them in sync
      await Promise.all([
        dispatch(fetchWatchlist()),
        dispatch(fetchAvailableInstruments())
      ]);
      
      return data.addToWatchList;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to add to watchlist';
      dispatch(setError(errorMessage));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const removeFromWatchlist = createAsyncThunk(
  'watchlist/remove',
  async (instrumentId: number, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      
      const { data } = await client.mutate({
        mutation: REMOVE_FROM_WATCHLIST_MUTATION,
        variables: { input: { instrumentId } },
        context: { credentials: 'include' }
      });
      
      // Refetch watchlist and available instruments to keep them in sync
      await Promise.all([
        dispatch(fetchWatchlist()),
        dispatch(fetchAvailableInstruments())
      ]);
      
      return data.removeFromWatchList;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to remove from watchlist';
      dispatch(setError(errorMessage));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);