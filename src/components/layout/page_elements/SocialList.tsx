import * as React from 'react'
import styled from 'styled-components'
import Image from 'gatsby-image'
import { IFixedObject } from 'gatsby-background-image'
import { handleFlex } from '../../styles/utils/helpers'

interface SocialNode {
  node: {
    id: string
    name: string
    childImageSharp: {
      fixed: IFixedObject
    }
  }
}

export interface SocialProps {
  onSocialXs: Array<SocialNode>
}

function handleUrl(path: string): string {
  switch (path) {
    case 'github':
      return `https://github.com/masiuciszek`
    case 'linkedin':
      return 'https://www.linkedin.com/in/marcell-ciszek/'
    case 'insta':
      return 'https://www.instagram.com/masiuciszek'
    case 'web':
      return 'https://www.marcellable.com/'
    default:
      return `https://github.com/masiuciszek`
  }
}

const StyledSocial = styled.ul`
  ${handleFlex('row', 'center', 'center')};
  li {
    margin: 0 0.4rem;
    padding: 0.4rem;
    background: ${({ theme }) => theme.colors.white};
  }
  @media (max-width: 960px) {
    li {
      margin: 1rem;
    }
  }
`

export default function Social(props: SocialProps) {
  const { onSocialXs } = props

  return (
    <StyledSocial>
      {onSocialXs.map(
        ({ node }) =>
          node.name !== 'menu' && (
            <li key={node.id}>
              <a href={handleUrl(node.name)} target="_blank" rel="noreferrer">
                <Image fixed={node.childImageSharp.fixed} alt={node.name} />
              </a>
            </li>
          ),
      )}
    </StyledSocial>
  )
}
