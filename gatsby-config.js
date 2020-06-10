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
  },
  plugins: [
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
  ],
}
