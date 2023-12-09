import React, { useState } from 'react'
import '../App.css';
import { useForm } from '../hooks/useForm';

export const MiFormulario = () => {

  const {formulario, enviado, cambiado} = useForm({});

  return (
    <div>
        <h1>Formulario</h1>
        <p>Form para guardar un curso.</p>
        <p>Curso guardado: {formulario.titulo}</p>
        <pre className='codigo'>{JSON.stringify(formulario)}</pre>

        <form onSubmit={enviado} className='mi-formulario'>
            <input type="text" name='titulo' onChange={cambiado} placeholder='Título: ' />
            <input type="number" name='anio' onChange={cambiado} placeholder='Año publicación: ' />
            <textarea name='descripcion' onChange={cambiado} placeholder='Descripción: '></textarea>
            <input type="text" name='autor' onChange={cambiado} placeholder='Autor: ' />
            <input type="email" name='email' onChange={cambiado} placeholder='Correo de contacto: ' />

            <input type="submit" value="Enviar" />
        </form>
    </div>
  );

}
