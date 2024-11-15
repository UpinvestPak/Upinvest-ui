import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      id
      name
      role
      accessToken
      refreshToken
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      id
      name
      role
      accessToken
      refreshToken
    }
  }
`;

const GET_INSTRUMENTS = gql`
  query GetInstruments {
    instruments {
      id
      symbol
      name
    }
  }
`;

export const GET_WATCHLIST = gql`
  query GetWatchlist {
    watchList {
      id
      symbols {
        id
        symbol
        name
      }
    }
  }
`;

export const ADD_TO_WATCHLIST = gql`
  mutation AddToWatchlist($input: WatchListInput!) {
    addToWatchList(input: $input) {
      id
      symbol
      name
    }
  }
`;

export const REMOVE_FROM_WATCHLIST = gql`
  mutation RemoveFromWatchlist($input: WatchListInput!) {
    removeFromWatchList(input: $input) {
      id
      symbol
      name
    }
  }
`;