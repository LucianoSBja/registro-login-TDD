# Test Driven Development para el registro de usuarios e inicio de sesión

Este proyecto es parte de un hackathon en el que se implementa Test Driven Development (TDD) para construir una aplicación de registro e inicio de sesión de usuario, utilizando JavaScript/TypeScript y Jest para las pruebas unitarias. El objetivo principal es garantizar que la funcionalidad esté completamente cubierta por tests antes de escribir el código de implementación.

## Características
- Registro de usuario con los siguientes campos:
    - Nombre
    - Apellido
    - Teléfono de contacto
    - Correo electrónico
    - Contraseña
    - Confirmación de contraseña
- Inicio de sesión utilizando:
    - Correo electrónico
    - Contraseña
- Validaciones de campos (vacíos, formato de correo, coincidencia de contraseñas)
- Mock de API para simular el envío de datos
- Implementación siguiendo el ciclo TDD: Escribir tests, ver que fallan, implementar el código mínimo, y luego refactorizar.

## Requisitos
- Node.js (versión 14 o superior)
- npm o yarn

## Instalación

1. Clona este repositorio:
```bash
git clone https://github.com/tu-usuario/nombre-del-repositorio.git
cd nombre-del-repositorio
```

2. Instala las dependencias:
```bash
npm install
# o si usas yarn
yarn install
```

3. Ejecuta los tests:
```bash
npm test
# o si usas yarn
yarn test
```

## Scripts Disponibles

- npm start: Inicia la aplicación en modo de desarrollo.
- npm test: Ejecuta las pruebas unitarias con Jest.

## Estructura del Proyecto

```plaintext
├── src
│   ├── components
│   │   ├── RegisterForm.jsx       # Componente del formulario de registro
│   │   └── LoginForm.jsx          # Componente del formulario de inicio de sesión
│   └── api
│       └── mockApi.js             # Mock de API para simular el backend
├── tests
│   ├── RegisterForm.test.js       # Tests para el formulario de registro
│   └── LoginForm.test.js          # Tests para el formulario de inicio de sesión
├── jest.config.js                 # Configuración de Jest
└── README.md                      # Documentación del proyecto
```


## Ciclo TDD Implementado
Este proyecto sigue los principios de TDD:
1. **Escribir un test fallido**.
2. **Escribir el código mínimo** necesario para que el test pase.
3. **Refactorizar** el código para mejorar la calidad sin romper los tests.

Ejemplo:
- Test del formulario de registro para asegurar que el correo es obligatorio.
- Luego se implementa la validación del formulario para que el test pase.

## Tecnologías Utilizadas
- React: Para el desarrollo de los formularios de registro e inicio de sesión.
- Tailwind CSS: Para el diseño responsivo (opcional).
- Jest: Para la creación de pruebas unitarias.
- React Testing Library: Para facilitar la prueba de componentes React.
- JavaScript o TypeScript: Según lo decidas para implementar la lógica del proyecto.

## Mock de API
El proyecto incluye un mock de API para simular el backend:

- Registro de usuarios.
- Inicio de sesión.
- Puedes ver el mock de la API en el archivo src/api/mockApi.js.

## Cómo Contribuir
1. Crea un fork del repositorio.
2. Crea una nueva rama (git checkout -b feature-nueva-funcionalidad).
3. Realiza los cambios necesarios y asegúrate de que pasen todos los tests.
4. Realiza un commit (git commit -m 'Agregar nueva funcionalidad').
5. Empuja tus cambios (git push origin feature-nueva-funcionalidad).
6. Abre un Pull Request.
## Documentación y Reflexiones
Documenta todo el progreso del proyecto en un tablero de **Trello**. Cada tarea debe estar dividida, estimada, y marcada como completada al finalizar. Reflexiona sobre los bloqueos o errores encontrados durante el desarrollo y cómo los solucionaste.