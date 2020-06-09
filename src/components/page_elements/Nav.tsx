import * as React from 'react'
import styled from 'styled-components'

interface Props {
  className: string
}

const Nav: React.FC<Props> = ({ className }) => {
  return (
    <nav className={className}>
      {' '}
      <h1> Legia CWSKS </h1>{' '}
    </nav>
  )
}

export default styled(Nav)`
  padding: 1.5rem 2rem;
  background: ${({ theme }) => theme.colors.dark};
  color: ${({ theme }) => theme.colors.white};
`
