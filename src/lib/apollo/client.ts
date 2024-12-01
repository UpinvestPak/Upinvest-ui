// lib/apollo/client.ts
import { 
  ApolloClient, 
  InMemoryCache, 
  ApolloLink, 
  createHttpLink 
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { store } from '../redux/store';
import {logout, setError } from '../redux/features/auth/authSlice';
import Cookies from 'js-cookie';



// lib/apollo/client.ts
const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  credentials: 'include',
});

const authLink = setContext((_, { headers }) => {
  const token = Cookies.get('access_token');
    console.log('Token from cookie:', token);

  
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
      'Access-Control-Allow-Credentials': 'true'
    }
  };
});



const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL Error]: Message: ${message}, Location: ${JSON.stringify(
          locations
        )}, Path: ${path}`
      );


      if (
        message.includes('Unauthorized') || 
        message.includes('Token expired') || 
        message.includes('Not authenticated')
      ) {
        store.dispatch(logout());
        store.dispatch(setError('Session expired. Please log in again.'));
        
        if (typeof window !== 'undefined') {
          window.location.href = '/auth/signin';
        }
      }
    });
  }

  if (networkError) {
    console.error(`[Network Error]: ${networkError}`);
    store.dispatch(setError('Network error. Please check your connection.'));
  }
});

const client = new ApolloClient({
  link: ApolloLink.from([
    errorLink,  
    authLink,    
    httpLink     
  ]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          // Optional cache manipulation
          me: {
            merge(existing, incoming) {
              return incoming; // Always use the latest user data
            }
          }
        }
      }
    }
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'all'
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all'
    }
  }
});

export default client;

// Types for better type safety
export interface GraphQLErrorResponse {
  message: string;
  locations?: Array<{ line: number; column: number }>;
  path?: string[];
}