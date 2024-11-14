import { describe, it, expect, vi } from 'vitest'
import { fireEvent, render, screen, act } from '@testing-library/react'
import { LoginForm } from '../components/LoginForm'
import { loginApi } from '../api'


describe('LoginForm', () => {
    // 1. Test de renderizado
    it('should render login form with email and password fields', () => {
        render(<LoginForm onSubmit={() => Promise.resolve()} />)

        expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument()
    })

    // 2. Test de validación de campos vacíos
    it('should show error messages when submitting empty fields', async () => {
        render(<LoginForm onSubmit={() => Promise.resolve()} />)

        const submitButton = screen.getByRole('button', { name: /login/i })

        await act(async () => {
            fireEvent.click(submitButton)
        })

        expect(screen.getByText(/email is required/i)).toBeInTheDocument()
        expect(screen.getByText(/password is required/i)).toBeInTheDocument()
    })

    // 3. Test de envío de credenciales
    it('should call onSubmit with form data when submitting valid credentials', async () => {
        const mockOnSubmit = vi.fn()
        render(<LoginForm onSubmit={mockOnSubmit} />)

        const emailInput = screen.getByLabelText(/email/i)
        const passwordInput = screen.getByLabelText(/password/i)

        await act(async () => {
            fireEvent.change(emailInput, { target: { value: 'test@test.com' } })
            fireEvent.change(passwordInput, { target: { value: 'password123' } })
        })

        await act(async () => {
            fireEvent.click(screen.getByRole('button', { name: /login/i }))
        })
        expect(mockOnSubmit).toHaveBeenCalledWith({
            email: 'test@test.com',
            password: 'password123'
        })
    })

    // 4. Test de integración con API mock
    it('should show success message with valid credentials', async () => {
        render(<LoginForm onSubmit={async (credentials) => {
            const response = await loginApi(credentials)
            if (!response.success) throw new Error(response.message)
        }} />)

        const emailInput = screen.getByLabelText(/email/i)
        const passwordInput = screen.getByLabelText(/password/i)

        await act(async () => {
            fireEvent.change(emailInput, { target: { value: 'test@test.com' } })
            fireEvent.change(passwordInput, { target: { value: 'password123' } })
        })

        await act(async () => {
            fireEvent.click(screen.getByRole('button', { name: /login/i }))
        })

        await vi.waitFor(() => {
            expect(screen.getByText(/login successful/i)).toBeInTheDocument()
        })
    })

    it('should show error message with invalid credentials', async () => {
        render(<LoginForm onSubmit={async (credentials) => {
            const response = await loginApi(credentials)
            if (!response.success) throw new Error(response.message)
        }} />)

        const emailInput = screen.getByLabelText(/email/i)
        const passwordInput = screen.getByLabelText(/password/i)

        await act(async () => {
            fireEvent.change(emailInput, { target: { value: 'wrong@test.com' } })
            fireEvent.change(passwordInput, { target: { value: 'wrongpass' } })
        })

        await act(async () => {
            fireEvent.click(screen.getByRole('button', { name: /login/i }))
        })

        await vi.waitFor(() => {
            expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument()
        })
    })
})