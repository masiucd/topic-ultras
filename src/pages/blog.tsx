import * as React from 'react'
import { PageProps, graphql } from 'gatsby'
import styled from 'styled-components'
import Layout, { Page } from '../components/layout'

interface Node {
  frontmatter: {
    title: string
    path: string
  }
}
interface Props {
  blogPosts: {
    edges: Array<Node>
  }
}

const BlogPage: React.FC<PageProps<Props>> = ({ data }) => {
  return (
    <Layout>
      <Page>
        <h1> Blog Page </h1>
      </Page>
    </Layout>
  )
}

export const PAGE_QUERY = graphql`
  {
    blogPosts: allMarkdownRemark {
      edges {
        node {
          frontmatter {
            title
            path
          }
        }
      }
    }
  }
`

export default BlogPage
