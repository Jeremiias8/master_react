import React from "react";
import avatar from '../../../assets/img/avatar.jpg'

export const Nav = () => {
  return (
    <nav className="navbar__container-lists">

      <ul className="container-lists__menu-list">
        <li className="menu-list__item">
          <a href="#" className="menu-list__link">
            <i className="fa-solid fa-house"></i>
            <span className="menu-list__title">Inicio</span>
          </a>
        </li>

        <li className="menu-list__item">
          <a href="#" className="menu-list__link">
            <i className="fa-solid fa-list"></i>
            <span className="menu-list__title">Timeline</span>
          </a>
        </li>

        <li className="menu-list__item">
          <a href="#" className="menu-list__link">
            <i className="fa-solid fa-user"></i>
            <span className="menu-list__title">Gente</span>
          </a>
        </li>
      </ul>

      <ul className="container-lists__list-end">
        <li className="list-end__item">
          <a href="#" className="list-end__link-image">
            <img src={avatar} className="list-end__img" alt="Imágen" />
          </a>
        </li>

        <li className="list-end__item">
          <a href="#" className="list-end__link">
            <span className="list-end__name">Jeremías</span>
            <i className="fa-solid fa-circle-user"></i>
          </a>
        </li>

        <li className="list-end__item">
          <a href="#" className="list-end__link">
            <span className="list-end__name">Ajustes</span>
            <i className="fa-solid fa-gear"></i>
          </a>
        </li>

        <li className="list-end__item">
          <a href="#" className="list-end__link">
            <span className="list-end__name">Cerrar Sesión</span>
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
          </a>
        </li>
      </ul>

    </nav>
  );
}
