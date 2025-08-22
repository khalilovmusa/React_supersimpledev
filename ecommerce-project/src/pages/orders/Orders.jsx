import axios from 'axios'
import { useState, useEffect, Fragment } from 'react'
import dayjs from 'dayjs'
import { OrderHeader } from './OrderHeader'
import Header from '../../components/Header'
import './Orders.css'

const Orders = ({ cart }) => {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const fetchOrders = async () => {
      const request = await axios.get('/api/orders?expand=products')
      setOrders(request.data)
    }
    fetchOrders()
  },[])
   return(
      <>
      <title>Orders</title>
      <Header cart={cart} />

    <div className="orders-page">
      <div className="page-title">Your Orders</div>

      <div className="orders-grid">
        {orders.map((order) => {
          return(
        <div key={order.id} className="order-container">
          <OrderHeader order={order} />
          <div className="order-details-grid">
            {order.products.map((orderProduct) => {
              return(<Fragment key={orderProduct.product.id}>
            <div className="product-image-container">
              <img src={orderProduct.product.image} />
            </div>

            <div className="product-details">
              <div className="product-name">
                {orderProduct.product.name}
              </div>
              <div className="product-delivery-date">
                Arriving on: {dayjs(orderProduct.estimatedDeliveryTimeMs).format('MMMM D')}
              </div>
              <div className="product-quantity">
                Quantity: {orderProduct.quantity}
              </div>
              <button className="buy-again-button button-primary">
                <img className="buy-again-icon" src="images/icons/buy-again.png" />
                <span className="buy-again-message">Add to Cart</span>
              </button>
            </div>

            <div className="product-actions">
              <a href="/tracking">
                <button className="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
              </Fragment>)
            })}
          </div>
        </div>
          )
        })}
      </div>
    </div>
      </>
   )
}

export default Orders 
