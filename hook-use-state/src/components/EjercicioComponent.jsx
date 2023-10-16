import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const EjercicioComponent = ({year}) => {

    const [yearNow, setYearNow] = useState(year);

    const siguiente = e => {
        setYearNow(yearNow + 1);
    }

    const anterior = e => {
        setYearNow(yearNow - 1);
    }

    const cambiarYear = e => {
        let dato = parseInt(e.target.value);

        if (Number.isInteger(dato)) {
            setYearNow(dato); 
        } else {
            setYearNow(year);
        }

    }

  return (
    <>
        <div>
            <hr />

            <h1>Ejercicio 1</h1>

            <span>
                <p>Cambiar año - {yearNow}</p>
            </span>

            <button className='btn-next' onClick={siguiente}>
            Año siguiente</button>
            <button className='btn-before' onClick={anterior}>
            Año anterior</button>

            <p>Cambiar año:
                <input type="text" onChange={ cambiarYear } placeholder='Cambia el año' />
            </p>
        </div>
    </>
  );

}

EjercicioComponent.propTypes = {
    year: PropTypes.number.isRequired
}
