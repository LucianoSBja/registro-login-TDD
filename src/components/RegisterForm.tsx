import React from 'react';

const RegisterForm: React.FC = () => {
    return (
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                    Nombre
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="lastname">
                    Apellido
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="lastname"
                    type="text"
                    placeholder="Enter your lastname"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="lastname">
                    Correo Electrónico
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="text"
                    placeholder="Enter your lastname"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="lastname">
                    Teléfono
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="phone"
                    type="text"
                    placeholder="Enter your lastname"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="lastname">
                    Contraseña
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="text"
                    placeholder="Enter your lastname"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="lastname">
                    Confirmar Contraseña
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="confirmpassword"
                    type="text"
                    placeholder="Enter your lastname"
                />
            </div>
            <div className="flex items-center justify-center">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                >
                    Registrarme
                </button>
            </div>
        </form>
    );
};

export default RegisterForm;