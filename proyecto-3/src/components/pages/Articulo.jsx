import React, { useState, useEffect } from 'react'
import "../../index.css";
import { useParams } from 'react-router-dom';

import { Global } from '../../helpers/Global';
import { Peticion } from '../../helpers/Peticion';

export const Articulo = () => {

  const [articulo, setArticulo] = useState([]);
  const [cargando, setCargando] = useState(true);
  const params = useParams();

  useEffect(() => {
    conseguirArticulos();
  }, []);

  const conseguirArticulos = async () => {

    const { datos, cargando } = await Peticion(Global.url+"articulo/" + params.id, {method: 'GET'});

    if (datos.status === "success") {
      setArticulo(datos.articulo);
    }

    setCargando(false);
  }

  return (
    <div className='jumbo'>
        { cargando ? "Cargando..." : 
            articulo.length >= 1 ? 
              (
                <>
                  <div className="mascara">
                    {articulo.imagen != "default.png" && 
                      <img src={Global.url + "imagen/" + articulo.imagen} />}
                    {articulo.imagen == "default.png" && 
                      <img src="https://cdn.iconscout.com/icon/free/png-256/free-nodejs-2-226035.png" />}
                  </div>
                
                  <h1>{articulo.titulo}</h1>
                  <span>{articulo.fecha}</span>
                  <p>{articulo.titulo}</p>
                </>
              ) 
              : <h1>No hay datos en el artículo...</h1>
        }
    </div>
  );

}
