import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { PruebasCustom } from './components/PruebasCustom';
import { MiFormulario } from './components/MiFormulario';
import { MiUsuario } from './components/MiUsuario';

function App() {

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>React - + hooks</h1>

      <MiUsuario />

      {/*
      <hr />
      <MiFormulario />

      <hr />
      <PruebasCustom />
      */}
    </>
  );

}

export default App
