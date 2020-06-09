import * as React from 'react'
import { PageProps } from 'gatsby'
import Layout, { Page } from '../components/layout'

interface Props {}

const About: React.FC<PageProps> = () => {
  return (
    <Layout onTitle="About">
      <Page>
        <h1> About </h1>
      </Page>
    </Layout>
  )
}
export default About
