import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import watchlistReducer from './features/watchList/watchlistSlice';
import portfolioReducer from './features/portoflio/portfolioSlice';



export const store = configureStore({
  reducer: {
    auth: authReducer,
    watchlist: watchlistReducer,
    portfolio: portfolioReducer

    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;