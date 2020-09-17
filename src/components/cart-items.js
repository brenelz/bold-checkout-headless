import React from 'react'

import { useShoppingCart } from 'use-shopping-cart'

export function CartItems() {
  const {
    cartDetails,
    decrementItem,
    incrementItem,
    removeItem
  } = useShoppingCart()

 const cardStyles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    padding: '1rem',
    marginBottom: '1rem',
    boxShadow: '5px 5px 25px 0 rgba(46,61,73,.2)',
    backgroundColor: '#fff',
    borderRadius: '6px',
    minHeight: '235px',
  };

  const redirectToCheckout2 = async event => {
    event.preventDefault()
    let lineItems = [];

    for (const sku in cartDetails) {
        const cartEntry = cartDetails[sku]
        lineItems.push({
            id: cartEntry.id,
            quantity: cartEntry.quantity,
            title: cartEntry.name,
            variant_title: cartEntry.name,
            weight: cartEntry.weight,
            taxable: cartEntry.taxable,
            image: cartEntry.image,
            requires_shipping: cartEntry.requires_shipping,
            price: cartEntry.price,
        })
    }

    const cart = {
      line_items: lineItems
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

  const cart = []

  for (const sku in cartDetails) {
    const cartEntry = cartDetails[sku]
    // all of your basic product data still exists (i.e. name, image, price)
    cart.push(
      <fieldset style={cardStyles}>
        <div>
          <div style={{float: `left`, width: '21%'}}>
            <h3>{cartEntry.name}</h3>
            <img style={{float: `left`, width: `50%`}} src={cartEntry.image}></img>
          </div>
          <div style={{float: `left`, width: '79%'}}>
            <div style={{textAlign: `right`}}>Line total: {cartEntry.formattedValue}</div>
            <div style={{float: `right`, position: `relative`, top: `75px`}}>
              <button
                onClick={() => decrementItem(cartEntry.sku)}
                className={'bv-button'}
                aria-label={`Remove one ${cartEntry.name} from your cart`}
                style={{
                  float:`left`
                }}
              >
                -
              </button>
              <div
                style={{
                  float: `left`,
                  marginLeft: `10px`,
                  marginRight: `10px`
                }}
              >
                Quantity: {cartEntry.quantity}
              </div>
              <button
                onClick={() => incrementItem(cartEntry.sku)}
                className={'bv-button'}
                aria-label={`Add one ${cartEntry.name} to your cart`}
                style={{
                  float:`left`
                }}
              >
                +
              </button>
            </div>
            <br/>
            <br/>
            <button
                onClick={() => removeItem(cartEntry.sku)}
                aria-label={`Remove all ${cartEntry.name} from your cart`}
                className={'bv-button bv-button--primary'}
                style={{
                  float: `right`,
                  position: `relative`,
                  top: `100px`
                }}
              >
               <span className={'bv-button__text'}>Remove</span>
            </button>
          </div>
        </div>

      </fieldset>
    )
  }

  cart.push(
    <button onClick={redirectToCheckout2} className={'bv-button bv-button--primary'}  >
        Checkout!
    </button>
  )

  return cart
}