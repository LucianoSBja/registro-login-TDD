import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import RegisterForm from '../components/RegisterForm';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

describe('RegisterForm', () => {
    beforeEach(() => {
        render(<RegisterForm />);
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    // Test 1: Verify that all fields are required
    test('should show required error messages when form is empty', () => {
        fireEvent.click(screen.getByRole('button', { name: /registrarme/i }));

        expect(screen.getByText('Nombre es requerido')).toBeInTheDocument();
        expect(screen.getByText('Apellido es requerido')).toBeInTheDocument();
        expect(screen.getByText('Correo electrónico es requerido')).toBeInTheDocument();
        expect(screen.getByText('Teléfono es requerido')).toBeInTheDocument();
        expect(screen.getByText('Contraseña es requerida')).toBeInTheDocument();
        expect(screen.getByText('Confirmar contraseña es requerido')).toBeInTheDocument();
    });

    // Test 2: Email validation
    test('should validate email format', async () => {
        render(<RegisterForm />);

        const emailInput = screen.getByLabelText('Correo Electrónico');
        const submitButton = screen.getByRole('button', { name: /registrarme/i });

        fireEvent.change(emailInput, { target: { value: 'emailinvalido' } });
        fireEvent.click(submitButton);

        screen.debug()

        await waitFor(() => {
            const errorMessage = screen.getByText('Correo electrónico no es válido');
            expect(errorMessage).toBeInTheDocument();
        }, { timeout: 2000 });
    });

    // Test 3: Validating passwords match
    test('should validate matching passwords', () => {
        const passwordInput = screen.getByLabelText('Contraseña', { exact: true });
        const confirmPasswordInput = screen.getByLabelText('Confirmar Contraseña', { exact: true });

        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'differentpassword' } });

        fireEvent.click(screen.getByRole('button', { name: /registrarme/i }));

        expect(screen.getByText('Las contraseñas no coinciden')).toBeInTheDocument();
    });

    // Test 4: Formulario válido
    test('should submit form with valid data', async () => {
        const consoleSpy = vi.spyOn(console, 'log');

        fireEvent.change(screen.getByLabelText('Nombre', { exact: true }), {
            target: { value: 'John' }
        });
        fireEvent.change(screen.getByLabelText('Apellido', { exact: true }), {
            target: { value: 'Doe' }
        });
        fireEvent.change(screen.getByLabelText('Correo Electrónico', { exact: true }), {
            target: { value: 'john@example.com' }
        });
        fireEvent.change(screen.getByLabelText('Teléfono', { exact: true }), {
            target: { value: '1234567890' }
        });
        fireEvent.change(screen.getByLabelText('Contraseña', { exact: true }), {
            target: { value: 'password123!' }
        });
        fireEvent.change(screen.getByLabelText('Confirmar Contraseña', { exact: true }), {
            target: { value: 'password123!' }
        });

        fireEvent.click(screen.getByRole('button', { name: /registrarme/i }));

        await waitFor(() => {
            expect(consoleSpy).toHaveBeenCalledWith('Form submitted:', {
                name: 'John',
                lastname: 'Doe',
                email: 'john@example.com',
                phone: '1234567890',
                password: 'password123!'
            });
        });

        consoleSpy.mockRestore();
    });

    // Test 4: Show required fields errors
    test('should show required fields errors', async () => {
        fireEvent.click(screen.getByRole('button', { name: 'Registrarme' }));

        await waitFor(() => {
            expect(screen.getByText('Nombre es requerido')).toBeInTheDocument();
            expect(screen.getByText('Apellido es requerido')).toBeInTheDocument();
            expect(screen.getByText('Correo electrónico es requerido')).toBeInTheDocument();
            expect(screen.getByText('Teléfono es requerido')).toBeInTheDocument();
            expect(screen.getByText('Contraseña es requerida')).toBeInTheDocument();
            expect(screen.getByText('Confirmar contraseña es requerido')).toBeInTheDocument();
        });
    });

    // Test 5: Errors disappear when data is corrected
    test('should clear errors when input becomes valid', () => {
        fireEvent.click(screen.getByRole('button', { name: /registrarme/i }));
        expect(screen.getByText('Nombre es requerido')).toBeInTheDocument();

        fireEvent.change(screen.getByLabelText(/nombre/i), {
            target: { value: 'John' }
        });
        fireEvent.click(screen.getByRole('button', { name: /registrarme/i }));

        expect(screen.queryByText('Nombre es requerido')).not.toBeInTheDocument();
    });
});