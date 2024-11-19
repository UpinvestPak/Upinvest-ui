import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchWatchlist,
  addToWatchlist,
  removeFromWatchlist,
  clearError,
  resetStatus
} from '../lib/redux/features/watchList/watchlistSlice';
import { AppDispatch , RootState} from '@/lib/redux/store';

export const useWatchlist = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    instruments,
    status,
    error,
    isAddingInstrument,
    isDeletingInstrument
  } = useSelector((state: RootState) => state.watchlist);

  const loadWatchlist = useCallback(() => {
    return dispatch(fetchWatchlist());
  }, [dispatch]);

  const addInstrument = useCallback((instrumentId: number) => {
    return dispatch(addToWatchlist(instrumentId));
  }, [dispatch]);



  const removeInstrument = useCallback((instrumentId: number) => {
    return dispatch(removeFromWatchlist(instrumentId));
  }, [dispatch]);

  const handleClearError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleResetStatus = useCallback(() => {
    dispatch(resetStatus());
  }, [dispatch]);

  return {
    instruments,
    status,
    error,
    isAddingInstrument,
    isDeletingInstrument,
    loadWatchlist,
    addInstrument,
    removeInstrument,
    clearError: handleClearError,
    resetStatus: handleResetStatus
  };
};