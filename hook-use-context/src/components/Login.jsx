import React, { useContext } from 'react'
import '../App.css';
import { PruebaContext } from '../context/PruebaContext';

export const Login = () => {

  const {usuario, setUsuario} = useContext(PruebaContext);

  const guardarDatos = e => {
    e.preventDefault();

    let usuario_identificado = {
      nick: e.target.nick.value,
      nombre: e.target.nombre.value,
      web: e.target.web.value
    };

    console.log(usuario);
    setUsuario(usuario_identificado);
  }

  return (
    <div>
      <h1>Login</h1>
      <p>Página de identificación
      </p>

      <form className='login' onSubmit={guardarDatos}>

        <input type="text" name='nick' placeholder='Nickname: ' />
        <input type="text" name='nombre' placeholder='Nombre: ' />
        <input type="text" name='web' placeholder='Web: ' />

        <input type="submit" value="Enviar" />

      </form>
    </div>
  )
}
