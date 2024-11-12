import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegistrationForm from '../../components/forms/RegistrationForm';

describe('RegistrationForm', () => {
  // 1. Test de renderizado inicial
  describe('Renderizado inicial', () => {
    test('debe mostrar todos los campos del formulario vacíos', () => {
      render(<RegistrationForm />);
      
      // Verificamos que existan los campos
      const fields = [
        'nombre',
        'apellido',
        'correo',
        'teléfono',
        'contraseña',
        'confirmar contraseña'
      ];

      fields.forEach(field => {
        const input = screen.getByLabelText(new RegExp(field, 'i'));
        expect(input).toBeInTheDocument();
        expect(input).toHaveValue('');
      });

      // Verificamos el botón de submit
      expect(screen.getByRole('button', { name: /registrar/i })).toBeInTheDocument();
    });
  });

  // 2. Test de validaciones de campos individuales
  describe('Validaciones de campos', () => {
    test('debe mostrar error cuando el nombre está vacío', async () => {
      render(<RegistrationForm />);
      
      // Intentamos submit sin llenar el campo
      const submitButton = screen.getByRole('button', { name: /registrar/i });
      await userEvent.click(submitButton);

      // Verificamos mensaje de error
      expect(screen.getByText(/el nombre es requerido/i)).toBeInTheDocument();
    });

    test('debe validar formato de email', async () => {
      render(<RegistrationForm />);
      
      const emailInput = screen.getByLabelText(/correo/i);
      await userEvent.type(emailInput, 'correo-invalido');
      
      const submitButton = screen.getByRole('button', { name: /registrar/i });
      await userEvent.click(submitButton);

      expect(screen.getByText(/correo electrónico inválido/i)).toBeInTheDocument();
    });

    test('debe validar que las contraseñas coincidan', async () => {
      render(<RegistrationForm />);
      
      const passwordInput = screen.getByLabelText(/^contraseña/i);
      const confirmPasswordInput = screen.getByLabelText(/confirmar contraseña/i);
      
      await userEvent.type(passwordInput, 'password123');
      await userEvent.type(confirmPasswordInput, 'password456');
      
      const submitButton = screen.getByRole('button', { name: /registrar/i });
      await userEvent.click(submitButton);

      expect(screen.getByText(/las contraseñas no coinciden/i)).toBeInTheDocument();
    });
  });

  // 3. Test de interacción con los campos
  describe('Interacción con campos', () => {
    test('debe actualizar los valores al escribir', async () => {
      render(<RegistrationForm />);
      
      const testData = {
        nombre: 'Juan',
        apellido: 'Pérez',
        correo: 'juan@example.com',
        teléfono: '1234567890',
        contraseña: 'password123'
      };

      for (const [field, value] of Object.entries(testData)) {
        const input = screen.getByLabelText(new RegExp(field, 'i'));
        await userEvent.type(input, value);
        expect(input).toHaveValue(value);
      }
    });
  });
});