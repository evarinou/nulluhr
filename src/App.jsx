import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Character from './pages/Character'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/charakter/:id" element={<Character />} />
    </Routes>
  )
}

export default App
