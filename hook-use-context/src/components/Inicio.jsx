import React, { useContext } from 'react'
import { PruebaContext } from '../context/PruebaContext'

export const Inicio = () => {

  const {usuario, setUsuario} = useContext(PruebaContext);

  return (
    <div>
      <h1>Inicio</h1>
      <p>Página de inicio</p>
      <p>Nombre: {usuario.nombre}, y Web: {usuario.web}</p> 

      {/* <p>Titulo compartido: <strong>{compartida.titulo}</strong></p>
      <p>Descripción compartida: <strong>{compartida.contenido}</strong></p> */}
    </div>
  )
}
