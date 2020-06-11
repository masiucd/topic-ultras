/* eslint-disable @typescript-eslint/interface-name-prefix */
import * as React from 'react'
import styled from 'styled-components'
import AniLink from 'gatsby-plugin-transition-link/AniLink'
import { handleFlex } from '../../styles/utils/helpers'

type Link = {
  name: string
  path: string
}
export interface INavListProps {
  onLinks: Array<Link>
}

const StyledNavList = styled.ul`
  width: 35%;
  @media (min-width: 960px) {
    ${handleFlex('row', 'flex-end', 'center')};
  }
  li {
    padding: 0.5rem;
  }
  a {
    color: ${({ theme }) => theme.colors.black};
    font-size: 1.8rem;
    text-transform: capitalize;
    transition: ${props => props.theme.transition.quickTransition};
    font-weight: 700;
    &:hover {
      border-bottom: 2px solid ${({ theme }) => theme.colors.black};
    }
  }
  display: none;
`

export default function NavList(props: INavListProps) {
  const { onLinks } = props

  return (
    <StyledNavList>
      {onLinks.map(link => (
        <li key={link.name}>
          <AniLink fade to={link.path}>
            {link.name}
          </AniLink>
        </li>
      ))}
    </StyledNavList>
  )
}
