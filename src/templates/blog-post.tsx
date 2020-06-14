import * as React from 'react'
import styled from 'styled-components'
import { graphql, Link } from 'gatsby'
import Layout, { Page } from '../components/layout'
import { handleFlex } from '../components/styles/utils/helpers'

interface MarkDownRemark {
  frontmatter: { title: string }
  html: string
}

interface Data {
  markdownRemark: MarkDownRemark
}

interface NextAndPrev<T> {
  excerpt: T
  frontmatter: {
    title: T
    path: T
    date: T
    spoiler: T
  }
  html: T
  id: T
}

interface Props {
  data: Data
  pageContext: {
    postSlug: string
    prev: NextAndPrev<string>
    next: NextAndPrev<string>
  }
}

const StyledBlogPost = styled.div`
  min-height: 75vh;
  #title {
    padding: 2rem 0.5rem;
    font-size: 4rem;
  }
  .content {
    padding: 2rem 0.5rem;
    p {
      font-size: 18px;
    }
  }
`

const LinksWrapper = styled.div`
  ${handleFlex('row', 'space-around', 'center')};
  padding: 2rem 0;
  a {
    font-size: 3rem;
    color: ${({ theme }) => theme.colors.black};
    transition: ${({ theme }) => theme.transition.quickTransition};
    padding: 0.3rem 1rem;
    width: 12rem;
    display: block;
    text-align: center;
    &:hover {
      color: ${({ theme }) => theme.colors.white};
      background: ${({ theme }) => theme.colors.black};
    }
  }
`

const BlogPost: React.FC<Props> = ({ data, pageContext }) => {
  const { next, prev } = pageContext
  return (
    <Layout>
      <Page>
        <StyledBlogPost>
          <h1 id="title"> {data.markdownRemark.frontmatter.title} </h1>
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
          />
        </StyledBlogPost>
        <LinksWrapper>
          {prev && (
            <Link to={`/blog${pageContext.prev.frontmatter.path}`}>
              {' '}
              ← prev
            </Link>
          )}
          {next && (
            <Link to={`/blog${pageContext.next.frontmatter.path}`}>next →</Link>
          )}
        </LinksWrapper>
      </Page>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($postSlug: String!) {
    markdownRemark(frontmatter: { path: { eq: $postSlug } }) {
      html
      frontmatter {
        title
      }
    }
  }
  # {
  #   allMarkdownRemark(
  #     sort: { fields: [frontmatter___date], order: DESC }
  #     limit: 1000
  #     filter: { fileAbsolutePath: { regex: "/.md/" } }
  #   ) {
  #     edges {
  #       node {
  #         frontmatter {
  #           title
  #           path
  #           date(formatString: "MMMM DD YYYY")
  #           spoiler
  #         }
  #       }
  #     }
  #   }
  # }
`

export default BlogPost
