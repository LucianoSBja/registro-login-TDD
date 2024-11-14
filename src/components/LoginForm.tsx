// LoginForm.tsx
import { useState } from 'react'

interface LoginFormProps {
    onSubmit: (credentials: { email: string; password: string }) => Promise<void>
}

export function LoginForm({ onSubmit }: LoginFormProps) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
    const [status, setStatus] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Validación
        const newErrors: { email?: string; password?: string } = {}
        if (!email) newErrors.email = 'Email is required'
        if (!password) newErrors.password = 'Password is required'

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        try {
            await onSubmit({ email, password })
            setStatus({ message: 'Login successful', type: 'success' })
        } catch (error) {
            setStatus({
                message: error instanceof Error ? error.message : 'An error occurred',
                type: 'error'
            })
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <span>{errors.email}</span>}
            </div>

            <div>
                <label htmlFor="password">Password:</label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <span>{errors.password}</span>}
            </div>

            {status && (
                <div className={status.type}>
                    {status.message}
                </div>
            )}

            <button type="submit">Login</button>
        </form>
    )
}