import { Route, Routes } from 'react-router'
import './App.css'
import HomePage from './pages/home/HomePage'
import CheckoutPage from './pages/checkout/CheckoutPage'
import Orders from './pages/orders/Orders'
import Tracking from './pages/Tracking'
import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [cart, setCart] = useState([])
  useEffect(() => {
      const fetchCartData = async () => {
      try {
        const response = await axios.get('/api/cart-items?expand=product') //?=> Query parameter
        setCart(response.data)
      } catch(err) {
        console.error('There is an error ocurred while fetching cart data!:', err)
      }
    }
    fetchCartData()
  }, [])
  return (
    <Routes>
      <Route element={<HomePage cart={cart} />} index />
      <Route element={<CheckoutPage cart={cart} />} path="/checkout" />
      <Route element={<Orders cart={cart} />} path="/orders" />
      <Route element={<Tracking />} path="/tracking" />
    </Routes>
  )
}

export default App
