// import { useState } from 'react'
import './App.css'

import { DatePickerComponent } from './components/DatePickerComponent'
import { AñadirComponent } from './components/AñadirComponent'
import { PersonasComponent } from './components/PersonasComponent'
import { PagosTotalesComponent } from './components/PagosTotalesComponent';

function App() {

  return (
    <>
     <div className="App">
        <p>Información de pagos <span className="text-max">indica un máximo de 4</span></p>

      <DatePickerComponent />
      <AñadirComponent />

      <div>
        <PersonasComponent />
      </div>

      <div>
        <PagosTotalesComponent />
      </div>

     </div>
    </>
  );
  
}

export default App
