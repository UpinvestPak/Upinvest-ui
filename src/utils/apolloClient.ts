import { ApolloClient, InMemoryCache, createHttpLink, from, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

// Type for the expected shape of your data
interface TypedCache {
  watchlist?: {
    id: string;
    // Add other fields your watchlist should have
  }[];
}

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
});

const authLink = setContext((_, { headers }) => {
  // Early return for server-side
  if (typeof window === 'undefined') {
    return { headers };
  }

  try {
    const token = sessionStorage.getItem('accessToken');
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  } catch (error) {
    console.error('Error accessing sessionStorage:', error);
    return { headers };
  }
});

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      console.error(`GraphQL Error: ${err.message}`, {
        operation: operation.operationName,
        path: err.path,
      });

      // Handle authentication errors
      if (err.message.includes('Unauthorized') || err.message.includes('jwt')) {
        if (typeof window !== 'undefined') {
          try {
            sessionStorage.removeItem('accessToken');
            window.location.href = '/auth/signin';
          } catch (e) {
            console.error('Error during auth error handling:', e);
          }
        }
      }
    }
  }

  if (networkError) {
    console.error(`Network Error: ${networkError.message}`);
  }
});

// Custom link to handle undefined data
const undefinedCheckLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    if (response.data === undefined) {
      return {
        ...response,
        data: null, // Provide a safe default
      };
    }
    return response;
  });
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        watchlist: {
          // Ensure we never return undefined for watchlist
          read(existing) {
            return existing || [];
          },
        },
      },
    },
  },
});

export const client = new ApolloClient({
  link: from([errorLink, undefinedCheckLink, authLink, httpLink]),
  cache,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all', // Handle both data and errors
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
});


