import React, { useState } from 'react'
import { useAjax } from '../hooks/useAjax';

export const MiUsuario = () => {

    const [url, setUrl] = useState("https://reqres.in/api/users/1");
    const {datos, cargando} = useAjax(url);

    const [nombre, setNombre] = useState("Jeremías");
    const [user, setUser] = useState("GitHub: Jeremiias8");
    
    const getId = e => {
        let id = parseInt(e.target.value);
        setUrl("https://reqres.in/api/users/"+id);
    }

    setTimeout(() => {

      setNombre("Jeritto");
      setUser("undefined :(");

      console.log("setTimeOut, ejecutado !");
    }, 4000);

  return (
    <div>
        <h1>Mi usuario: {nombre}</h1>
        <p>Datos del usuario: {user}</p>

        <span>{cargando ? "Cargando..." : ""}</span>
        <p>{datos?.first_name} {datos?.last_name}</p>

        <input type="number" name='id' onChange={ getId } />
    </div>
  );

}
