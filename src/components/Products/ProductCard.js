import React, { useState } from 'react'

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
  maxWidth: '300px',
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

  const handleSubmit = async event => {
    event.preventDefault()
    setLoading(true)

    const cart = {
      line_items: [
        {
          id: product.id,
          quantity: 1,
          title: product.title,
          variant_title: product.variantTitle,
          weight: product.weight,
          taxable: product.taxable,
          image: product.image,
          requires_shipping: product.requiresShipping,
          price: product.price,
        },
      ],
    }

    alert('Checking out!')
  }

  return (
    <div style={cardStyles}>
      <form onSubmit={handleSubmit}>
        <fieldset style={{ border: 'none' }}>
          <legend>
            <h4>{product.title}</h4>
          </legend>
          <label>
            Price{' '}
            <select name="priceSelect">
              <option>{formatPrice(product.price, 'CAD')}</option>
            </select>
          </label>
        </fieldset>
        <button
          disabled={loading}
          style={
            loading
              ? { ...buttonStyles, ...buttonDisabledStyles }
              : buttonStyles
          }
        >
          BUY ME
        </button>
      </form>
    </div>
  )
}

export default ProductCard