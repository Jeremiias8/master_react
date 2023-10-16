import viteLogo from '/vite.svg'
import './App.css'
import { Gestion } from './components/Gestion';
// import { Tareas } from './components/Tareas';

function App() {

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
      </div>

      <h1>React - Hook Memo</h1>

      {/* ejercicio con método memo para components */}
      <Gestion/> 

      {/* ejercicio con hook useMemo */}
      {/* <Tareas/> */} 
    </>
  );
}

export default App
