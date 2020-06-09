import * as React from 'react'
import styled from 'styled-components'

interface Props {}

const FooterStyles = styled.footer`
  background: ${props => props.theme.colors.black};
  color: ${props => props.theme.colors.white};
  padding: 1.5rem 2rem;
`

const Footer: React.FC<Props> = () => {
  return (
    <FooterStyles>
      <h1>Footer</h1>
    </FooterStyles>
  )
}
export default Footer
