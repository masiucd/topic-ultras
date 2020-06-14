import * as React from 'react'
import { graphql, Link } from 'gatsby'
import styled from 'styled-components'
import AniLink from 'gatsby-plugin-transition-link/AniLink'
import BlogItem from '../components/blog/BlogItem'
import Layout, { Page } from '../components/layout'
import { handleFlex } from '../components/styles/utils/helpers'

interface PageContext<T> {
  currentPage: T
  limit: T
  numPages: T
  skip: T
}

interface Node {
  node: {
    frontmatter: {
      title: string
      path: string
      date: string
    }
    excerpt: string
  }
}

interface Data {
  allMarkdownRemark: {
    edges: Array<Node>
  }
}

interface BlogListProps {
  pageContext: PageContext<number>
  data: Data
}

const BlogListStyles = styled.div`
  padding: 2.5rem 1rem;
  #title {
    font-size: 6.5rem;
    text-align: center;
    padding: 1.5rem;
  }
`

const LinkWrapper = styled.ul`
  padding: 2rem 1rem;
  font-size: 2rem;
  ${handleFlex('row', 'center', 'center')};
  a {
    color: ${props => props.theme.colors.black};
    padding: 1rem;
  }
  #middle-link {
    a {
      border: 2px solid ${({ theme }) => theme.colors.black};
      border-radius: 1rem;
      padding: 1rem 2rem;
      ${({ theme }) => theme.shadows.elevations[1]};
    }
  }
  #prev,
  #next {
    font-size: 2.5rem;
  }
`

const BlogList: React.FC<BlogListProps> = ({ pageContext, data }) => {
  const { edges } = data.allMarkdownRemark
  const { currentPage, numPages } = pageContext

  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage =
    currentPage - 1 === 1 ? '/blog-list' : (currentPage - 1).toString()
  const nextPage = (currentPage + 1).toString()
  return (
    <Layout>
      {/* <BlogListStyles>
        <h1 id="title">Travel Posts</h1>
        <Page>
          {edges.map(({ node }) => (
            <BlogItem key={node.frontmatter.title} data={node} />
          ))}

          <LinkWrapper>
            {!isFirst && (
              <Link to={prevPage} rel="prev" id="prev">
                ← Previous Page
              </Link>
            )}

            {Array.from({ length: numPages }, (_, i) => (
              <li id="middle-link" key={`pagination-number${i + 1}`}>
                <AniLink
                  fade
                  to={`/blog-list/${i === 0 ? '' : i + 1}`}
                  style={{
                    margin: 5,
                    color: i + 1 === currentPage ? '#ffffff' : '',
                    background: i + 1 === currentPage ? '#2c73d2' : '',
                  }}
                >
                  {i + 1}
                </AniLink>
              </li>
            ))}
            {!isLast && (
              <Link to={nextPage} rel="next" id="next">
                Next Page →
              </Link>
            )}
          </LinkWrapper>
        </Page>
      </BlogListStyles> */}
    </Layout>
  )
}

export const blogListQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
      filter: { fileAbsolutePath: { regex: "/.md/" } }
    ) {
      edges {
        node {
          frontmatter {
            title
            path
            date(formatString: "Do MMMM YYYY")
          }
          excerpt
        }
      }
    }
  }
`

export default BlogList
