// src/lib/redux/features/watchlist/hooks.ts
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { RootState } from '@/lib/redux/store';
import {
  fetchWatchlist,
  fetchAvailableInstruments,
  fetchAllInstruments,
  addToWatchlist,
  removeFromWatchlist,
} from '@/lib/redux/features/watchList/watchlistThunks';

export const useWatchlist = () => {
  const dispatch = useAppDispatch();
  const { 
    instruments,
    availableInstruments,
    allInstruments,
status,
    error 
  } = useAppSelector((state: RootState) => state.watchlist);
  
  useEffect(() => {
    dispatch(fetchWatchlist());
    dispatch(fetchAvailableInstruments());
    dispatch(fetchAllInstruments());
  }, [dispatch]);

  const addInstruments = async (instrumentIds: number[]) => {
    await dispatch(addToWatchlist(instrumentIds));
  };

  const removeInstrument = async (instrumentId: number) => {
    await dispatch(removeFromWatchlist(instrumentId));
  };

  return {
    instruments, 
    availableInstruments,
    allInstruments,
    status,
    error,
    addInstruments,
    removeInstrument,
  };
};