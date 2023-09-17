// Importar módulos
import React from "react";

// Función del component
const MiComponente = () => {

    let nombre = "Jerito";
    let gh = "github.com/Jeremiias8";

    let usuario = {
        nombre: "Geronimo",
        apellidos: "Stilton",
        web: "gerostil.com"
    };

    console.log(usuario);

    return (
        <>
            <div>
                <hr />
                <h2>Componente secundario</h2>

                <h3>Lista con contenido</h3>

                <ul>
                    <li>Nombre: {nombre}</li>
                    <li>GitHub: {gh}</li>
                </ul>

                <h3>Datos sacados del JSON</h3>

                <ul>
                    <li>Usu - Nombre: {usuario.nombre}</li>
                    <li>Usu - Apellido/s: {usuario.apellidos}</li>
                    <li>Usu - Web: {usuario.web}</li>
                </ul>
            </div>
        </>
    );
};

// Export
export default MiComponente;