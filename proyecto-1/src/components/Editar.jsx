import React from 'react'

export const Editar = ({peli, conseguirPeliculas, setEditar, setListadoState}) => {

    const titulo_componente = "Editar película";

    const guardarEdicion = (e, id) => {
        e.preventDefault();

        // Conseguir el target del evento
        let target = e.target;

        // Buscar el indice del obj de la película a actualizar
        const pelis_almacenadas = conseguirPeliculas();

        // Sacar indice / posicion del obj
        const indice = pelis_almacenadas.findIndex(peli => peli.id === id);

        // console.log(indice);
    
        // Crear obj con ese índice, título y descripción del form
        let peli_actualiza = {
            id,
            titulo: target.titulo.value,
            descripcion: target.descripcion.value
        };

        // Actualizar element con ese índice
        pelis_almacenadas[indice] = peli_actualiza;

        // Guardar nuevo array de objects en el localStorage
        localStorage.setItem("pelis", JSON.stringify(pelis_almacenadas));

        // actualizar estados
        setListadoState(pelis_almacenadas);
        setEditar(0);
    }

  return (
    <div className='edit_form'>
        <h3 className="title">{titulo_componente}</h3>

        <form onSubmit={ e => guardarEdicion(e, peli.id) }>
            <input type="text"
                name='titulo'
                className='titulo_editado'
                defaultValue={peli.titulo}
            />

            <textarea
                name='description'
                className='descripcion_editada'
                defaultValue={peli.descripcion}
            />

            <input type="submit" className="editar" value="Actualizar" />
        </form>
    </div>
  );

}
