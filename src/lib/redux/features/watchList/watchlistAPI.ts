import { Instrument } from "@/types/watchList";
import { store } from "../../store";

// watchlistAPI.ts

const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_URL || '/graphql';

export class WatchlistAPI {
  private static async graphqlRequest<T>(query: string, variables?: any): Promise<T> {
    if (!GRAPHQL_ENDPOINT) {
      throw new Error('GraphQL endpoint URL is not configured');
    }

    const state = store.getState();
    const token = state.auth.accessToken;

    try {
      const response = await fetch(GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
        },
        credentials: 'include',
        body: JSON.stringify({ query, variables })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();

      if (json.errors?.length) {
        const errorMessage = json.errors.map((e: any) => e.message).join(', ');
     
        throw new Error(errorMessage);
      }

      if (!json.data) {
        throw new Error('No data returned from GraphQL');
      }

      return json.data;
    } catch (error) {
      console.error('GraphQL Request Error:', {
        query,
        variables,
        error
      });
      throw error instanceof Error ? error : new Error('Unknown error occurred');
    }
  }

  static async getWatchlist(): Promise<Instrument[]> {
    const query = `
      query GetWatchList {
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
    const data = await this.graphqlRequest<{ watchList: { symbols: Instrument[] } }>(query);
    return data.watchList.symbols;
  }

  static async addInstrument(instrumentId: number): Promise<Instrument> {
    const query = `
      mutation AddToWatchList($input: WatchListInput!) {
        addSingleToWatchList(input: $input) {
          id
          symbol
          name
        }
      }
    `;
    
    const variables = {
      input: { instrumentId }
    };

    const data = await this.graphqlRequest<{ addSingleToWatchList: Instrument }>(query, variables);
    
    if (!data.addSingleToWatchList) {
      throw new Error('Failed to add instrument to watchlist');
    }
    return data.addSingleToWatchList;
  }

  static async removeInstrument(instrumentId: number): Promise<Instrument> {
    const query = `
      mutation RemoveFromWatchList($input: WatchListInput!) {
        removeFromWatchList(input: $input) {
          id
          symbol
          name
        }
      }
    `;
    
    const variables = {
      input: { instrumentId }
    };

    const data = await this.graphqlRequest<{ removeFromWatchList: Instrument }>(query, variables);
    
    if (!data.removeFromWatchList) {
      throw new Error('Failed to remove instrument from watchlist');
    }
    return data.removeFromWatchList;
  }
}