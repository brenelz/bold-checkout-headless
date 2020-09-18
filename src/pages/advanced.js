import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

import Products from '../components/Products/Products'

import { CartItems } from '../components/cart-items';

import { loadStripe } from '@stripe/stripe-js'
import { CartProvider } from 'use-shopping-cart'
import { useShoppingCart } from 'use-shopping-cart'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_API_PUBLIC)

export const query = graphql`
  query {
    allContentfulProduct {
      nodes {
        id
        title
        variantTitle
        weight
        taxable
        image
        requiresShipping
        price
      }
    }
  }
`

const AdvancedExamplePage = ({ data }) => (
  <CartProvider
    stripe={stripePromise}
    successUrl="stripe.com"
    cancelUrl="twitter.com/dayhaysoos"
    currency="USD"
    allowedCountries={['US', 'GB', 'CA']}
    billingAddressCollection={true}
  >
  <Layout>
      <SEO title="BYOP Checkout Example" />
      <Products products={data.allContentfulProduct.nodes} />
      <h2>Your Cart</h2>
      <CartItems/>
      <br /><br />
      <Link className={'bv-button'} to="/">Go back</Link>
    </Layout>
  </CartProvider>
)

export default AdvancedExamplePage
