import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Empleados } from './Empleados';

export const Gestion = () => {

    const [nombre, setNombre] = useState("");
    const [pagina, setPagina] = useState(1);
    const gestorInput = useRef();

    const asignarGestor = e => {
        // setNombre(gestorInput.current.value);
        setNombre(e.target.value);
    }

    // si modifico/actualizo el input nombre y/o la página se activa
    useEffect(() => {
        console.log("vista gestión actualizada");
    }, [nombre, pagina]);

    const mostrarMensaje = useCallback(() => {
        console.log("Hola que tal, soy el mensaje enviado desde el component Gestión hacia Empleados mediante la prop !");
    }, [pagina]);

  return (
    <div>
        <h1>Nombre del gestor: {nombre}</h1>
        <form action="">
            <input type="text" ref={gestorInput} onChange={asignarGestor} placeholder="Introduce tu nombre de gestor" />
        </form>

        <h2>Listado de empleados:</h2>
        <p>Los usuarios son gestionados por {nombre} jsonplaceholder.</p>

        <button onClick={() => { setPagina(1) }}>Página 1</button>
        <button onClick={() => { setPagina(2) }}>Página 2</button>

        <Empleados pagina={pagina} mensaje={mostrarMensaje} />
    </div>
  );

}
