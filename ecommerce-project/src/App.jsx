import { Route, Routes } from 'react-router'
import './App.css'
import HomePage from './pages/home/HomePage'
import CheckoutPage from './pages/checkout/CheckoutPage'
import Orders from './pages/orders/Orders'
import Tracking from './pages/Tracking'
import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
    const loadCart = async () => {
      try {
        const response = await axios.get('/api/cart-items?expand=product') //?=> Query parameter
        setCart(response.data)
      } catch(err) {
        throw new Error(`Error occurred while loading the data ${err}`)
      }
  }
  const [cart, setCart] = useState([])
  useEffect(() => {
    loadCart()
  }, [])
  return (
    <Routes>
      <Route element={<HomePage cart={cart} loadCart={loadCart} />} index />
      <Route element={<CheckoutPage cart={cart} loadCart={loadCart} />} path="/checkout" />
      <Route element={<Orders cart={cart} loadCart={loadCart} />} path="/orders" />
      <Route element={<Tracking />} path="/tracking" />
    </Routes>
  )
}

export default App
