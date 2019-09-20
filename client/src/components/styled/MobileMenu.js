import React from 'react';
import PropTypes from 'prop-types';
import media from 'styled-media-query';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { cl } from './GlobalStyle';
import { logout } from '../../actions/auth';
import { slideInTop } from './animation';

const MobileMenu = ({ auth, logout }) => {
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
          <i className="fas fa-user" /> <span>Dashboard</span>
        </Link>
      </li>
      <li>
        <a onClick={logout} href="#!">
          <span>Logout</span>
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
    <Styled>{!auth.loading && !auth.isAuth ? guestLinks : authLinks}</Styled>
  );
};

MobileMenu.propTypes = {
  auth: PropTypes.object.isRequired,
};

const Styled = styled.ul`
  display: flex;
  flex-direction: column;
  z-index: 20;
  position: absolute;
  top: 7%;
  left: calc(80% - 10%);
  transition: all 500ms;
  animation: ${slideInTop} 500ms ease-in;
  li {
    font-size: 1.6rem;

    color: ${cl.danger};
    a {
      color: #fff;
    }
  }
  ${media.greaterThan('small')`
    display: none;
  `}
`;
const mapStateToProps = state => ({ auth: state.auth });

export default connect(
  mapStateToProps,
  { logout }
)(MobileMenu);
