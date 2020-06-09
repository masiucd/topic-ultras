import * as React from 'react'
import styled, {
  createGlobalStyle,
  ThemeProvider,
  DefaultTheme,
} from 'styled-components'
import Footer from './page_elements/Footer'
import Nav from './page_elements/Nav'
import Seo from '../SEO'

interface Props {
  children: React.ReactNode
  onTitle?: string
  onDescription?: string
  onImage?: string
  onArticle?: boolean
}

export const Page = styled.div`
  max-width: ${props => props.theme.sizes.maxWidth};
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 3px solid blue;
  margin: 0 auto;
`

const Main = styled.main`
  flex-grow: 1 auto;
  border: 3px solid red;
`

const theme: DefaultTheme = {
  appSize: '10px',
  shadows: {
    elevations: [
      'box-shadow: inset 0 7px 9px -7px rgba(0,0,0, 0.7)',
      'box-shadow: 0 1px 3px rgba(0,0,0, 0.12), 0 1px 2px rgba(0,0,0, 0.24)',
      'box-shadow: 0 3px 6px rgba(0,0,0, 0.16), 0 3px 6px rgba(0,0,0, 0.23)',
      'box-shadow: 3px 2px rgba(42, 43, 49,.3)',
    ],
  },
  colors: {
    primary: '#2c73d2',
    primaryShadow: 'rgba(42, 43, 49,.3)',
    common: '#0081cf',
    majo: '#0089ba',
    nice: '#008e9b',
    black: '#252525',
    secondary: '#008e9b',
    secondaryShadow: 'rgba(13, 71, 161, .9)',
    danger: '#F9627D',
    dark: '#845ec2',
    white: '#fff',
    offWhite: '#fefefe',
  },
  brakePoints: {
    small: 400,
    medium: 960,
    large: 1140,
  },
  sizes: {
    maxWidth: '1100px',
    mainSpacing: '4px',
  },
  transition: {
    mainTransition: 'all .3s linear',
    secondaryTransition: 'all 0.3s ease-in-out',
    quickTransition: 'all 200ms ease-in-out',
  },
}

const Layout: React.FC<Props> = ({
  children,
  onArticle,
  onDescription,
  onImage,
  onTitle,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Seo
        onArticle={onArticle}
        onDescription={onDescription}
        onTitle={onTitle}
        onImage={onImage}
      />
      <Nav className="nav" />
      <Main>{children}</Main>
      <Footer />
    </ThemeProvider>
  )
}

const GlobalStyles = createGlobalStyle`




*::before,*::after,* {
      margin: 0;
      padding: 0;
      box-sizing: inherit;
    }
    html {
      font-size: ${props => props.theme.appSize};
      font-family: 'Open Sans Condensed', sans-serif;
    }
    body {
      box-sizing: border-box;
      font-family: 'Open Sans Condensed', sans-serif;
      padding: 0;
      margin: 0;
      font-size: 1.5rem;
      line-height: 2;
    }

    ul{
      list-style:none;
    }

    a {
    text-decoration: none;
    color: ${props => props.theme.colors.white};
    }

    h1{
      font-family: 'Caveat', cursive;
    }
`

export default Layout
