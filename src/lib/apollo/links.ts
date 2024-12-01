import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import { createHttpLink } from '@apollo/client';
import { store } from '../redux/store';
import { logout } from '../redux/features/auth/authSlice';

export const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  credentials: 'include', 
  headers: {
    'Content-Type': 'application/json',
  }
});

// Since we're using cookies, we don't need to set the authorization header
export const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      // Remove the authorization header as we're using cookies
    },
  };
});

export const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message }) => {
      if (message.includes('Unauthorized') || message.includes('jwt')) {
        store.dispatch(logout());
        window.location.href = '/auth/signin';
      }
    });
  }
})