import * as React from 'react'
import styled from 'styled-components'
import Img from 'gatsby-image'
import { useStaticQuery, graphql } from 'gatsby'
import { IFixedObject, IFluidObject } from 'gatsby-background-image'
import { handleFlex } from '../styles/utils/helpers'
import TripItem from './TripItem'

interface Props {}

const CardRowStyles = styled.section`
  padding: 3rem 1rem;
  width: 100%;
  margin: 3rem 0 1rem 0;
  ${handleFlex('column', 'center', 'center')}
  @media (min-width: 950px) {
    ${handleFlex('row', 'space-evenly', 'center')}
  }
`

interface Node {
  node: {
    id: string
    price: number
    title: string
    desc: string
    slug: string
    image: {
      fluid: IFluidObject
    }
  }
}

interface CartRowQuery {
  featureTrips: {
    edges: Array<Node>
  }
}

const CardRow: React.FC<Props> = () => {
  const {
    featureTrips: { edges },
  } = useStaticQuery<CartRowQuery>(
    graphql`
      {
        featureTrips: allContentfulTrips(
          limit: 3
          sort: { fields: [createdAt], order: DESC }
        ) {
          edges {
            node {
              id
              price
              title
              desc
              slug
              image {
                fluid {
                  ...GatsbyContentfulFluid
                }
              }
            }
          }
        }
      }
    `,
  )

  return (
    <CardRowStyles>
      {edges.map(({ node }) => (
        <TripItem key={node.id} card={node} />
      ))}
    </CardRowStyles>
  )
}
export default CardRow
