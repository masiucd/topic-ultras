import styled from 'styled-components';
import media from 'styled-media-query';
import { cl } from './GlobalStyle';

export const Wrapper = styled.section`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid red;
  width: 87%;
  margin: 0 auto;
  margin-top: 12rem;
  h1 {
    border-bottom: 2px solid ${cl.dark};
    font-size: 3.4rem;
  }
  p {
    font-size: 1.8rem;
  }
  a {
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
