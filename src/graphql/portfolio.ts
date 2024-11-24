import { gql } from '@apollo/client';

export const GET_USER_PORTFOLIO = gql`
  query GetUserPortfolio {
    getUserPortfolio {
      id
      name
      transactions {
        id
        symbol
        tradeType
        assetType
        date
        price
        quantity
      }
      dividends {
        id
        symbol
        numberOfShares
        dividendPerShare
        totalAmount
        date
        taxType
      }
    }
  }
`;

export const ADD_DIVIDEND = gql`
  mutation AddDividend($input: CreateDividendInput!) {
    addDividend(input: $input) {
      id
      symbol
      numberOfShares
      dividendPerShare
      totalAmount
      date
      taxType
    }
  }
`;

export const ADD_TRANSACTION = gql`
  mutation AddTransaction($input: CreateTransactionInput!) {
    addTransaction(input: $input) {
      id
      symbol
      tradeType
      assetType
      date
      price
      quantity
      createdAt
    }
  }
`;