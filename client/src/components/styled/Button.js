import styled from 'styled-components';
import { cl } from './GlobalStyle';

export const BtnPrimary = styled.button`
  padding: 0.6rem 0.88rem;
  background: ${props => (props.vip ? `${cl.primary}` : `${cl.white}`)};
  z-index: 2;
  cursor: pointer;
  position: relative;
  font-size: 1.5rem;
  margin: 1rem 0;
  border: ${props =>
    props.vip ? `2px solid ${cl.primary}` : `2px solid ${cl.dark}`};
  transition: all 300ms ease-in-out;
  border-radius: 8px;
  box-shadow: 2px 1px 2px 2px rgba(0, 0, 0, 0.4);
  &:hover {
    background: ${cl.dark};
    color: #fff;
    border: ${props =>
      props.vip ? `1px solid ${cl.dark}` : `1px solid ${cl.primary}`};
    transform: scale(1.1);
    box-shadow: 3px 4px 2px 2px rgba(0, 0, 0, 0.4);
  }
`;
