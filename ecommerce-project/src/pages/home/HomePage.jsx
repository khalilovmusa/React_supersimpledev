import axios from 'axios'
import Header from '../../components/Header'
import './HomePage.css'
import { useEffect, useState } from 'react'
import { ProductsGrid } from './ProductsGrid'

const HomePage = ({ cart }) => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data)
      } catch(err) {
        console.error('There is an error ocurred while fetching products!:', err)
      }
    }
    fetchData()
  }, [])
  return(
    <>
      <title>Ecommerce project</title>
        <Header cart={cart} />
      <div className="home-page">
        <ProductsGrid products={products} />
      </div>
  </>
  )
}

export default HomePage
