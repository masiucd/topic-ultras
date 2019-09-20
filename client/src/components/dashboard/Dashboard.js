/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';

const Dashboard = ({ getCurrentProfile, profile, auth }) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
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
