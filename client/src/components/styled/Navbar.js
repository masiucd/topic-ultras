import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { cl } from './GlobalStyle';

const Navbar = props => {
  let a;
  return (
    <Nav>
      <h1>Dev App</h1>
      <ul className="nav__list">
        <li className="nav__item">
          <a href="" className="nav__link">
            Home
          </a>
        </li>
      </ul>
    </Nav>
  );
};

Navbar.propTypes = {};

const Nav = styled.nav`
  padding: 1em;
  background: transparent;
`;

export default Navbar;
