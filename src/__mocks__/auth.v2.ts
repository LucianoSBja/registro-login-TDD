import { ApiResponse, LoginCredentials, User } from '../types';

// Simulated database
const users: User[] = [];

export async function registerUser(user: User): Promise<ApiResponse> {
  if (Object.values(user).some((value) => !value)) {
    return { success: false, message: 'Todos los campos son obligatorios' };
  }

  if (!validateEmail(user.email)) {
    return {
      success: false,
      message: 'Formato de correo electrónico no válido',
    };
  }

  if (user.password !== user.confirmPassword) {
    return { success: false, message: 'Las contraseñas no coinciden' };
  }

  if (!validatePassword(user.password)) {
    return {
      success: false,
      message: 'La contraseña no es lo suficientemente segura',
    };
  }

  if (!isValidPhoneNumber(user.phone)) {
    return {
      success: false,
      message: 'Número de teléfono no válido',
    };
  }

  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500));

  users.push(user);
  return { success: true, message: 'Usuario registrado con éxito' };
}

export async function loginUser(
  credentials: LoginCredentials
): Promise<ApiResponse> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500));

  const user = users.find(
    (u) => u.email === credentials.email && u.password === credentials.password
  );

  if (user) {
    return { success: true, message: 'Inicio de sesión exitoso' };
  } else {
    return {
      success: false,
      message: 'Correo electrónico o contraseña incorrectos',
    };
  }
}

export function validateEmail(email: string): boolean {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email);
}

export function validatePassword(password: string): boolean {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}

export function isValidPhoneNumber(phone: string): boolean {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone);
}
