import React, { useState } from 'react'

const buttonStyles = {
  fontSize: '13px',
  textAlign: 'center',
  color: '#000',
  padding: '12px 60px',
  boxShadow: '2px 5px 10px rgba(0,0,0,.1)',
  backgroundColor: 'rgb(255, 178, 56)',
  borderRadius: '6px',
  letterSpacing: '1.5px',
}

const buttonDisabledStyles = {
  opacity: '0.5',
  cursor: 'not-allowed',
}

const Checkout = () => {
  const [loading, setLoading] = useState(false)

  const redirectToCheckout = async event => {
    event.preventDefault()
    setLoading(true)

    const cart = {
      line_items: [
        {
          id: '70de22e4-4c92-5934-b4d8-12b2a3223d2e',
          quantity: 1,
          title: 'Product Title',
          variant_title: 'Variant Title',
          weight: 50,
          taxable: true,
          image: 'https://example.com/thing.jpg',
          requires_shipping: true,
          price: 2000,
        },
      ],
    }

    const result = await fetch(
      `${process.env.GATSBY_BOLD_CHECKOUT_URL}/api/v1/byop/${process.env.GATSBY_SHOP_DOMAIN}/carts/create_for_byop`,
      {
        method: 'POST',
        body: JSON.stringify({ cart }),
      }
    )

    const jsonResult = await result.json()

    if (jsonResult.success) {
      const searchParams = new URLSearchParams()
      searchParams.set('platform', 'byop')
      searchParams.set('shop', process.env.GATSBY_SHOP_DOMAIN)
      searchParams.set('cart_id', jsonResult.cart_id)
      searchParams.set(
        'return_url',
        `https://${process.env.GATSBY_SHOP_DOMAIN}`
      )
      const action = `${
        process.env.GATSBY_BOLD_CHECKOUT_URL
      }/boldplatform/checkout/begin_byop?${searchParams.toString()}`
      window.location.replace(action)
    } else {
      alert('Error checking out')
    }
  }

  return (
    <button
      disabled={loading}
      style={
        loading ? { ...buttonStyles, ...buttonDisabledStyles } : buttonStyles
      }
      onClick={redirectToCheckout}
    >
      BUY MY BOOK
    </button>
  )
}

export default Checkout
