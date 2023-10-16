import './App.css'
import { AppRouter } from './routing/AppRouter';
import { PruebaContext } from './context/PruebaContext';
import { useState } from 'react';

function App() {

  const [usuario, setUsuario] = useState({
    nick: "@jeremiasweb",
    nombre: "Jere",
    web: "JeremiasWEB"
  });

  /*
  const curso = {
    id: 1,
    titulo: "Máster en React",
    contenido: "Muchas horas de contenido"
  };
  */

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
