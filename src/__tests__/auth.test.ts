import { describe, it, expect } from 'vitest';
import {
  registerUser,
  loginUser,
  validateEmail,
  validatePassword,
} from '../__mocks__/auth.v2';

describe('User Authentication', () => {
  describe('Registration', () => {
    it('should register a user with valid information', async () => {
      const user = {
        firstName: 'John',
        lastName: 'Doe',
        phone: '1234567890',
        email: 'john@example.com',
        password: 'Password123!',
        confirmPassword: 'Password123!',
      };
      const result = await registerUser(user);
      expect(result).toEqual({
        success: true,
        message: 'Usuario registrado con éxito',
      });
    });

    it('should not register a user with missing information', async () => {
      const user = {
        firstName: 'John',
        lastName: 'Doe',
        phone: '',
        email: 'john@example.com',
        password: 'Password123!',
        confirmPassword: 'Password123!',
      };
      const result = await registerUser(user);
      expect(result).toEqual({
        success: false,
        message: 'Todos los campos son obligatorios',
      });
    });

    it('should not register a user with invalid email', async () => {
      const user = {
        firstName: 'John',
        lastName: 'Doe',
        phone: '1234567890',
        email: 'invalid-email',
        password: 'Password123!',
        confirmPassword: 'Password123!',
      };
      const result = await registerUser(user);
      expect(result).toEqual({
        success: false,
        message: 'Formato de correo electrónico no válido',
      });
    });

    it('should not register a user with mismatched passwords', async () => {
      const user = {
        firstName: 'John',
        lastName: 'Doe',
        phone: '1234567890',
        email: 'john@example.com',
        password: 'Password123!',
        confirmPassword: 'DifferentPassword123!',
      };
      const result = await registerUser(user);
      expect(result).toEqual({
        success: false,
        message: 'Las contraseñas no coinciden',
      });
    });
  });

  describe('Login', () => {
    it('should login a user with correct credentials', async () => {
      const credentials = {
        email: 'john@example.com',
        password: 'Password123!',
      };
      const result = await loginUser(credentials);
      expect(result).toEqual({
        success: true,
        message: 'Inicio de sesión exitoso',
      });
    });

    it('should not login a user with incorrect credentials', async () => {
      const credentials = {
        email: 'john@example.com',
        password: 'WrongPassword123!',
      };
      const result = await loginUser(credentials);
      expect(result).toEqual({
        success: false,
        message: 'Correo electrónico o contraseña incorrectos',
      });
    });
  });

  describe('Validations', () => {
    it('should validate email format', () => {
      expect(validateEmail('john@example.com')).toBe(true);
      expect(validateEmail('invalid-email')).toBe(false);
    });

    it('should validate password strength', () => {
      expect(validatePassword('WeakPass')).toBe(false);
      expect(validatePassword('StrongPassword123!')).toBe(true);
    });
  });
});
