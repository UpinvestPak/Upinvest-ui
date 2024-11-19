export enum Role {
    USERS = 'USERS',
    ADMIN = 'ADMIN'
  }
  
  export interface User {
    id: number;
    name?: string;
    role: Role;
  }
  
  export interface LoginInput {
    email: string;
    password: string;
  }
  
  export interface RegisterInput extends LoginInput {
    name: string;
  }
  
  export interface AuthResponse {
    id: number;
    name?: string;
    role: Role;
    accessToken: string;
    refreshToken: string;
  }
  
  export interface AuthState {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
  }
  