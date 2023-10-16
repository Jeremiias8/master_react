import React, { useEffect, useState } from 'react'
import { AvisoComponent } from './AvisoComponent';

export const PruebasComponent = () => {

  const [usuario, setUsuario] = useState("Jere Robles");
  const [fecha, setFecha] = useState("24-06-1990");
  const [contador, setContador] = useState(0);

  const modUsuario = e => {
    setUsuario(e.target.value);
  };

  const cambiarFecha = e => {
    // setFecha(new Date().toLocaleDateString());
    setFecha(new Date.now());
  }

  // solo se ejecuta una vez, al cargar el component
  useEffect(() => {
    console.log("Has cargado el componente Pruebas o has realizado un cambio en un estado !!");
  }, []);

  // se ejecuta solo si cambio el usuario
  useEffect(() => {

    setContador(contador + 1);
    console.log("Has modificado el usuario: "+contador);

  }, [fecha, usuario]);

  return (
    <div>
        <h2>Componente para el useEffect</h2>

        <strong className={ contador >= 10 ? 'label label-green' : 'label' }>{ usuario }</strong>

        <input type="text"
          onChange={ modUsuario } 
          placeholder='Cambia el nombre' 
        />

        <strong className='label label-green'>{ fecha }</strong>

        <button onClick={ cambiarFecha }>Cambiar fecha</button>

        { contador >= 20 && <AvisoComponent /> }
    </div>
  );

}
