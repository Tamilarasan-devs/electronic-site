import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NewPage from './component/NewPage'
function App() {
  const [count, setCount] = useState(0)

  return (
    <NewPage/>
  )
}

export default App
