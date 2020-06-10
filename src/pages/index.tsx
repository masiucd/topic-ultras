import * as React from 'react'

import { PageProps, graphql } from 'gatsby'
import Layout, { Page } from '../components/layout'
import Title from '../components/Title'
import Hero from '../components/elements/Hero'
import CardRow from '../components/home/CardRow'

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
          ctaText="About"
          page="about"
        />
      </Hero>
      <Page>
        <CardRow />
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
