import reactLogo from './assets/react.svg'
import { LoginForm } from './components/LoginForm'
import RegistrationForm from './components/RegisterForm'
import viteLogo from '/vite.svg'

function App() {

  return (
    <>
      <div className='flex items-center justify-center h-24 gap-3'>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <h1>Vite + React</h1>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className='w-full max-w-md'>
          <RegistrationForm />
        </div>
        <div className='w-full max-w-md'>
          <LoginForm onSubmit={() => Promise.resolve()} />
        </div>
      </div>
    </>
  )
}

export default App
