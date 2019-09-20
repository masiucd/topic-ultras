import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Hero from '../components/styled/Hero';

const Home = ({ auth }) => {
  const { isAuth } = auth;
  if (isAuth) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <>
      <Hero heroText="Dev App" />
    </>
  );
};

Home.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({ auth: state.auth });

export default connect(mapStateToProps)(Home);
