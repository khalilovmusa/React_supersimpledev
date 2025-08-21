import { Route, Routes } from 'react-router'
import './App.css'
import HomePage from './pages/HomePage'
import CheckoutPage from './pages/CheckoutPage'
import Orders from './pages/Orders'
import Tracking from './pages/Tracking'

function App() {

  return (
    <Routes>
      <Route element={<HomePage />} index />
      <Route element={<CheckoutPage />} path="/checkout" />
      <Route element={<Orders />} path="/orders" />
      <Route element={<Tracking />} path="/tracking" />
    </Routes>
  )
}

export default App
