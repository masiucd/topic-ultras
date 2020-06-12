import * as React from 'react'
import styled from 'styled-components'
import { animated, useSpring } from 'react-spring'
import AniLink from 'gatsby-plugin-transition-link/AniLink'
import { handleFlex } from '../../styles/utils/helpers'

type Link = {
  name: string
  path: string
}
interface Props {
  on: boolean
  onLinks: Array<Link>
}

const StyledMenu = styled(animated.ul)`
  background: rgba(0, 0, 0, 0.6);
  width: 100%;
  /* height: 100vh; */
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  ${handleFlex('column', 'flex-start', 'center')}

  li {
    padding: 1.5rem;
    &:first-child {
      margin-top: 20rem;
    }
  }

  a {
    font-size: 5rem;
    text-transform: capitalize;
    transition: ${props => props.theme.transition.mainTransition};
    padding: 0.5rem 1rem;
    &:hover {
      border-bottom: 2px solid ${({ theme }) => theme.colors.white};
      background: rgba(0, 0, 0, 0.6);
    }
  }
`

const MobileMenu: React.FC<Props> = ({ on, onLinks }) => {
  const { x, opacity } = useSpring({
    opacity: on ? 1 : 0,
    x: on ? 0 : 100,
  })

  return (
    <StyledMenu
      style={{
        opacity,
        transform: x.interpolate(x => `translate3d(0,${x * -1}%,0)`),
      }}
    >
      {onLinks.map(link => (
        <li key={link.name}>
          {' '}
          <AniLink fade to={link.path}>
            {link.name}
          </AniLink>{' '}
        </li>
      ))}
    </StyledMenu>
  )
}
export default MobileMenu
