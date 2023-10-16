import React, { useMemo, useState } from 'react'
import '../App.css';

export const Tareas = () => {

    const [tareas, setTareas] = useState([]);
    const [contador, setContador] = useState(120);

    const guardarTareas = e => {
        e.preventDefault();

        let tareas_actualizadas = [...tareas, e.target.descripcion.value];

        setTareas(tareas_actualizadas);

        console.log(tareas);
    }

    const borrarTarea = id => {
        // filtrar las tareas para borrar la que no quiero
        let nuevas_tareas = tareas.filter((tarea, indice) => indice !== id);

        // setState, guardar el nuevo listado de tareas en el estado    
        setTareas(nuevas_tareas);

    }

    const sumarAlContador = e => {
        setContador(contador + 1);
    }

    const contadoresPasados = (acumulacion) => { 

        for (let i = 0; i <= acumulacion; i++) {
            console.log("ejecutando acumulación de contadores del pasado..");
        }

        return `Contador manual de tareas: ${acumulacion}`;
    }

    // que se utilice la memoria solamente cuando se modifique el contador
    const memoContadores = useMemo(() => 
        contadoresPasados(contador), 
    [contador]);

  return (
    <div className='tareas-container'>
        <hr />
        <h1>Mis Tareas</h1>

        <form onSubmit={guardarTareas}>
            <input type="text" name='descripcion' onChange={() => {}} placeholder='Describe la tarea' />
            <input type="submit" value="Guardar" />

        </form>

        <h3>{memoContadores}</h3>
        <button onClick={sumarAlContador}>Sumar</button>

        <h3>Lista de Tareas: </h3>

        <ul>
            {
                tareas.map((tarea, indice) => {
                    return ( 
                        <li key={indice}>
                            {tarea}
                            &nbsp;
                            <button onClick={() => borrarTarea(indice)}>x</button>
                        </li>
                    );
                })
            }
        </ul>

    </div>
  );

}
