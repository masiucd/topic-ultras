import * as React from 'react'
import styled from 'styled-components'

interface Props {}

const StyledSearchWrapper = styled.div`
  width: 35%;
  @media (max-width: 960px) {
    width: 55%;
  }
`
const StyledSearch = styled.input`
  width: 100%;
  border: 2px solid ${props => props.theme.colors.primary};
  border-radius: 12px;
  padding: 0.4rem 0.8rem;
  ${({ theme }) => theme.shadows.elevations[1]};
  font-size: 2rem;
  transition: ${props => props.theme.transition.quickTransition};
  outline: none;
  &:focus {
    ${({ theme }) => theme.shadows.elevations[2]};
    padding: 0.5rem 0.9rem;
  }
  @media (max-width: 960px) {
    width: 80%;
  }
`

const NavSearch: React.FC<Props> = () => {
  return (
    <StyledSearchWrapper>
      <StyledSearch />
    </StyledSearchWrapper>
  )
}
export default NavSearch
