import styled from 'styled-components';
import media from 'styled-media-query';
import { cl } from './GlobalStyle';

export const Wrapper = styled.section`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 87%;
  min-height: 50rem;
  margin: 0 auto;
  margin-top: 12rem;
  box-shadow: 1px 2px 1px 1px #ccc;
  h1 {
    border-bottom: 2px solid ${cl.dark};
    font-size: 3.4rem;
  }
  p {
    font-size: 1.8rem;
  }
  a,
  .cta-link {
    border-bottom: 2px solid ${cl.dark};
    font-weight: 800;
    transition: all 300ms ease-in-out;
    &:hover {
      color: ${cl.primary};
      border-bottom: 2px solid ${cl.primary};
    }
  }
  ${media.greaterThan('small')``};
`;

export const WrapperSecondary = styled(Wrapper)`
  padding: 1rem;
  justify-content: left;
  align-items: flex-start;
  width: 70%;
  border: 2px solid ${cl.dark};
  padding: 1.5rem;
  h1,
  p {
    margin: 1rem 0;
  }
  p {
    font-size: 2rem;
    text-transform: capitalize;
  }
  .cta-link {
    font-size: 1.6rem;
    letter-spacing: 0.3rem;
  }
`;
