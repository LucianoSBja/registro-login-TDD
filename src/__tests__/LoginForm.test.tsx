import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LoginForm } from '../components/LoginForm'
import { loginApi } from '../api'

describe('LoginForm', () => {
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

    it('should call onSubmit with form data when submitting valid credentials', async () => {
        const user = userEvent.setup()
        const mockOnSubmit = vi.fn(() => Promise.resolve())
        render(<LoginForm onSubmit={mockOnSubmit} />)

        const emailInput = screen.getByLabelText(/Correo electrónico/i)
        const passwordInput = screen.getByLabelText(/Contraseña/i)

        await user.type(emailInput, 'test@test.com')
        await user.type(passwordInput, 'password123')
        await user.click(screen.getByRole('button', { name: /Inicie sesión/i }))

        await vi.waitFor(() => {
            expect(mockOnSubmit).toHaveBeenCalledWith({
                email: 'test@test.com',
                password: 'password123'
            })
        })
    })

    it('should show success message with valid credentials', async () => {
        const user = userEvent.setup()
        const handleSubmit = async (credentials: any) => {
            const response = await loginApi(credentials)
            if (!response.success) throw new Error(response.message)
        }

        render(<LoginForm onSubmit={handleSubmit} />)

        const emailInput = screen.getByLabelText(/Correo electrónico/i)
        const passwordInput = screen.getByLabelText(/Contraseña/i)

        await user.type(emailInput, 'test@test.com')
        await user.type(passwordInput, 'password123')
        await user.click(screen.getByRole('button', { name: /Inicie sesión/i }))

        expect(await screen.findByText(/login successful/i)).toBeInTheDocument()
    })

    it('should show error message with invalid credentials', async () => {
        const user = userEvent.setup()
        const handleSubmit = async (credentials: any) => {
            const response = await loginApi(credentials)
            if (!response.success) throw new Error(response.message)
        }

        render(<LoginForm onSubmit={handleSubmit} />)

        const emailInput = screen.getByLabelText(/Correo electrónico/i)
        const passwordInput = screen.getByLabelText(/Contraseña/i)

        await user.type(emailInput, 'wrong@test.com')
        await user.type(passwordInput, 'wrongpass')
        await user.click(screen.getByRole('button', { name: /Inicie sesión/i }))

        expect(await screen.findByText(/invalid credentials/i)).toBeInTheDocument()
    })
})