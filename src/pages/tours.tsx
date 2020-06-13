import * as React from 'react'
import { PageProps, graphql } from 'gatsby'
import { IFluidObject, IFixedObject } from 'gatsby-background-image'
import styled from 'styled-components'
import Layout, { Page } from '../components/layout'
import TourItem from '../components/tours/TourItem'
import Hero from '../components/elements/Hero'
import Title from '../components/Title'

interface Node {
  node: {
    id: string
    title: string
    price: number
    desc: string
    slug: string
    image: {
      fixed: IFixedObject
    }
  }
}
//
interface Props {
  topTrips: {
    edges: Node[]
  }
  hero: {
    childImageSharp: {
      fluid: IFluidObject
    }
  }
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-template-rows: auto;
  grid-gap: 1.5rem;
  justify-items: center;
  padding: 2rem 0.5rem;
  margin: 5rem 0;
`

const Tours: React.FC<PageProps<Props>> = ({ data }) => {
  const {
    topTrips: { edges },
    hero,
  } = data

  return (
    <Layout onTitle="Tours">
      <Hero className="Tours" heroBg={hero.childImageSharp.fluid}>
        <Title title="Out top 10 Tours" cta ctaText="Blog" page="blog" />
      </Hero>
      <Page>
        <h1
          id="famousTitle"
          style={{
            textAlign: 'center',
            fontSize: 50,
            margin: '2rem 0',
            borderBottom: '2px solid #252525',
          }}
        >
          Famous Tours <span style={{ color: '#2c73d2' }}>And</span>{' '}
          Destinations
        </h1>
        <Grid>
          {edges.map(({ node }) => (
            <TourItem key={node.id} item={node} />
          ))}
        </Grid>
      </Page>
    </Layout>
  )
}

export const query = graphql`
  {
    topTrips: allContentfulTrips {
      edges {
        node {
          id
          title
          price
          desc
          slug
          image {
            fixed(width: 300, height: 350) {
              ...GatsbyContentfulFixed_withWebp
            }
          }
        }
      }
    }
    hero: file(relativePath: { eq: "italy2.jpeg" }) {
      childImageSharp {
        fluid(quality: 90, maxWidth: 1290, grayscale: true) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`
export default Tours
