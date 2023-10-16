import React, { useRef } from 'react'
import '../Index.css'

export const Formulario = () => {

  const nombreInput = useRef();
  const apellidoInput = useRef();
  const emailInput = useRef();
  const miCaja = useRef();

  const mostrar = e => {
    e.preventDefault();

    console.log(nombreInput.current.value);
    console.log(apellidoInput.current.value);
    console.log(emailInput.current.value);

    // miCaja
    console.log(miCaja);
    let { current: caja } = miCaja;

    caja.classList.add("fondoVerde");
    caja.innerHTML = "Formulario enviado !";
  }

  return (
    <div>
        <h1>Formulario</h1>

        <div ref={miCaja} className='miCaja'>
          <h2>Pruebas con useRef</h2>
        </div>

        <form className='form' onSubmit={mostrar}>
            <input type="text" placeholder='Nombre' 
            ref={nombreInput} />
            <input type="text" placeholder='Apellidos' 
            ref={apellidoInput} />
            <input type="email" placeholder='Correo Electrónico' 
            ref={emailInput} />

            <input type="submit" value="Send" />
        </form>

        <button onClick={() => nombreInput.current.select() }>Empezar a rellenar form</button>
    </div>
  );

}
