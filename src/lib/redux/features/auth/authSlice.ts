import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, AuthResponse, User } from '@/types/auth';

const initialState: AuthState = {
  user: null,
  accessToken: typeof window !== 'undefined' ? sessionStorage.getItem('accessToken') : null,
  refreshToken: typeof window !== 'undefined' ? sessionStorage.getItem('refreshToken') : null,
  isAuthenticated: typeof window !== 'undefined' ? !!sessionStorage.getItem('accessToken') : false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthResponse>) => {
      const { id, name, role, accessToken, refreshToken } = action.payload;
      state.user = { id, name, role };
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.isAuthenticated = true;
      state.error = null;
      
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('accessToken', accessToken);
        sessionStorage.setItem('refreshToken', refreshToken);
      }
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.error = null;
      
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('refreshToken');
      }
    },
  },
});

export const {
  setCredentials,
  setUser,
  setLoading,
  setError,
  logout,
} = authSlice.actions;

export default authSlice.reducer;