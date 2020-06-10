const path = require('path')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const blogListTemplate = path.resolve(`src/templates/blog-list.tsx`)
  const blogPostTemplate = path.resolve(`src/templates/blog-post.tsx`)

  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              title
              path
              date
              spoiler
            }
            id
            html
          }
        }
      }
    }
  `)
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
