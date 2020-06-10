import * as React from 'react'
import styled from 'styled-components'
import { handleFlex } from '../styles/utils/helpers'

interface Props {}

const CardRowStyles = styled.section`
  padding: 3rem 1rem;
  ${handleFlex('column', 'center', 'center')}
  @media (min-width: 950px) {
    ${handleFlex('row', 'center', 'center')}
  }
`

const CardRow: React.FC<Props> = () => {
  let a
  return (
    <CardRowStyles>
      {' '}
      <h1> Card Row </h1>{' '}
    </CardRowStyles>
  )
}
export default CardRow
