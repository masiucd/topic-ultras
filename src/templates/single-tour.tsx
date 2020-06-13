import * as React from 'react'
import { graphql } from 'gatsby'
import { IFluidObject } from 'gatsby-background-image'
import Layout from '../components/layout'

interface ContentFulData {
  desc: string
  image: {
    fluid: IFluidObject
  }
  price: number
  slug: string
  title: string
}

interface Content {
  contentfulTrips: ContentFulData
}

interface PageContext {
  pathSlug: string
}
interface Props {
  pageContext: PageContext
  data: Content
}

const SingleTour: React.FC<Props> = ({ pageContext, data }) => {
  const {
    contentfulTrips: { desc, image, price, slug, title },
  } = data
  return (
    <Layout>
      <h1> {title} </h1>
    </Layout>
  )
}

export const query = graphql`
  query($pathSlug: String!) {
    contentfulTrips(slug: { eq: $pathSlug }) {
      price
      title
      desc
      slug
      image {
        fluid {
          ...GatsbyContentfulFluid_tracedSVG
          # GatsbyContentfulFluid_withWebp
        }
      }
    }
  }
`

export default SingleTour
