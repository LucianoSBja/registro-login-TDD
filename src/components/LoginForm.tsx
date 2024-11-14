import { FormEvent, useState } from 'react'

interface LoginFormProps {
    onSubmit: (credentials: { email: string; password: string }) => Promise<void>
}

export function LoginForm({ onSubmit }: LoginFormProps) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
    const [status, setStatus] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        setErrors({});
        setStatus(null);

        const newErrors: { email?: string; password?: string } = {};
        if (!email) newErrors.email = 'Se requiere correo electrónico';
        if (!password) newErrors.password = 'Se requiere contraseña';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsLoading(true);
        try {
            const response = await onSubmit({ email, password });

            if (response.success) {
                setStatus({ message: 'Inicio de sesión exitoso', type: 'success' });
            } else {
                setStatus({ message: response.message, type: 'error' });
            }
        } catch (error) {
            setStatus({
                message: error instanceof Error ? error.message : 'Ocurrió un error inesperado.',
                type: 'error',
            });
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Correo electrónico:
                </label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.email && <span className="text-red-600 text-sm">{errors.email}</span>}
            </div>

            <div className="flex flex-col">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Contraseña:
                </label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.password && <span className="text-red-600 text-sm">{errors.password}</span>}
            </div>

            {isLoading && (
                <div data-testid="loading-indicator" className="p-4 text-sm text-blue-600">
                    Cargando...
                </div>
            )}

            {status && (
                <div
                    data-testid="message"
                    className={`p-4 mt-4 text-sm rounded-md ${status.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
                        }`}
                >
                    {status.message}
                </div>
            )}

            <button
                type="submit"
                disabled={isLoading}
                className={`w-full px-4 py-2 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${isLoading ? 'bg-indigo-300' : 'bg-indigo-600 hover:bg-indigo-700'
                    }`}
            >
                {isLoading ? 'Enviando...' : 'Inicie sesión'}
            </button>
        </form>
    )
}