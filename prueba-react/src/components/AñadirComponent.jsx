import React, { useState } from 'react'
import { VscAdd } from "react-icons/vsc";

export const AñadirComponent = () => {

  const [anadirPago, setAnadirPago] = useState('');
  const [pagos, setPagos] = useState([]);

  let siguienteId = 0;

  return (
    <div>
        <button onClick={() => {
          pagos.push({
            id: siguienteId++
          })
        }}>
            <VscAdd />
            &nbsp;
            Añadir fecha / personas
        </button>

        {/* <input type="number" onChange={e => setAnadirPago(e.target.value)} />

        <ul>
          {pagos.map(pago => (
            <li key={pago.id}>{pago}</li>
          ))}
          </ul> */}
    </div>
  );

}
