import reactLogo from './assets/react.svg'
import AuthForms from './components/AuthForms'
import viteLogo from '/vite.svg'

function App() {

  return (
    <>
      <div className='flex items-center justify-center h-24 gap-3'>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="w-12 h-12" alt="Vite logo" />
        </a>
        <h1 className='text-4xl'>Vite + React + Typescript</h1>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="w-12 h-12" alt="React logo" />
        </a>
      </div>
      <AuthForms />
    </>
  )
}

export default App
