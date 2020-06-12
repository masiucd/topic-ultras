require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: 'On the Go Tours',
    titleTemplate: '%s · The Real Deal',
    description: 'Explore the world',
    keywords: 'pasta,italy,pizza,wine,family,football',
    siteUrl: 'https://marcelable.com',
    image: '/images/italy.jpg',
    author: {
      name: 'Marcell Ciszek',
      url: 'https://marcellable.com',
      email: 'ciszekmarcell@gmail.com',
    },
    social: {
      twitterUsername: 'CiszekMarcell',
    },
    links: [
      {
        name: 'home',
        path: '/',
      },
      {
        name: 'about',
        path: '/about',
      },
      {
        name: 'blog',
        path: '/blog-list',
      },
      {
        name: 'contact',
        path: '/contact',
      },
    ],
  },
  plugins: [
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        // Learn about environment variables: https://gatsby.dev/env-vars
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/src/content`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1rem',
              excerpt_separator: `<!-- end -->`,
            },
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1140,
              quality: 90,
              linkImagesToOriginal: false,
            },
          },
        ],
      },
    },
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: 'https://gatsby-starter-typescript-plus.netlify.com',
      },
    },
    'gatsby-plugin-emotion',
    'gatsby-plugin-typescript',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet',
    `gatsby-plugin-transition-link`,
  ],
}
