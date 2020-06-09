import styled from 'styled-components'

export const StyledBtn = styled.button`
  padding: 0.6rem 0.9rem;
  font-size: 1.8rem;
  border: ${props => props.theme.colors.dark} 2px solid;
  width: 14rem;
  ${props => props.theme.shadows.elevations[1]};
  background-image: -webkit-gradient(
    linear,
    left top,
    right top,
    color-stop(50%, ${props => props.theme.colors.white}),
    color-stop(50%, ${props => props.theme.colors.dark})
  );
  background-image: (
    linear,
    left top,
    right top,
    color-stop(50%, ${props => props.theme.colors.white}),
    color-stop(50%, ${props => props.theme.colors.dark})
  );
  background-position: 0;
  background-size: 200%;
  cursor: pointer;
  font-weight: 700;
  display: block;
  margin: 1.5rem auto;
  transition: ${props => props.theme.transition.mainTransition};
  &:hover {
    ${props => props.theme.shadows.elevations[2]};
    color: ${props => props.theme.colors.white};
    background-position: -100%;
    width: 16rem;
  }
  &:active {
    position: relative;
    top: 8px;
  }
`
