// import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { FormularioComponent } from './components/FormularioComponent';

function App() {


  return (
    <>
      <div className="App">

        <header className="App-header">
          <div>
            <a href="https://vitejs.dev" target="_blank">
              <img src={viteLogo} className="App-logo" alt="Vite logo" />
            </a>
            <a href="https://react.dev" target="_blank">
              <img src={reactLogo} className="App-logo react" alt="React logo" />
            </a>
          </div>

          <h1>React - Formularios</h1>

          <FormularioComponent />
        </header>

      </div>
    </>
  );
}

export default App
