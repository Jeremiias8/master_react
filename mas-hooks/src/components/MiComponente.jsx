import React, { useId } from 'react'

export const MiComponente = () => {

    const id = useId();
    const segundo_id = useId();

    console.log(id, segundo_id);

  return (
    <div>
        <h1>Hook useId</h1>

        <input id={id} name='nombre' placeholder='Nombre' />
    </div>
  );

}
