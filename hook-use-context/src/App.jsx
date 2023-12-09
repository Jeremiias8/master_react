import './App.css'
import { AppRouter } from './routing/AppRouter';
import { PruebaContext } from './context/PruebaContext';
import { useEffect, useState } from 'react';

function App() {

  const [usuario, setUsuario] = useState({});

  useEffect(() => {
    console.log("useEffect una vez");

    // la 1era vez que se carga el component
    let usuario_local = JSON.parse(localStorage.getItem("usuario"));

    setUsuario(usuario_local);
  }, []);

  useEffect(() => {
    console.log("useEffect lanzado en usuario !");

    // cada vez que se actualice el estado usuario se guarda en el lS
    localStorage.setItem("usuario", JSON.stringify(usuario));
  }, [usuario]);

  const curso = {
    id: 1,
    titulo: "Máster en React",
    contenido: "Muchas horas de contenido"
  }; 

  return (
    <>
      <div>
        <h1>React - useContext</h1>

        <PruebaContext.Provider value={{
          usuario, 
          setUsuario
        }}>
          <AppRouter />
        </PruebaContext.Provider>
        
      </div>
      
    </>
  )
}

export default App
