import { Route, Routes } from 'react-router'
import './App.css'
import HomePage from './pages/HomePage'
import CheckoutPage from './pages/CheckoutPage'

function App() {

  return (
    <Routes>
      <Route element={<HomePage />} index />
      <Route element={<CheckoutPage />} path="checkout" />
    </Routes>
  )
}

export default App
