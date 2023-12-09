import React from "react";
import '../../index.css'
import { NavLink } from "react-router-dom";

export const Nav = () => {

  return (
    <nav className="nav">
      <ul>
        <li>
          <NavLink to="/inicio">Inicio</NavLink>
        </li>
        <li>
          <NavLink to="/articulos">Articulos</NavLink>
        </li>
        <li>
          <NavLink to="/crear-articulos">Crear Articulos</NavLink>
        </li>
        <li>
          <NavLink>Contacto</NavLink>
        </li>
      </ul>
    </nav>
  );
  
};
