import { it, describe, vi, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import axios from 'axios'
import Product from './Product'

vi.mock('axios') //!=> Changes the axios to the fake version

describe('Product component', () => {
      //?=> Fake product to be passed
      let product 
      let loadCart

   beforeEach(() => { //TODO=> This recreates the product and the loadcart functions before each test
      product = {
         id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
         image: "images/products/athletic-cotton-socks-6-pairs.jpg",
         name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
         rating: {
            stars: 4.5,
            count: 87
         },
         priceCents: 1090,
         keywords: ["socks", "sports", "apparel"]
      }

      loadCart = vi.fn() //!=> Mock of the fake function loadCart
   })

   it('it displays the product details correctly', () => {

      render(<Product product={product} loadCart={loadCart} />)

      expect(
         screen.getByText('Black and Gray Athletic Cotton Socks - 6 Pairs')
      ).toBeInTheDocument() //!=> Checks if the given elements exists on the fake page

      expect(
         screen.getByText('$10.90')
      ).toBeInTheDocument()

      expect(
         screen.getByTestId('product-image')
      ).toHaveAttribute('src', 'images/products/athletic-cotton-socks-6-pairs.jpg')

      expect(
         screen.getByTestId('product-rating-stars-img')
      ).toHaveAttribute('src', 'images/ratings/rating-45.png')

      expect(
         screen.getByText('87')
      ).toBeInTheDocument()
   })

   it('adds a product to the cart', async () => {

      render(<Product product={product} loadCart={loadCart} />)

      const user = userEvent.setup()
      const addToCartBtn = screen.getByTestId('add-to-cart-btn')
      await user.click(addToCartBtn)

      expect(axios.post).toHaveBeenCalledWith(
         '/api/cart-items', 
         {
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 1
         }
      )

      expect(loadCart).toHaveBeenCalled()
   })

   it('can select a quantity', async () => {
      render(<Product product={product} loadCart={loadCart} />) //!=> Firstly render the element that you want to test
      const quantitySelector = screen.getByTestId('quantity-selector') //!=> Get the element by data-testid and declare it to the variable
      expect(quantitySelector).toHaveValue('1') //TODO=> Write the test you wanted. Check anything

      const user = userEvent.setup()
      await user.selectOptions(quantitySelector, '3') //TODO=> Change the value of options to 3 and check it again. This is an asynchronous event so we have to await it
      expect(quantitySelector).toHaveValue('3') //?=> Check the value if its updated

      const addToCartBtn = screen.getByTestId('add-to-cart-btn') //?=> Get the add to cart button and save it in a variable
      await user.click(addToCartBtn) //TODO=> Click to the add to cart btn

      expect(axios.post).toHaveBeenCalledWith( //TODO=> After clicking the btn check if the button really contacted with the backend and send the data with correct value
         '/api/cart-items',
         {
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 3
         }
      )

      expect(loadCart).toHaveBeenCalled()
      
   })
})
