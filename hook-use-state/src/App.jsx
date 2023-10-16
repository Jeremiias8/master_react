// import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { MiPrimerEstado } from './components/MiPrimerEstado'
import { EjercicioComponent } from './components/EjercicioComponent'

function App() {

  const fecha = new Date();
  const yearActual = fecha.getFullYear();
  
  return (
    <>
      <div className='App'>

        <header className="App-header">

          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="App-logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="App-logo react" alt="React logo" />
          </a>

          <h1>El estado en React - Hook useState</h1>

          <MiPrimerEstado />

          <EjercicioComponent 
            year={yearActual}
          />
        </header>

      </div>
    </>
  );
}

export default App
