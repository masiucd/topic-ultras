import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    appSize: string
    shadows: {
      elevations: Array<string>
    }
    colors: {
      primary: string
      nice: string
      majo: string
      black: string
      primaryShadow: string
      secondary: string
      secondaryShadow: string
      white: string
      offWhite: string
      danger: string
      common: string
      dark: string
    }
    sizes: {
      maxWidth: string
      mainSpacing: string
    }
    brakePoints: {
      small: number
      medium: number
      large: number
    }
    transition: {
      mainTransition: string
      secondaryTransition: string
      quickTransition: string
    }
  }
}
