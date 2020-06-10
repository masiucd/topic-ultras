import * as React from 'react'
import styled from 'styled-components'
import Img from 'gatsby-image'
import { useStaticQuery, graphql } from 'gatsby'
import { IFixedObject } from 'gatsby-background-image'
import { handleFlex } from '../styles/utils/helpers'
import CardSmall from '../elements/Card.s'

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
    name: string
    childImageSharp: {
      fixed: IFixedObject
    }
  }
}

interface CartRowQuery {
  allFile: {
    edges: Array<Node>
  }
}

const CardRow: React.FC<Props> = () => {
  const { allFile } = useStaticQuery<CartRowQuery>(
    graphql`
      {
        allFile(filter: { extension: { eq: "jpeg" } }) {
          edges {
            node {
              name
              childImageSharp {
                fixed(width: 260, height: 240) {
                  ...GatsbyImageSharpFixed
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
      {allFile.edges.slice(0, 3).map(card => (
        <CardSmall key={card.node.name} card={card.node} />
      ))}
    </CardRowStyles>
  )
}
export default CardRow
