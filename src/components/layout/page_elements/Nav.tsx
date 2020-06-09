import * as React from 'react'
import styled from 'styled-components'
import NavList from './NavList'

interface Props {
  className: string
}

const NavTitle = styled.div``

const Nav: React.FC<Props> = ({ className }) => {
  return (
    <nav className={className}>
      <NavTitle>
        <h3>title</h3>
      </NavTitle>
      <NavList />
    </nav>
  )
}

export default styled(Nav)`
  padding: 1.5rem 2rem;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
`
