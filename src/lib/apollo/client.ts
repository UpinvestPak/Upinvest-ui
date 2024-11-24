import { ApolloClient, InMemoryCache, from } from '@apollo/client';
import { httpLink, authLink, errorLink } from './links';

export const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Portfolio: {
        fields: {
          transactions: {
            merge: false // Prevent array merging issues
          }
        }
      }
    }
  }),
    defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
  },
});