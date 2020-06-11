import * as React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import Layout from '../components/layout'

interface DataProps {
  markdownRemark: {
    html: string
    frontmatter: {
      title: string
    }
  }
}

interface PageContext {
  pathSlug: string
}

interface BlogPostProps {
  data: DataProps
  pageContext: PageContext
}

const StyledBlogPost = styled.section`
  max-width: 1000px;
  margin: 2rem auto;
  #blog-post-title {
    font-size: 5rem;
  }
`

const Content = styled.div`
  padding: 1rem 0;
`

const BlogPost: React.FC<BlogPostProps> = ({ data, pageContext }) => {
  const { markdownRemark } = data
  return (
    <Layout>
      <StyledBlogPost>
        <h1 id="blog-post-title">{markdownRemark.frontmatter.title}</h1>
        <Content dangerouslySetInnerHTML={{ __html: markdownRemark.html }} />
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
