import { createGlobalStyle } from 'styled-components';

export const cl = {
  primary: '#2196F3',
  secondary: '#22a7f0',
  warning: '#f7ca18',
  danger: '#FF715B',
  white: '#fff',
  dark: '#4C5B5C',
  dark2: 'rgba(5,10,1,0.7)',
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

  .alert-danger{
    padding: 1.5em;
    background:${cl.danger};
  }
  .alert-success{
    background: ${cl.secondary};

  }
.cta-link {
    border-bottom: 2px solid ${cl.dark};
    font-weight: 800;
    transition: all 300ms ease-in-out;
    &:hover {
      color: ${cl.primary};
      border-bottom: 2px solid ${cl.primary};
    }
  }
  .go-back-link{
    width: 20%;
    font-size: 1.5rem;
  }

`;
