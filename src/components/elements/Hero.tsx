import * as React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import styled from 'styled-components'

import BackgroundImage, { IFluidObject } from 'gatsby-background-image'
import { handleFlex } from '../styles/utils/helpers'

interface Props {
  className: string
  children: React.ReactNode
  heroBg?: IFluidObject
  home?: boolean
}

const query = graphql`
  {
    hero: file(relativePath: { eq: "hong1.jpeg" }) {
      childImageSharp {
        fluid(quality: 90, maxWidth: 1290) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`
interface HeroImgProps {
  hero: {
    childImageSharp: {
      fluid: IFluidObject
    }
  }
}

const Hero: React.FC<Props> = ({ className, children, heroBg, home }) => {
  const { hero } = useStaticQuery<HeroImgProps>(query)
  return (
    <BackgroundImage
      home={home}
      fluid={heroBg || hero.childImageSharp.fluid}
      className={className}
    >
      {children}
    </BackgroundImage>
  )
}

export default styled(Hero)`
  ${handleFlex('column', 'center', 'center')};
  min-height: ${props => (props.home ? 'calc(90vh - 22px)' : '50vh')};
  background-position: bottom center;
  background-size: cover;
  opacity: 1 !important;
  background-image: linear-gradient(
    to right,
    rgba(0, 10, 120, 0.3),
    rgba(0, 0, 0, 0.5),
    rgba(5, 5, 0, 0.4),
    rgba(21, 22, 0, 0.4)
  );
`
