export interface LoginResponse {
  success: boolean;
  message: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export const loginApi = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  // Simulamos una llamada a API con un delay
  return new Promise((resolve) => {
    setTimeout(() => {
      if (
        credentials.email === 'test@test.com' &&
        credentials.password === 'password123'
      ) {
        resolve({ success: true, message: 'Login successful' });
      } else {
        resolve({ success: false, message: 'Invalid credentials' });
      }
    }, 500); // 500ms de delay para simular una llamada real
  });
};
