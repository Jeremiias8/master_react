import React, { useState } from 'react'
import { GuardarEnStorage } from '../helpers/GuardarEnStorage';

export const Crear = ({setListadoState}) => {

    const tituloComponente = "Añadir película";
    const [peliState, setPeliState] = useState({
      titulo: '',
      descripcion: ''
    });

    const { titulo, descripcion } = peliState;

    const conseguirDatosForm = e => {
      e.preventDefault();

      // Conseguir datos del form
      let target = e.target;
      let titulo = target.titulo.value;
      let descripcion = target.descripcion.value;

      // alert("formulario enviado !, titulo: "+ titulo + ", y descripcion: " + descripcion);
    
      // Crear obj de peli a guardar
      let peli = {
        id: new Date().getTime(),
        titulo,
        descripcion
      };

      // Guardar estado
      setPeliState(peli);

      // Actualizar el estado del listado principal
      setListadoState(elementos => {
        return [...elementos, peli];
      });

      // Guardar en almacenamiento local
      GuardarEnStorage("pelis", peli);
      // GuardarEnStorage("copia_datos", peli);
    }

    

  return (
    <div className="add">
        <h3 className="title">{tituloComponente}</h3>

        <strong>
          {(titulo && descripcion) && "Has creado la pelicula: " +peliState.titulo}
        </strong>

        <form onSubmit={conseguirDatosForm}>
            <input type="text" 
            id='titulo' 
            name='titulo'
            placeholder="Título" />

            <textarea 
            id='descripcion' 
            name='descripcion'
            placeholder="Descripción">
            </textarea>

            <input type="submit"
            id='save' 
            value="Guardar" />
        </form>
    </div>
  );

}
