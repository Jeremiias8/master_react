import React from 'react'
import { useState, useEffect, createContext } from 'react';
import {Global} from '../helpers/Global';
// import useAuth from '../hooks/useAuth';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  
    // const [compartido, setCompartido] = useState("Compartida en todos los componentes");
    // const [auth, setAuth] = useState({});
    // const [counters, setCounters] = useState({});

    useEffect(() => {

        authUser();
    }, []);

    const authUser = async () => {

        // sacar datos de usuario identificado del localStorage
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");

        // comprobar si tengo el token y el user
        if (!token || !user) {
            return false;
        }

        // transformar los datos a un obj de JS
        const userObj = JSON.parse(user);
        const userId = userObj.id;

        // petición AJAX al backend que compruebe el token y que me devuelva todos los datos del usuario
        const request = await fetch(Global.url + "user/profile/" + userId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });

        const data = await request.json();
        console.log(data);

        // petición para los contadores
        const requestCounters = await fetch(Global.url + "user/counters/" + userId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });

        // const dataCounters = await requestCounters.json();

        // setear el estado de auth
        {/* 
            setAuth(data.user);
            setCounters(dataCounters);
        */}
    }

    return (<AuthContext.Provider
            value={{ 

            }}
        >
        {children}
    </AuthContext.Provider>
    );

}

export default AuthContext;
