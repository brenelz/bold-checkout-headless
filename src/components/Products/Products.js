import React from 'react'
import ProductCard from './ProductCard'

const containerStyles = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  padding: '1rem 0 1rem 0',
}

const Products = ({ products }) => {
  return (
    <div style={containerStyles}>
      {Object.keys(products).map(key => (
        <ProductCard key={products[key].id} product={products[key]} />
      ))}
    </div>
  )
}

export default Products
