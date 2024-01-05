import React, { useEffect, useRef, useReducer } from 'react'
import '../App.css';
import { JuegoReducer } from '../reducers/JuegoReducer';

const init = () => {
    return JSON.parse(localStorage.getItem("juegos")) || [];
}

export const MisJuegos = () => {

    const [juegos, dispatch] = useReducer(JuegoReducer, [], init);

    useEffect(() => {

        localStorage.setItem("juegos", JSON.stringify(juegos));
    }, [juegos]);

    const inputTitulo = useRef();
    const inputDescrip = useRef();
    const inputBtn = useRef();

    const guardarJuegos = e => {
        e.preventDefault();

        let juego = {
            id: new Date().getTime(),
            titulo: e.target.titulo.value,
            descripcion: e.target.descripcion.value
        };

        console.log(juego);

        const accion = {
            type: "crear",
            payload: juego
        };

        dispatch(accion);

        console.log(juegos);

        // localStorage.setItem('juegos', juego);
    }

    const borramelo = id => {
        const accion = {
            type: "borrar",
            payload: id
        };

        dispatch(accion);
    }

    const editar = (e, id) => {
        console.log(e.target.value, "editando", id);

        let juego = {
            id,
            titulo: e.target.value,
            descripcion: e.target.value
        };

        const accion = {
            type: "editar",
            payload: juego
        };

        dispatch(accion);
    }

  return (
    <div>
        <hr />
        <h1>Estos son mis juegos: </h1>

        <p>Número de videojuegos: {juegos.length}</p>

        <ul>
            {
                
                juegos.map(juego => (
                    <li key={juego.id}>
                        {juego.titulo} | {juego.descripcion}

                        &nbsp; <button 
                        onClick={ e => borramelo(e, juego.id)}>x</button>
                        &nbsp; <input type="text" 
                        onBlur={ e => editar(e, juego.id)}
                        onKeyPress={ e => {
                            if (e.key == "Enter") {
                                editar(e, juego.id);
                                console.log("presionaste enter");
                            }
                        }}
                        />
                    </li>
                ))
            }
        </ul>

        <h3>Agregar Juego</h3>

        <form onSubmit={guardarJuegos}>
            <input type="text" name='titulo' 
            ref={inputTitulo} placeholder='Título' />

            <textarea name="descripcion" ref={inputDescrip} placeholder='Descripción'></textarea>

            <input type="submit" ref={inputBtn} value="Guardar" />
        </form>
    </div>
  );

}
