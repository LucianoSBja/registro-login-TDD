import React, { useState } from 'react';

const RegisterForm: React.FC = () => {
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});


    const isValidEmail = (email: string): boolean => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };
    const isStrongPassword = (password: string): boolean => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
    };
    const isValidPhone = (phone: string): boolean => {
        return /^\+?[\d\s-]{10,}$/.test(phone);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Form submitted:', { name, lastname, email, phone, password });
        const newErrors: { [key: string]: string } = {};

        // Existing validations
        if (!name) newErrors.name = 'Nombre es requerido';
        if (!lastname) newErrors.lastname = 'Apellido es requerido';
        if (!email) newErrors.email = 'Correo electrónico es requerido';
        if (!phone) newErrors.phone = 'Teléfono es requerido';
        if (!password) newErrors.password = 'Contraseña es requerida';
        if (!confirmPassword) newErrors.confirmPassword = 'Confirmar contraseña es requerido';

        // Enhanced validations
        if (email && !isValidEmail(email)) {
            newErrors.email = 'Correo electrónico no es válido';
        }
        if (phone && !isValidPhone(phone)) {
            newErrors.phone = 'Número de teléfono no es válido';
        }
        if (password && !isStrongPassword(password)) {
            newErrors.password = 'La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas, números y caracteres especiales';
        }
        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Las contraseñas no coinciden';
        }

        setErrors(newErrors);

        // Submit form if no errors
        if (Object.keys(newErrors).length === 0) {
            setIsSubmitting(true);
            console.log('Form submitted:', { name, lastname, email, phone, password });
            setTimeout(() => {
                setIsSubmitting(false); // Simulate a successful submission
            }, 2000); // Simulating some delay (e.g., API call)
        }
    };




    return (
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md" onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                    Nombre
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    type="text"
                    placeholder="Ingresa tu nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="lastname">
                    Apellido
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="lastname"
                    type="text"
                    placeholder="Ingresa tu apellido"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                />
                {errors.lastname && <p className="text-red-500 text-xs">{errors.lastname}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                    Correo Electrónico
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="Ingresa tu correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="phone">
                    Teléfono
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="phone"
                    type="text"
                    placeholder="Ingresa tu teléfono"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                    Contraseña
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="Ingresa tu contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="confirmPassword">
                    Confirmar Contraseña
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="confirmPassword"
                    type="password"
                    placeholder="Ingresa tu contraseña de confirmación"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword}</p>}
            </div>

            <div className="flex items-center justify-center">
                <button
                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    type="submit"
                    disabled={isSubmitting}
                    data-testid="register-button"
                >
                    {isSubmitting ? 'Procesando...' : 'Registrarme'}
                </button>
            </div>
        </form>
    );
};

export default RegisterForm;