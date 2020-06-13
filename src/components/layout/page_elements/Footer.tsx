import * as React from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'
import { IFixedObject } from 'gatsby-background-image'
import FooterList from './FooterList'
import { handleFlex } from '../../styles/utils/helpers'
import SocialList from './SocialList'

const FooterStyles = styled.footer`
  background: ${props => props.theme.colors.black};
  color: ${props => props.theme.colors.white};
  padding: 2rem 1rem;
  ${handleFlex('row', 'space-between', 'center')};
  @media (max-width: 960px) {
    ${handleFlex('column', 'center', 'center')};
  }
`

const FooterTitle = styled.div`
  padding: 1rem;
  @media (max-width: 960px) {
    ${handleFlex('row', 'center', 'center')};
    span {
      padding: 0 1.5rem;
    }
  }
`

const FOOTER_QUERY = graphql`
  {
    siteData: site {
      siteMetadata {
        title
        links {
          name
          path
        }
      }
    }
    social: allFile(filter: { extension: { eq: "png" } }) {
      edges {
        node {
          id
          name
          childImageSharp {
            fixed(width: 35, height: 35) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  }
`

interface Link<T> {
  name: T
  path: T
}
interface SocialNode {
  node: {
    id: string
    name: string
    childImageSharp: {
      fixed: IFixedObject
    }
  }
}

interface FooterQuery {
  siteData: {
    siteMetadata: {
      title: string
      links: Array<Link<string>>
    }
  }
  social: {
    edges: Array<SocialNode>
  }
}

const Footer: React.FC = () => {
  const {
    siteData: { siteMetadata },
    social: { edges: socialXs },
  } = useStaticQuery<FooterQuery>(FOOTER_QUERY)
  const date = new Date()

  return (
    <FooterStyles>
      <FooterTitle>
        <h1>{siteMetadata.title}</h1>
        <span>&#169;{date.getFullYear()}</span>
      </FooterTitle>
      <FooterList onLinks={siteMetadata.links} />
      <SocialList onSocialXs={socialXs} />
    </FooterStyles>
  )
}
export default Footer
