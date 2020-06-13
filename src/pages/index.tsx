import * as React from 'react'

import { PageProps, graphql } from 'gatsby'
import Layout, { Page } from '../components/layout'
import Title from '../components/Title'
import Hero from '../components/elements/Hero'
import CardRow from '../components/home/CardRow'
import Capture from '../components/home/Capture'

interface IndexQuery {
  site: {
    siteMetadata: {
      title: string
      description: string
    }
  }
}

const IndexPage: React.FC<PageProps<IndexQuery>> = ({ data }) => {
  const { title, description } = data.site.siteMetadata
  return (
    <Layout>
      <Hero className="Hero" home>
        <Title
          title={title}
          subTitle={description}
          cta
          bgShadow
          left
          ctaText="Tours"
          page="tours"
          color="#fff"
        />
      </Hero>
      <Page>
        <CardRow />
        <Capture />
      </Page>
    </Layout>
  )
}

export const PAGE_QUERY = graphql`
  {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`

export default IndexPage
