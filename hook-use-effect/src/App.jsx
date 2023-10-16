import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { PruebasComponent } from './components/PruebasComponent'
import { AjaxComponent } from './components/AjaxComponent'

function App() {

  const [count, setCount] = useState(0)

  return (
    <>
      <div className='App'>
        <header className="App-header">

          <div>
            <a href="https://vitejs.dev" target="_blank">
              <img src={viteLogo} className="App-logo" alt="Vite logo" />
            </a>
            <a href="https://react.dev" target="_blank">
              <img src={reactLogo} className="App-logo react" alt="React logo" />
            </a>
          </div>

          <h1>React Hooks - useEffect</h1>

          <div className="card">
            <button onClick={() => setCount((count) => count + 1)}>
              count is {count}
            </button>
          </div>

          <div>
            <PruebasComponent />

            <AjaxComponent />
          </div>

        </header>
      </div>
    </>
  );
}

export default App
