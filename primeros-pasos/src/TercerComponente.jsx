import React from 'react';
import PropTypes from 'prop-types';

export const TercerComponente = ({nombre, apellido, ficha}) => {

  return (
    <div>
        <hr />

        <h1>Comunicación entre componentes - props</h1>
    
        <ul>
            <li>{nombre}</li>
            <li>{apellido}</li>
            <li>{ficha.altura}</li>
            <li>{ficha.estado}</li>
        </ul>
    </div>
  );

}

TercerComponente.propTypes = {
    nombre: PropTypes.string.isRequired,
    apellido: PropTypes.string.isRequired,
    ficha: PropTypes.object
} 

// Default Props
TercerComponente.defaultProps = {
    nombre: "Jerucho",
    apellido: "Serrucho"
}
