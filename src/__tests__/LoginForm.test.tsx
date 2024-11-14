import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LoginForm } from '../components/LoginForm'
import { loginApi } from '../api/api'

// Definir las respuestas mock
const mockResponses = {
    success: {
        success: true,
        message: 'Inicio de sesión exitoso',
        data: {
            token: 'mock-jwt-token',
            user: {
                id: '1',
                email: 'test@test.com'
            }
        }
    },
    error: {
        success: false,
        message: 'Credenciales inválidas'
    }
}

// Mock de la API
const mockLoginApi = vi.fn(async (credentials: { email: string; password: string }) => {
    if (credentials.email === 'test@test.com' && credentials.password === 'password123') {
        return mockResponses.success;
    }
    return mockResponses.error;
});

// Mockear el módulo completo
vi.mock('../api', () => ({
    loginApi: mockLoginApi
}));

describe('LoginForm', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should render login form with email and password fields', () => {
        render(<LoginForm onSubmit={() => Promise.resolve()} />)

        expect(screen.getByLabelText(/Correo electrónico/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /Inicie sesión/i })).toBeInTheDocument()
    })

    it('should show error messages when submitting empty fields', async () => {
        const user = userEvent.setup()
        render(<LoginForm onSubmit={() => Promise.resolve()} />)

        const submitButton = screen.getByRole('button', { name: /Inicie sesión/i })
        await user.click(submitButton)

        expect(await screen.findByText(/Se requiere correo electrónico/i)).toBeInTheDocument()
        expect(await screen.findByText(/Se requiere contraseña/i)).toBeInTheDocument()
    })

    it('should call API with form data when submitting valid credentials', async () => {
        const user = userEvent.setup()
        render(<LoginForm onSubmit={mockLoginApi} />)

        const emailInput = screen.getByLabelText(/Correo electrónico/i)
        const passwordInput = screen.getByLabelText(/Contraseña/i)

        await user.type(emailInput, 'test@test.com')
        await user.type(passwordInput, 'password123')
        await user.click(screen.getByRole('button', { name: /Inicie sesión/i }))

        expect(mockLoginApi).toHaveBeenCalledWith({
            email: 'test@test.com',
            password: 'password123'
        })
        expect(mockLoginApi).toHaveBeenCalledTimes(1)
        expect(await screen.findByText(/Inicio de sesión exitoso/i)).toBeInTheDocument()
    })

    it('should show success message with valid credentials', async () => {
        const user = userEvent.setup()
        render(<LoginForm onSubmit={mockLoginApi} />)

        const emailInput = screen.getByLabelText(/Correo electrónico/i)
        const passwordInput = screen.getByLabelText(/Contraseña/i)

        await user.type(emailInput, 'test@test.com')
        await user.type(passwordInput, 'password123')
        await user.click(screen.getByRole('button', { name: /Inicie sesión/i }))

        expect(await screen.findByText(/Inicio de sesión exitoso/i)).toBeInTheDocument()
    })

    it('should handle network errors', async () => {
        const user = userEvent.setup()
        // Simular error de red
        mockLoginApi.mockRejectedValueOnce(new Error('Error de conexión'))

        render(<LoginForm onSubmit={mockLoginApi} />)

        const emailInput = screen.getByLabelText(/Correo electrónico/i)
        const passwordInput = screen.getByLabelText(/Contraseña/i)

        await user.type(emailInput, 'test@test.com')
        await user.type(passwordInput, 'password123')
        await user.click(screen.getByRole('button', { name: /Inicie sesión/i }))

        expect(await screen.findByText(/Error de conexión/i)).toBeInTheDocument()
    })

    it('should show loading state during API call', async () => {
        const user = userEvent.setup()
        mockLoginApi.mockImplementationOnce(async (credentials) => {
            await new Promise(resolve => setTimeout(resolve, 100))
            return credentials.email === 'test@test.com'
                ? mockResponses.success
                : mockResponses.error
        })

        render(<LoginForm onSubmit={mockLoginApi} />)

        const emailInput = screen.getByLabelText(/Correo electrónico/i)
        const passwordInput = screen.getByLabelText(/Contraseña/i)

        await user.type(emailInput, 'test@test.com')
        await user.type(passwordInput, 'password123')
        await user.click(screen.getByRole('button', { name: /Inicie sesión/i }))

        expect(screen.getByTestId('loading-indicator')).toBeInTheDocument()

        const messageElement = await screen.findByTestId('message')
        expect(messageElement).toHaveTextContent(/Inicio de sesión exitoso/i)
    })

    it('should show error message with invalid credentials', async () => {
        const user = userEvent.setup();
        render(<LoginForm onSubmit={mockLoginApi} />);

        const emailInput = screen.getByLabelText(/Correo electrónico/i);
        const passwordInput = screen.getByLabelText(/Contraseña/i);

        await user.type(emailInput, 'wrong@test.com');
        await user.type(passwordInput, 'wrongpass');
        await user.click(screen.getByRole('button', { name: /Inicie sesión/i }));

        // Check if the error message is displayed
        const messageElement = await screen.findByTestId('message');
        expect(messageElement).toBeInTheDocument();
        expect(messageElement).toHaveTextContent(/Credenciales inválidas/i);

        // Log the actual message content
        console.log('Actual message:', await messageElement.textContent);
    });
})
