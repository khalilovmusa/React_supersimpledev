import { it, describe, vi, expect, beforeEach } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import axios from 'axios'
import HomePage from './HomePage'

vi.mock('axios')

describe('HomePage component', () => {
   let loadCart;
   beforeEach(() => {
      loadCart = vi.fn()

      axios.get.mockImplementation(async (urlPath) => {
         if (urlPath === '/api/products') {
            return {
               data: [
                  {
                     id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                     image: "images/products/athletic-cotton-socks-6-pairs.jpg",
                     name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
                     rating: {
                        stars: 4.5,
                        count: 87
                     },
                     priceCents: 1090,
                     keywords: ["socks", "sports", "apparel"]
                  },
                  {
                     id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                     image: "images/products/intermediate-composite-basketball.jpg",
                     name: "Intermediate Size Basketball",
                     rating: {
                        stars: 4,
                        count: 127
                     },
                     priceCents: 2095,
                     keywords: ["sports", "basketballs"]
                  },
               ]
            }
         }
      })
   })

   it('Displays the products correctly', async () => {
      render(//!=> We use this MemoryRouter because in our code there is a Link component and in order to work the Link component is to be in a Router
            //!=> So, this MemoryRouter component is specially made for testing to mock a real Router
         <MemoryRouter>
            <HomePage cart={[]} loadCart={loadCart} />
         </MemoryRouter>
      )

      //TODO=> The reason of we don't use getAllByTestId and instead we use findAllByTestId is because we have a empty array when we start to the code.
      //TODO=> And the findAllByTestId waits to the elements to render on the page and selects them
      const productContainers = await screen.findAllByTestId('product-container')

      expect(productContainers.length).toBe(2) //?=> To check how many items are displaying on the page

      //!=> within() lets us to find things within a specfic element

      expect(
         within(productContainers[0])
            .getByText('Black and Gray Athletic Cotton Socks - 6 Pairs')
      ).toBeInTheDocument()

      expect(
         within(productContainers[1])
            .getByText('Intermediate Size Basketball')
      ).toBeInTheDocument()
   })
})