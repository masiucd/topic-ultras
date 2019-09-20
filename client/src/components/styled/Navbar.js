/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Devices } from 'styled-icons/material/Devices';
import { Menu } from 'styled-icons/material';
import media from 'styled-media-query';
import { connect } from 'react-redux';
import { cl } from './GlobalStyle';
import { logout } from '../../actions/auth';

const Navbar = ({ auth, logout, history }) => {
  const { loading, isAuth } = auth;
  const authLinks = (
    <>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <Link to="/posts">Posts</Link>
      </li>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user" />{' '}
          <span className="hide-sm">Dashboard</span>
        </Link>
      </li>
      <li>
        <a onClick={logout} href="#!">
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </>
  );

  const guestLinks = (
    <>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </>
  );

  return (
    <Nav>
      <h1>
        <Link to="/">
          <Devices size="35" /> Dev app{' '}
        </Link>
      </h1>
      <ul className="nav__list">
        {!loading && isAuth ? authLinks : guestLinks}
      </ul>
      <Menu size="35" id="hamburger" />
    </Nav>
  );
};

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const Nav = styled.nav`
  padding: 1em;
  background: transparent;
  display: flex;
  .nav__list {
    display: flex;
    align-items: center;
    li {
      padding: 0 0.7rem;
      transition: all 300ms ease-in-out;
      a {
        transition: all 300ms ease-in-out;
        font-size: 1.6rem;
        &:hover {
          color: ${cl.primary};
          border-bottom: 2px solid ${cl.primary};
        }
      }
    }
  }
  #hamburger {
    margin-left: auto;
    cursor: pointer;
  }
  @media (max-width: 450px) {
    .nav__list {
      display: none;
    }
  }
  ${media.greaterThan('small')`
    .nav__list{
      margin-left: auto;
    }
    #hamburger {
        display: none;
      }
  `}
`;
const mapStateToProps = state => ({ auth: state.auth });
export default connect(
  mapStateToProps,
  { logout }
)(Navbar);

// <li className="nav__item">
// <Link to="/developers" className="nav__link">
//   Developers
// </Link>
// </li>
// {auth.isAuth ? (
// <>
//   <li className="nav__item">
//     {' '}
//     <Link to="/profile">Profile</Link>{' '}
//   </li>
//   <li className="nav__item">
//     {' '}
//     <Link to="/profile" onClick={handleLogout}>
//       Logout
//     </Link>{' '}
//   </li>
// </>
// ) : (
// <>
//   {' '}
//   <li className="nav__item">
//     <Link to="/register" className="nav__link">
//       Register
//     </Link>
//   </li>
//   <li className="nav__item">
//     <Link to="/login" className="nav__link">
//       Login
//     </Link>
//   </li>{' '}
// </>
// )}
