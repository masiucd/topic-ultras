/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import * as React from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'
import AniLink from 'gatsby-plugin-transition-link/AniLink'
import Img from 'gatsby-image'
import { IFixedObject } from 'gatsby-background-image'
import NavList from './NavList'
import { handleFlex } from '../../styles/utils/helpers'
import NavSearch from './NavSearch'
import useToggle from '../../hooks/useToggle'
import MobileMenu from './MobileMenu'

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
  file: {
    name: string
    childImageSharp: {
      fixed: IFixedObject
    }
  }
}

const Nav: React.FC<Props> = ({ className }) => {
  const [on, toggle] = useToggle(false)
  const {
    file,
    site: {
      siteMetadata: { links, title },
    },
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
      file(absolutePath: { regex: "/png/", ne: "menu" }) {
        name
        childImageSharp {
          fixed(width: 40, height: 45) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  return (
    <nav className={className}>
      <NavTitle>
        <AniLink fade to="/">
          <h3>{title}</h3>
        </AniLink>
      </NavTitle>
      <NavSearch />
      <NavList onLinks={links} />
      <div id="navIcon" onClick={toggle}>
        <Img
          fixed={file.childImageSharp.fixed}
          alt={file.name}
          style={{
            color: on ? '#fff' : '',
          }}
        />
      </div>
      <MobileMenu on={on} onLinks={links} />
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
    top: 0;
    right: 1rem;
    cursor: pointer;
    font-size: 1.8rem;
    z-index: 6;
    @media (min-width: 960px) {
      display: none;
    }
  }
`
