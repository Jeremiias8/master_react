import React from 'react';
import './index.css'

export const EventosComponente = () => {

    const hasDadoClick = (e, nombre) => {
        alert("Has dado click al botón ! "+nombre);
    }

    function hasDadoDobleClick (e) {
        alert("Has dado doble click !!");
    }

    const hasEntrado = (e, accion) => {
        console.log(`Has ${accion} a la caja con el mouse !`);
    }

    const estasDentro = e => {
        console.log("Estás dentro del input, introduce tu nombre !");
    }

    const estasFuera = e => {
        console.log("Estás fuera del input, no vuelvas más");
    }

  return (
    <div>
        <h1>Eventos en React</h1>

        <p>
            {/* onClick */}
            <button onClick={e => hasDadoClick(e, "Jeremías Developer")}>Clickeame</button>
        </p>

        <p>
            {/* doubleClick */}
            <button onDoubleClick={ hasDadoDobleClick }>Clickeame dos veces</button>
        </p>

        <div id="caja" 
            onMouseEnter={ e => hasEntrado(e, "entrado") }
            onMouseLeave={ e => hasEntrado(e, "salido") }
        >
            {/* onMouseEnter and Leave */}
            Pasa por encima mío
        </div>

        <p>
            {/* onFocus and onBlur */}
            <input type="text" className='input-focus' 
                onFocus={ estasDentro } 
                onBlur={ estasFuera }
                placeholder='Introduce tu nombre' />
        </p>

    </div>
  );

}
