import * as React from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'
import AniLink from 'gatsby-plugin-transition-link/AniLink'
import NavList from './NavList'
import { handleFlex } from '../../styles/utils/helpers'
import NavSearch from './NavSearch'

interface Props {
  className: string
}

const NavTitle = styled.div`
  font-size: 3rem;
  width: 35%;
  a {
    color: ${props => props.theme.colors.black};
  }
`
type Link = {
  name: string
  path: string
}
interface NavQuery {
  site: {
    siteMetadata: {
      title: string
      links: Array<Link>
    }
  }
}

const Nav: React.FC<Props> = ({ className }) => {
  const {
    site: { siteMetadata },
  } = useStaticQuery<NavQuery>(graphql`
    {
      site {
        siteMetadata {
          title
          links {
            name
            path
          }
        }
      }
    }
  `)

  return (
    <nav className={className}>
      <NavTitle>
        <AniLink fade to="/">
          <h3>{siteMetadata.title}</h3>
        </AniLink>
      </NavTitle>
      <NavSearch />
      <NavList onLinks={siteMetadata.links} />
      <div id="navIcon">
        <span>Menu</span>
      </div>
    </nav>
  )
}

export default styled(Nav)`
  padding: 1.5rem 2rem;
  background: none;
  color: ${({ theme }) => theme.colors.black};
  ${handleFlex('row', 'space-between', 'center')};
  #navIcon {
    position: absolute;
    top: 0.2rem;
    right: 1rem;
    cursor: pointer;
    font-size: 1.8rem;
    @media (min-width: 960px) {
      display: none;
    }
  }
`
