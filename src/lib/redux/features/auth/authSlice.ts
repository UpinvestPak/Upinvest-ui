import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, AuthResponse, User } from '@/types/auth';


interface PendingRegistration {
  email: string;
  message: string;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  pendingRegistration: null

  
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthResponse>) => {
      const { id, name, role } = action.payload;
      state.user = { id, name, role };
      state.isAuthenticated = true;
      state.error = null;
      state.pendingRegistration = null; 

    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setPendingRegistration: (state, action: PayloadAction<PendingRegistration>) => {
      state.pendingRegistration = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearPendingRegistration: (state) => {
      state.pendingRegistration = null;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      state.pendingRegistration = null;

    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setCredentials,
  setUser,
  setLoading,
  setError,
  logout,
  setPendingRegistration,
  clearPendingRegistration,
  clearError,
} = authSlice.actions;

export default authSlice.reducer;