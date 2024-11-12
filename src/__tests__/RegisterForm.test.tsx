import { render, screen } from '@testing-library/react';
import RegisterForm from '../components/RegisterForm';
import { expect, test } from 'vitest';

test('renders the registration form correctly', () => {
    render(<RegisterForm />);

    expect(screen.getByLabelText('Nombre')).toBeInTheDocument();
    expect(screen.getByLabelText('Apellido')).toBeInTheDocument();
    expect(screen.getByLabelText('Correo Electrónico')).toBeInTheDocument();
    expect(screen.getByLabelText('Teléfono')).toBeInTheDocument();
    expect(screen.getByLabelText('Contraseña')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirmar Contraseña')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Registrarme' })).toBeInTheDocument();
});