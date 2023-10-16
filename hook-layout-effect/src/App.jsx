import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { EjemploComponent } from './components/EjemploComponent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>React - useLayoutEffect</h1>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
       
      </div>

      <EjemploComponent />
      
    </>
  )
}

export default App