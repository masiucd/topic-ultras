import * as React from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'
import FooterList from './FooterList'
import { handleFlex } from '../../styles/utils/helpers'

interface Props {}

const FooterStyles = styled.footer`
  background: ${props => props.theme.colors.black};
  color: ${props => props.theme.colors.white};
  padding: 2rem 1rem;
  ${handleFlex('row', 'space-between', 'center')};
`

const FooterTitle = styled.div`
  padding: 1rem;
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
  }
`

interface Link<T> {
  name: T
  path: T
}

interface FooterQuery {
  siteData: {
    siteMetadata: {
      title: string
      links: Array<Link<string>>
    }
  }
}

const Footer: React.FC<Props> = () => {
  const {
    siteData: { siteMetadata },
  } = useStaticQuery<FooterQuery>(FOOTER_QUERY)
  return (
    <FooterStyles>
      <FooterTitle>
        <h1>{siteMetadata.title}</h1>
      </FooterTitle>
      <FooterList onLinks={siteMetadata.links} />
    </FooterStyles>
  )
}
export default Footer
