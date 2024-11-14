import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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
        await userEvent.click(submitButton)

        expect(screen.getByText(/email is required/i)).toBeInTheDocument()
        expect(screen.getByText(/password is required/i)).toBeInTheDocument()
    })

    // 3. Test de envío de credenciales
    it('should call onSubmit with form data when submitting valid credentials', async () => {
        const mockOnSubmit = vi.fn()
        render(<LoginForm onSubmit={mockOnSubmit} />)

        await userEvent.type(screen.getByLabelText(/email/i), 'test@test.com')
        await userEvent.type(screen.getByLabelText(/password/i), 'password123')

        const submitButton = screen.getByRole('button', { name: /login/i })
        await userEvent.click(submitButton)

        expect(mockOnSubmit).toHaveBeenCalledWith({
            email: 'test@test.com',
            password: 'password123'
        })
    })

    // 4. Test de integración con API mock
    it('should show success message with valid credentials', async () => {
        render(<LoginForm onSubmit={async () => {
            const response = await loginApi({
                email: 'test@test.com',
                password: 'password123'
            })
            if (!response.success) throw new Error(response.message)
        }} />)

        await userEvent.type(screen.getByLabelText(/email/i), 'test@test.com')
        await userEvent.type(screen.getByLabelText(/password/i), 'password123')

        const submitButton = screen.getByRole('button', { name: /login/i })
        await userEvent.click(submitButton)

        await waitFor(() => {
            expect(screen.getByText(/login successful/i)).toBeInTheDocument()
        })
    })

    it('should show error message with invalid credentials', async () => {
        render(<LoginForm onSubmit={async () => {
            const response = await loginApi({
                email: 'wrong@test.com',
                password: 'wrongpass'
            })
            if (!response.success) throw new Error(response.message)
        }} />)

        await userEvent.type(screen.getByLabelText(/email/i), 'wrong@test.com')
        await userEvent.type(screen.getByLabelText(/password/i), 'wrongpass')

        const submitButton = screen.getByRole('button', { name: /login/i })
        await userEvent.click(submitButton)

        await waitFor(() => {
            expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument()
        })
    })
})