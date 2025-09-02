import axios from 'axios'
import { useState, useEffect } from 'react'
import './CheckoutPage.css'
import { CheckoutHeader } from './CheckoutHeader'
import { OrderSummary } from './OrderSummary'
import { PaymentSummary } from './PaymentSummary'

const CheckoutPage = ({ cart, loadCart }) => {
  const [deliveryOptions, setDeliveryOptions] = useState([])
  const [paymentSummary, setPaymentSummary] = useState(null)

  useEffect(() => {
    const getDeliveryOptions = async () => {
      const response = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
      setDeliveryOptions(response.data)
    }
    const getPaymentSummary = async () => {
        const response = await axios.get('/api/payment-summary');
        setPaymentSummary(response.data);
      }
    
    getDeliveryOptions()
    getPaymentSummary()
  },[cart])
    return(
      <>
        <title>Checkout</title>
            <CheckoutHeader />
        <div className="checkout-page">
        <div className="page-title">Review your order</div>
          <div className="checkout-grid">
            <OrderSummary cart={cart} deliveryOptions = {deliveryOptions} loadCart={loadCart} />
            <PaymentSummary paymentSummary={paymentSummary} />
          </div>
        </div>
      </>
    )
}

export default CheckoutPage
