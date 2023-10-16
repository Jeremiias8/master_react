import React, { useEffect, useLayoutEffect, useState, useRef } from 'react'
import '../App.css';

export const EjemploComponent = () => {

    const [mostrar, setMostrar] = useState(false);
    const caja = useRef();
    const boton = useRef();

    {/* useLayoutEffect(() => {
        console.log("useLayoutEffect: componente cargado!");

        let caja = document.querySelector('#caja');
        caja.innerHTML = "Hey, soy la caja";
        // coordenadas de #caja
        console.log(caja.getBoundingClientRect());
        
    }, []); */}

    useLayoutEffect(() => {
        console.log("useEffect: componente cargado!");

        if (caja.current == null) return

        const {bottom} = boton.current.getBoundingClientRect();

        // setTimeout(() => {
            caja.current.style.top = `${bottom + 45}px`;
            caja.current.style.left = `${bottom + 30}px`;

        // }, 1000);

        {/* let caja = document.querySelector('#caja');
        caja.innerHTML = "Hey, soy la caja con useEffect";
        console.log(caja);
        */}
    }, [mostrar]);

  return (
    <div>
        {/* useEff se activa al terminar de renderizarse el component y useLay se ejecuta antes y permite hacer cambios antes que el useEff */}

        <h1>Ejemplo useEffect y useLayoutEffect</h1>

        <button ref={boton} onClick={() => setMostrar(prev => {
            console.log(!prev);
            return !prev;
        })}>Mostrar mensaje</button>

        {mostrar && (
                <div id="caja" ref={caja}>
                    Hola, soy el mensaje de la box {mostrar}
                </div>
        )}

    </div>
  );

}
