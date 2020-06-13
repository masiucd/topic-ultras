import * as React from 'react'
import { IFixedObject } from 'gatsby-background-image'
import styled from 'styled-components'
import Image from 'gatsby-image'
import { handleFlex } from '../styles/utils/helpers'
import { StyledBtn } from '../styles/Button'

interface Node {
  id: string
  title: string
  price: number
  desc: string
  slug: string
  image: {
    fixed: IFixedObject | IFixedObject[]
  }
}

interface Props {
  item: Node
}

const StyledTourItem = styled.div`
  position: relative;
  cursor: pointer;
  ${({ theme }) => theme.shadows.elevations[1]};
  border: 2px solid ${({ theme }) => theme.colors.black};
  .body {
    display: none;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    width: 100%;
    h1 {
      font-size: 4.5rem;
      width: 100%;
      text-align: center;
    }
    p,
    h1 {
      color: ${props => props.theme.colors.white};
    }
    p {
      font-size: 2rem;
    }
  }
  &:after {
    content: '';
    height: 350px;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.3);
  }
  &:hover {
    .body {
      ${handleFlex('column', 'center', 'center')};
    }
  }
`

const Footer = styled.div``

const TourItem: React.FC<Props> = ({ item }) => {
  return (
    <StyledTourItem>
      <Image fixed={item.image.fixed} alt={item.title} />
      <div className="body">
        <h1> {item.title} </h1>
        <p>{item.desc}</p>
        <StyledBtn fade to={`/tours${item.slug}`}>
          {item.title}
        </StyledBtn>
      </div>
    </StyledTourItem>
  )
}
export default TourItem
