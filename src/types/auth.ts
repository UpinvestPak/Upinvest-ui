export enum Role {
    USERS = 'USERS',
    ADMIN = 'ADMIN'
  }
  
  export interface User {
    id: number;
    name?: string;
    role: Role;
    token?: string;
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
    user:any;
  }
  
  export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;

  }
  