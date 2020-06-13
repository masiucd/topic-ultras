import * as React from 'react'
import styled from 'styled-components'
import Image from 'gatsby-image'
import { graphql, useStaticQuery } from 'gatsby'
import { IFluidObject } from 'gatsby-background-image'
import TripItem from './TripItem'
import { StyledBtn } from '../styles/Button'
import { handleFlex } from '../styles/utils/helpers'

interface Props {}

const Grid = styled.section`
  ${handleFlex('column', 'center', 'center')}
  @media (min-width: 950px) {
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: auto;
    grid-gap: 15px;
    margin: 2rem 0;
  }
`

interface ColumnProps {
  left?: boolean
  right?: boolean
}
const Column = styled.aside<ColumnProps>`
  padding: 1rem 0.5rem;

  #right-title {
    font-size: 3rem;
  }
  #paragraph {
    font-size: 18px;
  }
  ${StyledBtn} {
    display: block;
    margin: 10px 0;
  }
  @media (max-width: 950px) {
    width: ${({ left }) => (left ? '70%' : '100%')};
    padding: ${({ right }) => (right ? '1rem' : '1rem 0.5rem')};
    margin: ${({ left }) => left && '0 auto '};
  }
`

const CAPTURE_QUERY = graphql`
  {
    captureImg: allContentfulTrips(limit: 1) {
      edges {
        node {
          id
          title
          desc
          image {
            fluid {
              ...GatsbyContentfulFluid
            }
          }
        }
      }
    }
  }
`
type Node = {
  node: {
    id: string
    title: string
    desc: string
    image: {
      fluid: IFluidObject
    }
  }
}
interface CaptureQuery {
  captureImg: {
    edges: Array<Node>
  }
}

const Capture: React.FC<Props> = () => {
  const {
    captureImg: { edges },
  } = useStaticQuery<CaptureQuery>(CAPTURE_QUERY)
  const { node: card } = edges[0]

  return (
    <Grid>
      <Column left>
        <TripItem card={card} />
      </Column>
      <Column right>
        <h3 id="right-title">We are always focused on you</h3>
        <p id="paragraph">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro, est
          ex? Facere molestiae nihil pariatur culpa nostrum. Asperiores
          laboriosam consequuntur at nihil cupiditate maiores hic atque placeat
          soluta tenetur. Perspiciatis repudiandae, at, tempora et obcaecati sed
          labore iure cumque voluptatibus est ipsa, ratione blanditiis incidunt
          maxime aspernatur doloremque? Sed repellendus autem dicta sequi,
          explicabo asperiores nulla quia consequuntur impedit perferendis est
          voluptas. Animi dicta saepe consequatur, quisquam ad quos
          exercitationem perspiciatis possimus, perferendis, soluta iure
          commodi.
          <br />
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla cumque
          nisi deleniti eius quasi, quibusdam atque ea autem est veritatis
          repellat quod incidunt fugiat ipsam pariatur labore.
        </p>
        <StyledBtn fade to="/tours">
          Tours
        </StyledBtn>
      </Column>
    </Grid>
  )
}
export default Capture
