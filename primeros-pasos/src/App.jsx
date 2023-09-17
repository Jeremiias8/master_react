// import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import MiComponente from './MiComponente'
import { SegundoComponente } from './SegundoComponente'
import { TercerComponente } from './TercerComponente'
import { EventosComponente } from './EventosComponente'

function App() {

  const ficha_medica = {
    altura: "180 cm",
    grupo: "H++",
    estado: "Recuperación",
    alergias: "Ninguna"
  };

  // const numero = 12345;

  return (
    <>
      <div className='App'>

        <header className="App-header">
          <h1>Máster de React</h1>

          <img src={viteLogo} className="logo" alt="Vite logo" />
          <img src={reactLogo} className="logo react" alt="React logo" />
        </header>

        <div className="component">
          <EventosComponente />

          <MiComponente />
          <SegundoComponente />
          <TercerComponente 
            
            
            ficha = {ficha_medica}
          />
        </div>

      </div>
    </>
  )
}

export default App
