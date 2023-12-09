import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { Peticion } from '../../helpers/Peticion';
import { Global } from '../../helpers/Global';

export const Editar = () => {

  const {formulario, enviado, cambiado} = useForm({});
  const [resultado, setResultado] = useState("no_enviado");
  const [articulo, setArticulo] = useState({});
  const params = useParams();

  useEffect(() => {
    conseguirArticulos();
  }, []);

  const conseguirArticulos = async () => {

    const { datos } = await Peticion(Global.url+"articulo/" + params.id, {method: 'GET'});

    if (datos.status === "success") {
      setArticulo(datos.articulo);
    }

  }

  const editarArticulo = async (e) => {
    e.preventDefault();

    // recoger datos form
    let nuevoArticulo = formulario;
    console.log(nuevoArticulo);

    // guardar articulos en backend
    const {datos} = await Peticion(Global.url + "articulo/" + params.id, "POST", nuevoArticulo);

    if (datos.status === "success") {
      setResultado("guardado");
    } else {
      setResultado("error");
    }

    // subir imágen
    const fileInput = document.querySelector('#file');

    if (datos.status === "success" && fileInput.files[0]) {
      setResultado("guardado");

      const formData = new FormData();
      formData.append('file0', fileInput.files[0]);

      const subida = await Peticion(Global.url+"subir-imagen/"+datos.articulo._id, "POST", formData, true);

      if (subida.status === "success") {
        setResultado("guardado");
      } else {
        setResultado("error");
      }

    } 

    console.log(resultado);

  }

  return (
    <div className='jumbo'>
      <h1>Editar Artículo</h1>
      <p>Formulario para editar: {articulo.titulo}</p>
      <pre>{JSON.stringify(formulario)}</pre>

      <strong>
        {resultado == "guardado" ? "Articulo guardado con éxito !" : ""}
      </strong>

      <strong>
        {resultado == "error" ? "Los datos proporcionados son incorrectos" : ""}
      </strong>

      <form className='formulario' onSubmit={editarArticulo}>

        <div className="form-group">

          <label htmlFor="titulo">Título</label>
          <input type="text" name="titulo" onChange={cambiado} defaultValue={articulo.titulo} />

        </div>

        <div className="form-group">

          <label htmlFor="contenido">Contenido</label>
          <textarea type="text" name="contenido" onChange={cambiado} defaultValue={articulo.contenido} />

        </div>

        <div className="form-group">

          <label htmlFor="file0">Imágen</label>

          <div className="mascara">
              {articulo.imagen != "default.png" && 
                <img src={Global.url + "imagen/" + articulo.imagen} />}
              {articulo.imagen == "default.png" && 
                <img src="https://cdn.iconscout.com/icon/free/png-256/free-nodejs-2-226035.png" />}
          </div>

          <input type="file" name="file0" id='file' />
        </div>

        <input type="submit" value="Guardar" className='btn btn-success' />

      </form>
    </div>
  );

}
