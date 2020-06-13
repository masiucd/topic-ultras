import * as React from 'react'
import { graphql, Link } from 'gatsby'
import styled from 'styled-components'
import Layout from '../components/layout'
import { handleFlex } from '../components/styles/utils/helpers'

interface DataProps {
  markdownRemark: {
    html: string
    frontmatter: {
      title: string
    }
  }
}

type PrevNext = {
  excerpt: string
  fields: { slug: string }
  frontmatter: {
    date: string
    path: string
    spoiler: string
    title: string
  }
  id: string
}
interface PageContext {
  pathSlug: string
  prev: PrevNext
  next: PrevNext
}

interface BlogPostProps {
  data: DataProps
  pageContext: PageContext
}

const StyledBlogPost = styled.section`
  max-width: 1000px;
  margin: 2rem auto;
  height: 100%;
  #blog-post-title {
    padding: 1rem;
    font-size: 5rem;
  }
`

const Content = styled.div`
  padding: 1rem;
  p {
    font-size: 1.8rem;
  }
`

const NavigationWrapper = styled.div`
  ${handleFlex('row', 'space-around', 'center')};
  padding: 2rem 0;
  a {
    color: ${props => props.theme.colors.black};
    font-size: 2rem;
    display: block;
    transition: ${props => props.theme.transition.quickTransition};
    padding: 0.6rem;
    width: 12rem;
    text-align: center;
    ${({ theme }) => theme.shadows.elevations[0]};
    &:hover {
      background: ${props => props.theme.colors.black};
      color: ${props => props.theme.colors.white};
      ${({ theme }) => theme.shadows.elevations[2]};
    }
  }
`

const BlogPost: React.FC<BlogPostProps> = ({ data, pageContext }) => {
  const { markdownRemark } = data
  console.log(pageContext.next)
  return (
    <Layout>
      <StyledBlogPost>
        <h1 id="blog-post-title">{markdownRemark.frontmatter.title}</h1>
        <Content dangerouslySetInnerHTML={{ __html: markdownRemark.html }} />
        <NavigationWrapper>
          {pageContext.prev && (
            <Link to={`/blog${pageContext.prev.frontmatter.path}`}>← Prev</Link>
          )}
          {pageContext.next && (
            <Link to={`/blog${pageContext.next.frontmatter.path}`}>Next →</Link>
          )}
        </NavigationWrapper>
      </StyledBlogPost>
    </Layout>
  )
}

export const query = graphql`
  query($pathSlug: String!) {
    markdownRemark(frontmatter: { path: { eq: $pathSlug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`

export default BlogPost
