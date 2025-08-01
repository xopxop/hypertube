export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePicture?: string;
  createdAt: Date;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}