import { Route, Routes } from 'react-router'
import './App.css'
import HomePage from './pages/HomePage'

function App() {

  return (
    <Routes>
      <Route element={<HomePage />} index />
      <Route element={<div>Test checkout</div>} path="checkout" />
    </Routes>
  )
}

export default App
