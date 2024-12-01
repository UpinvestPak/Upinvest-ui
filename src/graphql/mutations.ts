// src/graphql/queries.ts
import { gql } from '@apollo/client';

export const GET_ALL_INSTRUMENTS = gql`
  query GetAllInstruments {
    allInstruments {
      id
      symbol
      name
    }
  }
`;

export const GET_AVAILABLE_INSTRUMENTS = gql`
  query GetAvailableInstruments {
    availableInstruments {
      id
      symbol
      name
    }
  }
`;

export const GET_WATCHLIST = gql`
  query GetWatchList {
    watchList {
      instruments {
        id
        symbol
        name
      }
    }
  }
`;