import * as React from 'react'
import styled from 'styled-components'
import { IFluidObject } from 'gatsby-background-image'
import AniLink from 'gatsby-plugin-transition-link/AniLink'
import Image from 'gatsby-image'
import { graphql, useStaticQuery } from 'gatsby'
import { handleFlex } from '../styles/utils/helpers'

type Card = {
  id: string
  price?: number
  title: string
  desc: string
  slug?: string
  image: {
    fluid: IFluidObject | IFluidObject[] | undefined
  }
}
interface Props {
  card: Card
}

const StyledCard = styled.article`
  border: 3px solid ${({ theme }) => theme.colors.black};
  margin: 1.5rem;
  position: relative;
  transition: ${props => props.theme.transition.mainTransition};
  ${({ theme }) => theme.shadows.elevations[2]};
  width: 100%;

  .content {
    display: none;
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    color: ${props => props.theme.colors.white};
    width: 80%;
    margin: 0 auto;
    h3 {
      transition: ${props => props.theme.transition.quickTransition};
      font-size: 3rem;
      text-transform: capitalize;
      border-bottom: 2px solid ${props => props.theme.colors.white};
    }
    p {
      font-size: 2rem;
      text-align: center;
      font-weight: 700;
    }
    small {
      font-size: 1.8rem;
      border-bottom: 1px solid ${props => props.theme.colors.white};
    }
  }

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.3);
    height: 100%;
    width: 100%;
  }
  &:hover {
    transition: ${props => props.theme.transition.mainTransition};
    .content {
      ${handleFlex('column', 'center', 'center')};
    }
  }

  @media (min-width: 950px) {
    width: 75%;
  }
`

const CardFooter = styled.div`
  padding: 1.5rem;
  ${handleFlex('row', 'center', 'center')};
  z-index: 3;
  position: relative;
  background: ${props => props.theme.colors.white};
  font-size: 2rem;
  h3 {
    border-bottom: 2px solid ${props => props.theme.colors.primary};
  }
`

const DEFAULT_QUERY_IMAGE = graphql`
  {
    file(relativePath: { eq: "la2.jpeg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

interface DefaultImageQuery {
  file: {
    childImageSharp: {
      fluid: IFluidObject | undefined
    }
  }
}

const TripItem: React.FC<Props> = ({ card }) => {
  const defaultImg = useStaticQuery<DefaultImageQuery>(DEFAULT_QUERY_IMAGE)

  const img = defaultImg.file.childImageSharp.fluid
  const mainImg = card.image.fluid || img

  return (
    <StyledCard>
      <Image fluid={mainImg} alt={card.title} />
      <AniLink fade to={card.slug ? `trip/${card.slug}` : '/tours'}>
        <div className="content">
          <h3>{card.title.match(/[a-z]/gi)}</h3>
          <p>{card.desc}</p>
          {card.price && <small>Price: ${card.price}</small>}
        </div>
      </AniLink>
      <CardFooter>
        <h3>Lovely {card.title}</h3>
      </CardFooter>
    </StyledCard>
  )
}
export default TripItem
