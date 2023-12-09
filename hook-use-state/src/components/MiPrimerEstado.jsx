import React, { useState } from 'react'

export const MiPrimerEstado = () => {

    /* let nombre = "Jerito Fer";

    const cambiarNombre = e => {
        nombre = "Jere F";
    } */

    const [nombre, setNombre] = useState("VR + JF");

    const cambiarNombre = (e, nombreFijo) => {
        setNombre(nombreFijo);
        console.log(e.target);
    }

  return (
    <>
        <div>
            <h3>Componente: MiPrimerEstado</h3>

            <strong className='label'>
                {nombre}
            </strong> <br />

            <button 
                onClick={ e => cambiarNombre(e, "Jerito") }
            >
            Cambiar nombre</button> <br />

            <input type="text" 
                onChange={ e => cambiarNombre(e, e.target.value) } placeholder='Cambia el nombre' 
            />

        </div>
    </>
  );

}
