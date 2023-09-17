import React from 'react'

export const SegundoComponente = () => {

    const libros = ["Harry Potter", "Marvel", "Spider-Man"];

  return (
    <div className="segundo-componente">
        <hr />

        <h3>Sección de Libros</h3>

        {/* Condicional */}
        {libros.length >= 1 ? (
            <ul>
                {
                    libros.map((libro, indice) => {
                        return <li key={indice}>{libro}</li>
                    })
                }
            </ul>
        )
        : (
            <p>No hay libros...</p>
            )
        }
    </div>
  );

}
