const { createFilePath } = require('gatsby-source-filesystem')
const path = require('path')

exports.onCreateNode = function ({ actions, node, getNode }) {
  if (node.internal.type === `Mdx`) {
    const slug = createFilePath({
      node,
      getNode
    })

    actions.createNodeField({
      node,
      name: `slug`,
      value: slug
    })
  }
}

exports.createPages = async function createPages({ actions, graphql }) {
  const { data, errors } = await graphql(`
    {
      allMdx {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  if (errors) {
    return Promise.reject(errors)
  }

  const blogPostTemplate = path.resolve(`src/templates/blog-post.js`)

  data.allMdx.edges.forEach(({ node }) => {
    actions.createPage({
      component: blogPostTemplate,
      path: node.fields.slug,
      context: {
        slug: node.fields.slug
      }
    })
  })
}
