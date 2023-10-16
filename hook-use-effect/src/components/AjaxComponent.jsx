import React, { useEffect, useState } from 'react'

export const AjaxComponent = () => {

  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [errores, setErrores] = useState();

    // genérico
    const getUsuariosEstaticos = () => {
        setUsuarios([
            {
                "id": 1,
                "email": "jeruchostil@reqres.in",
                "first_name": "Jerucho",
                "last_name": "Stiltun",
                "avatar": "https://reqres.in/img/faces/7-image.jpg"
              },
              {
                "id": 2,
                "email": "raphinha@reqres.in",
                "first_name": "Raphinha",
                "last_name": "Silva",
                "avatar": "https://reqres.in/img/faces/8-image.jpg"
              },
              {
                "id": 3,
                "email": "joaocan@reqres.in",
                "first_name": "Joao",
                "last_name": "Cancelo",
                "avatar": "https://reqres.in/img/faces/9-image.jpg"
              },
        ]);
    }

    // Petición fetch
    const getUsuariosAjaxPms = () => {
      fetch("https://reqres.in/api/users?page=1")
        .then(respuesta => respuesta.json())
        .then(
          resultado_final => {
            setUsuarios(resultado_final.data);
            console.log(usuarios);
          },
          error => {
            console.log(error);
          }
        );
    }

    // Petición Ajax con Async-Await
    const getUsuariosAjaxAW = () => {

      setTimeout( async () => {

        try {
          const peticion = await fetch("https://reqres.in/api/users?page=1");
          const { data } = await peticion.json();
      
          setUsuarios(data);
          setCargando(false);

        } catch (error) {
          console.log(error);
          setErrores(error.message);
        }
        
      }, 1000);

    }

    // onInit en Ang
    useEffect(() => {
      // getUsuariosEstaticos();
      // getUsuariosAjaxPms();
      getUsuariosAjaxAW();
    }, []);

    if (errores !== "") {

      // Cuando pasa algun error
      return (
        <div className="errores">
          {errores}
        </div>
      );

    } else if (cargando == true) {

      // Cuando esta todo cargando
      return (
        <div className="cargando">
          Cargando...
        </div>
      );

    } else if (cargando == false && errores === "") {

    // Cuando todo ha ido ok
  return (  
    <div>
        <hr />
        <h2>Peticiones Ajax en React</h2>

        <p>Listado usuarios</p>
        <ol className='usuarios'> 
          {
            usuarios.map(usuario => {
              console.log(usuario);

              return (<li key={usuario.id}>
                <img src={ usuario.avatar } width="80" /> 
                &nbsp;
                { usuario.first_name } { usuario.last_name }</li>);
            })
          }
        </ol>
    </div>
  );
  }
}
