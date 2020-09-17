import React, { useState } from 'react'
import { useShoppingCart, formatCurrencyString } from 'use-shopping-cart'

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
  maxWidth: '240px',
}
const buttonStyles = {
  display: 'block',
  fontSize: '13px',
  textAlign: 'center',
  color: '#000',
  padding: '12px',
  boxShadow: '2px 5px 10px rgba(0,0,0,.1)',
  backgroundColor: 'rgb(255, 178, 56)',
  borderRadius: '6px',
  letterSpacing: '1.5px',
}

const buttonDisabledStyles = {
  opacity: '0.5',
  cursor: 'not-allowed',
}

const formatPrice = (amount, currency) => {
  let price = (amount / 100).toFixed(2)
  let numberFormat = new Intl.NumberFormat(['en-US'], {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'symbol',
  })
  return numberFormat.format(price)
}

const ProductCard = ({ product }) => {
  const [loading, setLoading] = useState(false)
  const { addItem } = useShoppingCart()

  const transformProduct = product => {
    return {
        id: product.id,
        name: product.title,
        sku: product.id,
        price: product.price,
        image: product.image,
        currency: 'CAD',
        taxable: product.taxable,
        weight: product.weight,
        requires_shipping: product.requiresShipping
    }
  };

  const submitForm = evt => {
      evt.preventDefault();
  }

  return (
    <div style={cardStyles}>
      <form onSubmit={submitForm}>
        <fieldset style={{ border: 'none' }}>
          <legend>
            <h4>{product.title}</h4>
          </legend>
          <img style={{width: '25%'}} src={product.image}></img>
          <br/>
          <label>
            Price{' '}
            <select name="priceSelect">
              <option>{formatPrice(product.price, 'CAD')}</option>
            </select>
          </label>
        </fieldset>
        <button
          disabled={loading}
          onClick={() => addItem(transformProduct(product))}
          className={'bv-button bv-button--primary'}
          style={
            loading
              ? { ...buttonStyles, ...buttonDisabledStyles }
              : buttonStyles
          }
        >
          <span className={'bv-button__text'}>Add to cart</span>
        </button>
      </form>
    </div>
  )
}

export default ProductCard
