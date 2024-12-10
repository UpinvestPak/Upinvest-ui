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
  export interface PendingRegistration {
    email: string;
    message: string;
  }
  export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    pendingRegistration: PendingRegistration | null;


  }
  export enum FilerType {
    FILER = 'FILER',
    NON_FILER = 'NON_FILER'
  }
  export interface VerifyOtpInput {
    email: string;
    otpCode: string;
  }

  export interface RegisterInput {
    email: string;
    password: string;
    name: string;
    phoneNumber: string;
    role?: Role;
    country?: string;
    city?: string;
    ntnNumber?: string;
    filerType?: FilerType;
  }
  export interface RegisterFormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    phoneNumber: string;
    ntnNumber: string;
    city: string;
    country: string;
    filerType: FilerType;
    role?: Role;
  }