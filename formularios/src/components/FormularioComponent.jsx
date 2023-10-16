import React, { useState } from 'react'

export const FormularioComponent = () => {

  const [usuario, setUsuario] = useState({});

  const conseguirDatosFormulario = e => {
    e.preventDefault();

    // para acceder a los campos del form
    let datos = e.target;
    let usuario = {
      nombre: datos.nombre.value,
      apellido: datos.apellido.value,
      genero: datos.genero.value,
      bio: datos.bio.value,
      enviar: datos.enviar.value
    };

    console.log(usuario);

    setUsuario(usuario);
  }

  const cambiarDatos = e => {
    // setUsuario(usuario);
    
    let name_del_input = e.target.name;
    let usuario_para_modificar = usuario;

    // usuario_para_modificar[name_del_input] = e.target.value;
    
    setUsuario(estado_previo => {
      return {
        // ... - clonado de lo anterior
        ...estado_previo,
        [name_del_input]: e.target.value
      }
    });

    console.log(usuario_para_modificar);

    /*
    if (name_del_input === "nombre") {
      usuario_para_modificar.nombre = e.target.value;
    }

    if (name_del_input === "apellido") {
      usuario_para_modificar.apellido = e.target.value;
    }

    if (name_del_input === "genero") {
      usuario_para_modificar.genero = e.target.value;
    }

    if (name_del_input === "bio") {
      usuario_para_modificar.bio = e.target.value;
    }
    */
  }

  return (
    <div>
        <h2>Formulario Component</h2>

        { usuario.bio && usuario.bio.length >= 1 && 
          (
            <div className="info_usuario label label-gray">
              <strong>{usuario.nombre} {usuario.apellido} </strong> 
              es un/a {usuario.genero} <br />
              y su biografía es esta: <p><i>{usuario.bio}</i></p>
            </div>
          )
        }

        <hr />

        <form onSubmit={conseguirDatosFormulario}>
            <input type="text" name='nombre' placeholder='Nombre:' 
            onChange={cambiarDatos} />
            <input type="text" name='apellido' placeholder='Apellido:' 
            onChange={cambiarDatos} />

            <select name='genero' onChange={cambiarDatos}>
                <option value="Hombre">H</option>
                <option value="Mujer">M</option>
            </select>
            <textarea name='bio' placeholder='Biografia' 
            onChange={cambiarDatos}></textarea>

            <input type="submit" value="Enviar" name='enviar' />
        </form>
    </div>
  );

}
