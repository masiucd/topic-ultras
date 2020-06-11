import * as React from 'react'
import { graphql, Link } from 'gatsby'
import AniLink from 'gatsby-plugin-transition-link/AniLink'
import Layout from '../components/layout'

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
    }
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

const BlogList: React.FC<BlogListProps> = ({ pageContext, data }) => {
  const { edges } = data.allMarkdownRemark
  const { currentPage, numPages } = pageContext

  return (
    <Layout>
      <h1>blog list</h1>
      {edges.map(({ node }) => (
        <div key={node.frontmatter.title}>
          <Link to={`blog${node.frontmatter.path}`} style={{ color: '#000' }}>
            <h3>{node.frontmatter.title}</h3>
          </Link>
        </div>
      ))}
    </Layout>
  )
}

export const blogListQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          frontmatter {
            title
            path
          }
          excerpt
        }
      }
    }
  }
`

export default BlogList
