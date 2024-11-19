'use client';


import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';

// Create a wrapper component with a different name than the imported Provider
export function StoreProvider({ children }: PropsWithChildren) {
  return (
  <Provider store={store}>
   {children}
  </Provider>
  );
}