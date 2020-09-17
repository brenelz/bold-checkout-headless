import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

import Products from '../components/Products/Products'

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
  <Layout>
    <SEO title="Advanced Example" />
    <h1>This is the advanced example</h1>
    <Products products={data.allContentfulProduct.nodes} />
    <Link to="/">Go back to the first example</Link>
  </Layout>
)

export default AdvancedExamplePage
