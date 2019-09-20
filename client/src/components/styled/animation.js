import { keyframes } from 'styled-components';

export const slideInTop = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-80px);
  }
  20% {
    opacity: 1;
    transform: translateY(12px);
  }
  85% {
    opacity: 1;
    transform: translateY(16px);
  }
  100% {
    opacity: 0;
    transform: translateY(10px);
  }
`;
