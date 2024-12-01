import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './features/auth/authSlice';
import watchlistReducer from './features/watchList/watchlistSlice';
import portfolioReducer from './features/portoflio/portfolioSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], 
  blacklist: ['_persist']  

};

const rootReducer = combineReducers({
  auth: authReducer,
  watchlist: watchlistReducer,
  portfolio: portfolioReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
