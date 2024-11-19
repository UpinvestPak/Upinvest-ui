import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { WatchlistAPI } from './watchlistAPI';
import { WatchlistState  , Instrument} from '@/types/watchList';

const initialState: WatchlistState = {
  instruments: [],
  status: 'idle',
  error: null,
  isAddingInstrument: {},
  isDeletingInstrument: {}
};

// Async Thunks
export const fetchWatchlist = createAsyncThunk<
  Instrument[],
  void,
  { rejectValue: string }
>('watchlist/fetchWatchlist', async (_, { rejectWithValue }) => {
  try {
    return await WatchlistAPI.getWatchlist();
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch watchlist');
  }
});

export const addToWatchlist = createAsyncThunk<
  Instrument,
  number,
  { rejectValue: string }
>('watchlist/addInstrument', async (instrumentId, { rejectWithValue, getState }) => {
  try {
    return await WatchlistAPI.addInstrument(instrumentId);
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'Failed to add instrument');
  }
});



export const removeFromWatchlist = createAsyncThunk<
  { instrumentId: number; removed: Instrument },
  number,
  { rejectValue: string }
>('watchlist/removeInstrument', async (instrumentId, { rejectWithValue }) => {
  try {
    const removed = await WatchlistAPI.removeInstrument(instrumentId);
    return { instrumentId, removed };
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'Failed to remove instrument');
  }
});

// Slice
const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetStatus: (state) => {
      state.status = 'idle';
      state.error = null;
      state.isAddingInstrument = {};
      state.isDeletingInstrument = {};
    },
    clearLoadingStates: (state) => {
      state.isAddingInstrument = {};
      state.isDeletingInstrument = {};
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch watchlist
      .addCase(fetchWatchlist.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchWatchlist.fulfilled, (state, action) => {
        state.status = 'idle';
        state.instruments = action.payload;
        state.error = null;
      })
      .addCase(fetchWatchlist.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Failed to fetch watchlist';
      })
      
      // Add single instrument
      .addCase(addToWatchlist.pending, (state, action) => {
        if (!state.isAddingInstrument[action.meta.arg]) {
          state.isAddingInstrument[action.meta.arg] = true;
          state.error = null;
        }
      })
      .addCase(addToWatchlist.fulfilled, (state, action) => {
        delete state.isAddingInstrument[action.meta.arg];
        if (!state.instruments.some(inst => inst.id === action.payload.id)) {
          state.instruments.push(action.payload);
        }
        state.error = null;
      })
      .addCase(addToWatchlist.rejected, (state, action) => {
        delete state.isAddingInstrument[action.meta.arg];
        state.error = action.payload ?? 'Failed to add instrument';
      })
      
      // Add batch instruments
  
      
      // Remove instrument
      .addCase(removeFromWatchlist.pending, (state, action) => {
        if (!state.isDeletingInstrument[action.meta.arg]) {
          state.isDeletingInstrument[action.meta.arg] = true;
          state.error = null;
        }
      })
      .addCase(removeFromWatchlist.fulfilled, (state, action) => {
        delete state.isDeletingInstrument[action.meta.arg];
        state.instruments = state.instruments.filter(
          instrument => instrument.id !== action.payload.instrumentId
        );
        state.error = null;
      })
      .addCase(removeFromWatchlist.rejected, (state, action) => {
        delete state.isDeletingInstrument[action.meta.arg];
        state.error = action.payload ?? 'Failed to remove instrument';
      });
  }
});

export const { clearError, resetStatus, clearLoadingStates } = watchlistSlice.actions;
export default watchlistSlice.reducer