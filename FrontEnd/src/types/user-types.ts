// Types for Registration
export interface RegisterRequest {
  name: string;
  nic_number: string;
  address: string;
  contact_number: string;
  email: string;
  username: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
}

// Types for Login
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  user: {
    id: number;
    name: string;
    nic_number: string;
    address: string;
    contact_number: string;
    email: string;
    username: string;
    password: string;
  };
}

// Types for Errors
export interface ErrorResponse {
  error: string;
}
// types/user-types.ts
export interface UserProfile {
  id: number;
  name: string;
  nic_number: string;
  address: string;
  contact_number: string;
  email: string;
  username: string;
}

export interface UpdateUserRequest {
  name?: string;
  nic_number?: string;
  address?: string;
  contact_number?: string;
  email?: string;
  username?: string;
  password?: string;
}

export interface ErrorResponse {
  error: string;
}
