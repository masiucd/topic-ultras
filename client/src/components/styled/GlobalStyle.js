import { createGlobalStyle } from 'styled-components';

export const cl = {
  primary: '#2F52E0',
  secondary: '#BCED09',
  warning: '#FF715B',
  danger: '#FF715B',
  white: '#fff',
  dark: '#4C5B5C',
};
export default createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Montserrat:300,300i,400,400i,500,500i&display=swap');

*::before,*::after, *
{
  margin:0;
  padding: 0;
  box-sizing: inherit;
}
html{
  font-size: 10px;
}
  body {
    font-family: 'Montserrat', sans-serif;
    box-sizing: border-box;
    min-height: 100%;
    display: flex;
    color: ${cl.dark};
    flex-direction: column;
    background: ${cl.white};
  }
  main{
    flex-grow: 1 auto;
  }

  ul,li{
    list-style:none;
  }
  a{
    text-decoration: none;
    color: ${cl.dark};
  }
  p{
    letter-spacing:.18rem;
    line-height: 2.5rem;
  }
`;
