import * as React from 'react'
import { Helmet } from 'react-helmet'
import { graphql, useStaticQuery } from 'gatsby'
import { useLocation } from '@reach/router'

interface Props {
  onTitle?: string
  onDescription?: string
  onImage?: string
  onArticle?: boolean
}

interface SeoQuery {
  SEO: {
    siteMetadata: {
      title: string
      description: string
      titleTemplate: string
      keywords: string
      siteUrl: string
      image: string
      social: {
        twitterUsername: string
      }
    }
  }
}

const query = graphql`
  {
    SEO: site {
      siteMetadata {
        title
        description
        keywords
        titleTemplate
        siteUrl
        image
        social {
          twitterUsername
        }
      }
    }
  }
`

const Seo: React.FC<Props> = ({
  onTitle,
  onDescription,
  onImage,
  onArticle,
}) => {
  const { pathname } = useLocation()
  const {
    SEO: { siteMetadata },
  } = useStaticQuery<SeoQuery>(query)

  const seo = {
    title: onTitle || siteMetadata.title,
    description: onDescription || siteMetadata.description,
    image: `${siteMetadata.siteUrl}${onImage || siteMetadata.image}`,
    url: `${siteMetadata.siteUrl}${pathname}`,
    twitter: `${siteMetadata.social.twitterUsername}`,
  }

  return (
    <Helmet title={seo.title} titleTemplate={siteMetadata.titleTemplate}>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />

      {seo.url && <meta property="og:url" content={seo.url} />}
      {(onArticle ? true : null) && (
        <meta property="og:type" content="article" />
      )}
      {seo.title && <meta property="og:title" content={seo.title} />}

      {seo.description && (
        <meta property="og:description" content={seo.description} />
      )}
      {seo.image && <meta property="og:image" content={seo.image} />}
      <meta name="twitter:card" content="summary_large_image" />
      {seo.twitter && <meta name="twitter:creator" content={seo.twitter} />}
      {seo.title && <meta name="twitter:title" content={seo.title} />}
      {seo.description && (
        <meta name="twitter:description" content={seo.description} />
      )}
      {seo.image && <meta name="twitter:image" content={seo.image} />}
    </Helmet>
  )
}

export default Seo
