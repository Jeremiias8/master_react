import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { Global } from "../../helpers/Global";
import { useAuth } from "../../context/AuthProvider";

export const Login = () => {

  const {compartido} = useAuth();

  const { form, changed } = useForm({});
  const [saved, setSaved] = useState("not_sent");

  const loginUser = async (e) => {
    e.preventDefault();
    console.log(form);

    // datos del formulario
    let userToLogin = form;

    // petición al backend
    const request = await fetch(Global.url + "user/login", {
      method: "POST",
      body: JSON.stringify(userToLogin),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await request.json();

    if (data.status == "success") {
      setSaved("login");

      // persistir los datos en el navegador
      console.log(data);
    
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
    } else {
      setSaved("error");
    }
  };

  return (
    <>
      <header className="content__header content__header--public">
        <h1 className="content__title">Login | {compartido}</h1>

        <button className="btn">
          <NavLink to="/social" className="menu-list__link">
            <i className="fa-solid fa-users"></i>
            &nbsp;
            <span className="menu-list__title">Ir a Social</span>
          </NavLink>
        </button>
      </header>

      <div className="content__posts">
        {saved == "login" ? (
          <strong className="alert alert-success">
            Usuario identificado correctamente !!
          </strong>
        ) : (
          ""
        )}

        {saved == "error" ? (
          <strong className="alert alert-danger">
            Usuario no identificado !!
          </strong>
        ) : (
          ""
        )}

        <form className="form-login" onSubmit={loginUser}>
          <div className="form-group">
            <label htmlFor="email" className="form-control__label">
              Email:
            </label>
            <input
              type="email"
              name="email"
              onChange={changed}
              placeholder="...@.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-control__label">
              Contraseña:
            </label>
            <input type="password" name="password" onChange={changed} />

            <input
              type="submit"
              value="Identificate"
              className="login-btn btn-success"
            />
          </div>
        </form>
      </div>
    </>
  );
};
