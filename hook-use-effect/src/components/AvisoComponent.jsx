import React, { useEffect } from 'react'

export const AvisoComponent = () => {

    useEffect(() => {
        // Cuando el component se monta
        alert("El componente Aviso está montado");

        // Cuando el component se desmonta
        return () => {
            alert("Componente desmontado !");
        }

    }, []); // Se ejecuta 1 vez porque le paso array vacío

  return (
    <div>
        <hr />
        <h3>Hemos superado los 20 cambios</h3>
        <button onClick={ e => {
            alert("Bienvenido !");
        }}>Mostrar alerta</button>
    </div>
  );

}
