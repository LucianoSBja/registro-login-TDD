import { vi } from 'vitest';
import type { AuthResponse, LoginCredentials } from '../api/api';

export const validCredentials: LoginCredentials = {
  email: 'test@test.com',
  password: 'password123',
};

export const invalidCredentials: LoginCredentials = {
  email: 'wrong@test.com',
  password: 'wrongpass',
};

export const successfulLoginResponse: AuthResponse = {
  success: true,
  message: 'Login successful',
  data: {
    token: 'mock-jwt-token',
    user: {
      id: '1',
      email: 'test@test.com',
    },
  },
};

export const failedLoginResponse: AuthResponse = {
  success: false,
  message: 'Credenciales inválidas',
};

// Mock de la función loginApi
export const mockLoginApi = vi.fn(
  async (credentials: LoginCredentials): Promise<AuthResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 100));

    if (
      credentials.email === validCredentials.email &&
      credentials.password === validCredentials.password
    ) {
      return successfulLoginResponse;
    }
    return failedLoginResponse;
  }
);
