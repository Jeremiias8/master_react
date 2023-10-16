import { useState } from 'react'
import { Formulario } from './components/Formulario';
import { Ejemplo } from './components/Ejemplo';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="App">
        <header className="App-header">

          <h1>React - useRef</h1>

          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>

          <Ejemplo />

          <hr />

          <Formulario />
          
        </header>
      </div>
    </>
  );
}

export default App
