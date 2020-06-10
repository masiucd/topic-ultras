import styled from 'styled-components'
import { Link } from 'gatsby'
import AniLink from 'gatsby-plugin-transition-link/AniLink'

export const StyledBtn = styled(AniLink)`
  padding: 0.6rem 0.9rem;
  font-size: 1.8rem;
  border: ${props => props.theme.colors.white} 2px solid;
  width: 14rem;
  text-align: center;
  ${props => props.theme.shadows.elevations[1]};
  background-image: -webkit-gradient(
    linear,
    left top,
    right top,
    color-stop(50%, ${props => props.theme.colors.common}),
    color-stop(50%, ${props => props.theme.colors.offWhite})
  );
  background-image: (
    linear,
    left top,
    right top,
    color-stop(50%, ${props => props.theme.colors.common}),
    color-stop(50%, ${props => props.theme.colors.offWhite})
  );
  background-position: 0;
  background-size: 200%;
  cursor: pointer;
  font-weight: 700;
  display: block;
  margin: 1.5rem auto;
  transition: ${props => props.theme.transition.mainTransition};
  color: ${props => props.theme.colors.white};
  &:hover {
    ${props => props.theme.shadows.elevations[2]};
    color: ${props => props.theme.colors.black};
    background-position: -100%;
    width: 16rem;
    border: ${props => props.theme.colors.black} 2px solid;
  }
  &:active {
    position: relative;
    top: 8px;
  }
`
