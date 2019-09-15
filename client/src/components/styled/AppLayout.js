import React from 'react';
import PropTypes from 'prop-types';
import GlobalStyle from './GlobalStyle';
import Navbar from './Navbar';

const AppLayout = ({ children }) => (
  <>
    <GlobalStyle />
    <Navbar />
    <main>{children}</main>
  </>
);

AppLayout.propTypes = {
  children: PropTypes.array.isRequired,
};

export default AppLayout;
