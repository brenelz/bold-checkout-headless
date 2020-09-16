import React from 'react'
import ProductCard from './ProductCard'

const containerStyles = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  padding: '1rem 0 1rem 0',
}

const Products = () => {
  const products = [
    {
      id: 1,
      name: 'Test Product',
      prices: [
        {
          id: 1,
          unit_amount: 1000,
          currency: 'CAD',
        },
      ],
    },
    {
      id: 2,
      name: 'Test Product2',
      prices: [
        {
          id: 1,
          unit_amount: 2000,
          currency: 'CAD',
        },
      ],
    },
    {
      id: 3,
      name: 'Test Product3',
      prices: [
        {
          id: 1,
          unit_amount: 3000,
          currency: 'CAD',
        },
      ],
    },
    {
      id: 4,
      name: 'Test Product4',
      prices: [
        {
          id: 1,
          unit_amount: 4000,
          currency: 'CAD',
        },
      ],
    },
  ]
  return (
    <div style={containerStyles}>
      {Object.keys(products).map(key => (
        <ProductCard key={products[key].id} product={products[key]} />
      ))}
    </div>
  )
}

export default Products
