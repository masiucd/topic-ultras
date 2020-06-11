import * as React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import BlogItem from '../components/blog/BlogItem'
import Layout, { Page } from '../components/layout'

interface PageContext<T> {
  currentPage: T
  limit: T
  numPages: T
  skip: T
}

interface Node {
  node: {
    fields: {
      slug: string
    }
    frontmatter: {
      title: string
      path: string
      date: string
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

const BlogListStyles = styled.div`
  padding: 1.5rem 1rem;
  #title {
    font-size: 6.5rem;
    text-align: center;
    padding: 1.5rem;
  }
`

const BlogList: React.FC<BlogListProps> = ({ pageContext, data }) => {
  const { edges } = data.allMarkdownRemark
  const { currentPage, numPages } = pageContext

  return (
    <Layout>
      <BlogListStyles>
        <h1 id="title">blog Posts</h1>
        <Page>
          {edges.map(({ node }) => (
            <BlogItem key={node.fields.slug} data={node} />
          ))}
        </Page>
      </BlogListStyles>
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
          fields {
            slug
          }
          frontmatter {
            title
            path
            date(formatString: "dd MMMM YYYY")
          }
          excerpt
        }
      }
    }
  }
`

export default BlogList
