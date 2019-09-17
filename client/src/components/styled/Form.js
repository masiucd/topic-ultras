import styled from 'styled-components';
import media from 'styled-media-query';
import { cl } from './GlobalStyle';

export const Form = styled.form`
  padding: 5rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  margin: 2rem 0;
  border: 2px solid ${cl.dark};
  min-width: 54%;
  text-align: center;
  height: 100%;
  input {
    padding: 0.6rem 0.85rem;
    border: 2px solid ${cl.dark};
    margin: 1rem 0;
    transition: all 300ms ease-in-out;
    width: 60%;
    box-shadow: 2px 1px 2px 2px rgba(0, 0, 0, 0.4);
    font-size: 1.5rem;
    &:focus {
      transform: scale(1.03);
      border: 2px solid ${cl.primary};
    }
  }
  button {
    width: 60%;
    margin: 2rem auto;
    &:hover {
      transform: scale(1.03);
    }
  }
  ${media.greaterThan('small')``};
`;
