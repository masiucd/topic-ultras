/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentProfile } from '../../actions/profile';
import Spinner from '../styled/Spinner';

const Dashboard = ({ getCurrentProfile, profile, auth }) => {
  const { loading } = profile;
  const { user } = auth;
  useEffect(() => {
    getCurrentProfile();
  }, []);

  return (
    <>
      {loading && profile === null ? (
        <Spinner />
      ) : (
        <>
          <h1>Dashboard</h1>
          <p>Welcome {user && user.name}</p>
          {profile !== null ? (
            <>Has </>
          ) : (
            <>
              <p>Look like you don't have a profile, let's set up one</p>{' '}
              <Link to="/create-profile">Create Profile</Link>
            </>
          )}
        </>
      )}
    </>
  );
};

Dashboard.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ profile: state.profile, auth: state.auth });

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard);
