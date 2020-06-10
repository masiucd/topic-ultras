import * as React from 'react'
import styled from 'styled-components'
import { handleFlex } from './styles/utils/helpers'
import { StyledBtn } from './styles/Button'

interface Props {
  title: string
  subTitle?: string
  bgShadow?: boolean
  cta?: boolean
  left?: boolean
  ctaText?: string
  page?: string
}

interface TitleStylesProps {
  bgShadow?: boolean
  left?: boolean
}

const StyledTitle = styled.section<TitleStylesProps>`
  ${handleFlex('column', 'center', 'center')}
  padding: 2rem 1rem;
  background: ${({ theme, bgShadow }) =>
    bgShadow ? theme.colors.primaryShadow : 'none'};
  color: ${({ theme, bgShadow }) =>
    bgShadow ? theme.colors.white : theme.colors.black};
  width: 52vw;
  h1 {
    font-size: 4rem;
  }
  h3 {
    font-size: 2.6rem;
  }
  position: ${({ left }) => left && 'absolute'};
  left: ${({ left }) => left && '0'};

  @media (max-width: 900px) {
    width: 62vw;
  }
  @media (max-width: 500px) {
    width: 82vw;
  }
`

const Title: React.FC<Props> = ({
  bgShadow,
  title,
  subTitle,
  cta,
  left,
  ctaText,
  page,
}) => {
  return (
    <StyledTitle bgShadow={bgShadow} left={left}>
      <h1>{title}</h1>
      {subTitle && <h3>{subTitle}</h3>}
      {cta && (
        <div className="btnWrapper">
          {' '}
          <StyledBtn to={`/${page || 'about'}`}>{ctaText || 'About'}</StyledBtn>
        </div>
      )}
    </StyledTitle>
  )
}
export default Title
