import { createAsyncThunk } from '@reduxjs/toolkit';
import { gql } from '@apollo/client';
import { 
  setCredentials, 
  setLoading, 
  setError,
  logout, 
  setUser
} from './authSlice';
import { LoginInput, RegisterInput, AuthResponse } from '@/types/auth';
import client from '@/lib/apollo/client';
import Cookies from 'js-cookie';


const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      id
      name
      role
      # Remove token fields since they're handled by cookies
    }
  }
`;

const REGISTER_MUTATION = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      id
      name
      role
      # Remove token fields since they're handled by cookies
    }
  }
`;

const GET_ME_QUERY = gql`
  query Me {
    me {
      id
      name
      role
    }
  }
`;

const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout {
      success
      message
    }
  }
`;

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: LoginInput, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      
      const { data } = await client.mutate({
        mutation: LOGIN_MUTATION,
        variables: { input: credentials },
        context: {
          credentials: 'include'
        }
      });

      const authResponse: AuthResponse = data.login;
      dispatch(setCredentials(authResponse));
  
      return authResponse;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      dispatch(setError(errorMessage));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (registerData: RegisterInput, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      
      const { data } = await client.mutate({
        mutation: REGISTER_MUTATION,
        variables: { input: registerData },
        context: {
          credentials: 'include'
        }
      });
      
      const authResponse: AuthResponse = data.register;
      dispatch(setCredentials(authResponse));
      
      return authResponse;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed';
      dispatch(setError(errorMessage));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (_, { dispatch }) => {
    try {
      const { data } = await client.query({
        query: GET_ME_QUERY,
        context: {
          credentials: 'include'
        },
        errorPolicy: 'all' 
      });
     
      if (data.me) {
        dispatch(setUser(data.me));
        return data.me;
      } else {
        dispatch(logout());
        throw new Error('No user found');
      }
    } catch (error) {
      console.error('Failed to fetch current user:', error);
      dispatch(logout());
      throw error;
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));

      const { data } = await client.mutate({
        mutation: LOGOUT_MUTATION,
        context: {
          credentials: 'include'
        }
      });

      if (data.logout.success) {
        dispatch(logout());
        await client.clearStore();
        return data.logout;
      } else {
        throw new Error(data.logout.message);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Logout failed';
      dispatch(setError(errorMessage));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);