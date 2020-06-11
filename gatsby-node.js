const path = require('path')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const blogListTemplate = path.resolve(`src/templates/blog-list.tsx`)
  const blogPostTemplate = path.resolve(`src/templates/blog-post.tsx`)

  const result = await graphql(`
    query {
      allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              title
              path
              date(formatString: "MMMM DD YYYY")
              spoiler
            }
            id
            html
            excerpt
          }
        }
      }
    }
  `)

  const posts = result.data.allMarkdownRemark.edges
  const postsPerPage = 6
  const numPages = Math.ceil(posts.length / postsPerPage)
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? 'bloglist' : `/bloglist/${i + 1}`,
      component: blogListTemplate,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })

  result.data.allMarkdownRemark.edges.forEach(page => {
    createPage({
      path: `/blog${page.node.frontmatter.path}`,
      component: blogPostTemplate,
      context: {
        pathSlug: page.node.frontmatter.path,
        title: page.node.frontmatter.title,
      },
    })
  })
}
