import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import { createHttpLink, ApolloLink } from '@apollo/client';
import { store } from '../redux/store';
import { logout } from '../redux/features/auth/authSlice';

export const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
});

export const authLink = setContext((_, { headers }) => {
  if (typeof window === 'undefined') return { headers };

  const state = store.getState();
  const token = state.auth.accessToken;

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message }) => {
      if (message.includes('Unauthorized') || message.includes('jwt')) {
        store.dispatch(logout());
        if (typeof window !== 'undefined') {
          window.location.href = '/auth/signin';
        }
      }
    });
  }

  if (networkError) {
    console.error(`Network Error: ${networkError.message}`);
  }
});
