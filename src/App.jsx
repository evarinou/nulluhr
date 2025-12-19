import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Character from './pages/Character'
import AudioVisualizer from './components/AudioVisualizer'

function App() {
  return (
    <>
      {/* Globaler AudioVisualizer + Musik */}
      <AudioVisualizer />

      {/* Globale Rave-Effekte */}
      <div className="scanlines-animated" />
      <div className="flicker-overlay" />
      <div className="fog-layer fog-layer-1" />
      <div className="fog-layer fog-layer-2" />

      {/* Seiten-Content */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/charakter/:id" element={<Character />} />
      </Routes>
    </>
  )
}

export default App
