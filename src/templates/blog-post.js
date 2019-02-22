import React from 'react'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'
import { graphql } from 'gatsby'

import Layout from '../components/layout'

function BlogPost({ data }) {
  return (
    <Layout>
      <MDXRenderer>{data.mdx.code.body}</MDXRenderer>
    </Layout>
  )
}

export const blogPostQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug }}) {
      code {
        body
      }
    }
  }
`

export default BlogPost