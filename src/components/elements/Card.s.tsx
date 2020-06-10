import * as React from 'react'
import styled from 'styled-components'
import { IFixedObject } from 'gatsby-background-image'
import Img from 'gatsby-image'
import { handleFlex } from '../styles/utils/helpers'

interface Props {
  card: {
    name: string
    childImageSharp: {
      fixed: IFixedObject
    }
  }
}

const StyledCardSmall = styled.article`
  margin: 0.5rem;
  position: relative;
  transition: ${props => props.theme.transition.mainTransition};
  ${({ theme }) => theme.shadows.elevations[2]};
  .content {
    display: none;
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    color: ${props => props.theme.colors.white};
    width: 100%;
    h3 {
      font-size: 2.5rem;
      text-transform: capitalize;
      border-bottom: 2px solid ${props => props.theme.colors.white};
    }
    p {
      font-size: 1.2rem;
      text-align: center;
    }
  }
  .gatsby-image-wrapper {
    display: block !important;
  }
  &:after {
    content: '';
    transition: ${props => props.theme.transition.mainTransition};
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.3);
    height: 79%;
    width: 100%;
  }
  &:hover {
    .content {
      ${handleFlex('column', 'center', 'center')}
    }
  }
`

const CardFooter = styled.div`
  padding: 1.5rem;
  ${handleFlex('row', 'center', 'center')};
`

const CardSmall: React.FC<Props> = ({ card }) => {
  return (
    <StyledCardSmall>
      <Img fixed={card.childImageSharp.fixed} alt={card.name} />
      <div className="content">
        <h3>{card.name.match(/[a-z]/gi)}</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
          commodi, tempore ea adipisci voluptas provident.
        </p>
      </div>
      <CardFooter>
        <h3>sunny Italy</h3>
      </CardFooter>
    </StyledCardSmall>
  )
}
export default CardSmall
