import * as React from 'react'
import styled from 'styled-components'
import { handleFlex } from './styles/utils/helpers'
import { StyledBtn } from './styles/Button'

interface Props {
  title: string
  subTitle?: string
  bgShadow?: boolean
  cta?: boolean
}

interface TitleStylesProps {
  onBgShadow?: boolean
}

const StyledTitle = styled.section<TitleStylesProps>`
  ${handleFlex('column', 'center', 'center')}
  padding: 2rem 1rem;
  background: ${({ theme, onBgShadow }) =>
    onBgShadow && theme.colors.primaryShadow};
  color: ${({ theme, onBgShadow }) => onBgShadow && theme.colors.white};
`

const Title: React.FC<Props> = ({ bgShadow, title, subTitle, cta }) => {
  return (
    <StyledTitle onBgShadow={bgShadow}>
      <h1>{title}</h1>
      {subTitle && <h3>{subTitle}</h3>}
      {cta && (
        <div className="btnWrapper">
          {' '}
          <StyledBtn>Cta</StyledBtn>
        </div>
      )}
    </StyledTitle>
  )
}
export default Title
