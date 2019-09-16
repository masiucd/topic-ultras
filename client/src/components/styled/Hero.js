import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import media from 'styled-media-query';
import { cl } from './GlobalStyle';

const Hero = ({ heroText }) => {
  let a;
  return (
    <StyledHero>
      <div className="hero-wrapper">
        <h1>{heroText}</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
          molestias dolor vel illo quae, nisi recusandae tenetur, dolorum harum
          at ad ut dolore facilis cumque mollitia commodi corporis nesciunt
          placeat porro dolorem animi quaerat minus! Maxime fuga officia
          excepturi quis corporis minus dolorum vitae. Minima.
        </p>
      </div>
    </StyledHero>
  );
};

Hero.propTypes = {
  heroText: PropTypes.string,
};

const StyledHero = styled.div`
  min-height: 60vh;
  background: url('https://images.pexels.com/photos/2899726/pexels-photo-2899726.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')
    center bottom;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  color: ${cl.white};
  display: flex;
  align-items: center;

  &::after {
    content: '';
    background: rgba(0, 0, 0, 0.3);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  ${media.greaterThan('small')`
    .hero-wrapper {
    width: 60%;
    padding: 1.2rem;
    h1,p{
      margin: 0.5rem;
    }
    h1 {
    z-index: 2;
    font-size: 5rem;
  }
  p{
    font-size: 1.5rem;
  }
    }
  `}
`;
export default Hero;
