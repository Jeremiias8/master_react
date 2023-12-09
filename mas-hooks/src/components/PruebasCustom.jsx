import React, { useState } from 'react'
import { useMayus } from '../hooks/useMayus';

export const PruebasCustom = () => {

    // const [miTexto, setMiTexto] = useState("Jere Web");
    const { estado, mayusculas, minusculas, concatenar } = useMayus("Jeremías Web");

  return (
    <div>
        <h1>Probando componentes personalizados</h1>
        <h2>{estado}</h2>

        &nbsp;
        <button onClick={ mayusculas }>Poner en mayúsculas</button>

        &nbsp;
        <button onClick={ minusculas }>Poner en minúsculas</button>

        &nbsp;
        <button onClick={ e => concatenar(" - Probando Hooks personalizados") }>Concatenar</button>
    </div>
  );

}
