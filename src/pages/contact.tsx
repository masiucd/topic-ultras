import * as React from 'react'
import { PageProps } from 'gatsby'
import Layout from '../components/layout'

interface Props {}

const ContactPage: React.FC<PageProps> = () => {
  return (
    <Layout onTitle="Contact" onDescription="Contact us">
      <h1> ContactPAge</h1>{' '}
    </Layout>
  )
}
export default ContactPage
