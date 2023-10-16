import React, { useEffect, useState } from 'react'
import { Editar } from './Editar';

export const Listado = ({listadoState, setListadoState}) => {

    // const [listadoState, setListadoState] = useState([]);

    const [editar, setEditar] = useState(0);

    useEffect(() => {

        console.log("Componentes del listado de pelis cargado!");
        conseguirPeliculas();

    }, []);

    const conseguirPeliculas = () => {
        // pasar a texto el content de pelis 
        let peliculas = JSON.parse(localStorage.getItem("pelis"));

        setListadoState(peliculas);

        return peliculas;
    }

    const borrarPeli = (id) => {
        // Conseguir pelis almacenadas
        let pelis_almacenadas = conseguirPeliculas();

        // Filtrar esas pelis para que elimine del array la que no quiero
        let nuevo_array_pelis = pelis_almacenadas.filter(peli => 
          peli.id !== parseInt(id));

        console.log(pelis_almacenadas, nuevo_array_pelis);

        // Actualizar estado del listado
        setListadoState(nuevo_array_pelis);

        // Actualizar datos en el localStorage
        localStorage.setItem("pelis", JSON.stringify(nuevo_array_pelis));

        // pelicula.remove();
        // pelicula.delete();
    }

  return (
    <>
        { listadoState !== null ? 
            listadoState.map(peli => {
          
          return (
            <article key={peli.id} className="peli-item">
 
                <h3 className="title">{peli.titulo}</h3>
                <p className="description">{peli.descripcion}</p>

                <button className="edit" 
                onClick={() => setEditar(peli.id)}>Editar</button>
                <button className="delete" 
                onClick={() => borrarPeli(peli.id)}>Borrar</button>

                {/* aparición de form para editar al pulsar */}
                {editar === peli.id && (

                  <Editar peli={peli}
                    conseguirPeliculas={conseguirPeliculas} 
                    setEditar={setEditar}
                    setListadoState={setListadoState}
                  />
                )}

            </article>
          );
        }) 
        : <h2>No hay películas para mostrar</h2>    
    }
    </>
  );

}
