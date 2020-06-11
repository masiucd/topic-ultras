import * as React from 'react'
import AniLink from 'gatsby-plugin-transition-link/AniLink'
import styled from 'styled-components'
import { handleFlex } from '../styles/utils/helpers'

interface Props {
  data: {
    fields: {
      slug: string
    }
    frontmatter: {
      title: string
      path: string
      date: string
    }
    excerpt: string
  }
}

const StyledBlogItem = styled(AniLink)`
  color: ${props => props.theme.colors.black};

  ${handleFlex('row', 'center', 'center')};
  padding: 1rem 1.6rem;
  p {
    font-size: 4rem;
    padding: 0.5rem;
    text-align: center;
    &:first-child {
      width: 60%;
      color: ${({ theme }) => theme.colors.black};
      border-bottom: ${({ theme }) => theme.colors.black} 2px solid;
    }
    &:last-child {
      color: ${({ theme }) => theme.colors.primary};
      background: ${({ theme }) => theme.colors.black};
      ${({ theme }) => theme.shadows.elevations[1]};
      border-radius: 0.4rem;
      margin-left: 1rem;
      width: 40%;
    }
    small {
      display: block;
      font-size: 1.5rem;
    }
  }

  @media (max-width: 960px) {
    ${handleFlex('column', 'center', 'center')};
    p {
      margin: 1rem 0;
    }
  }
`

const BlogItem: React.FC<Props> = ({ data }) => {
  const p = '/blog'
  return (
    <StyledBlogItem fade to={`${p}${data.frontmatter.path}`}>
      <p>
        {data.frontmatter.title}
        <small>{data.excerpt}</small>
      </p>
      <p>{data.frontmatter.date}</p>
    </StyledBlogItem>
  )
}
export default BlogItem
