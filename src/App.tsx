import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import RegistrationForm from "./components/forms/RegistrationForm";

function App() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <div className="flex items-center">
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <h1>Vite + React + TS + Jest = ❤</h1>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <RegistrationForm />

      </div>
    </>
  );
}

export default App;
