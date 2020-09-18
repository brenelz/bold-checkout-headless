import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <h1>Hi Boldies</h1>
    <p>Welcome to the Bold Headless Checkout.</p>
    <Link className={'bv-button'} to="/advanced/">Go to the example</Link>
  </Layout>
)

export default IndexPage
