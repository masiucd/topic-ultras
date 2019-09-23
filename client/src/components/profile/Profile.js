/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../styled/Spinner';
import { getProfileById } from '../../actions/profile';
import { WrapperSecondary } from '../styled/Wrapper';
import ProfileTop from './ProfileTop';
import About from './About';

const Profile = ({
  auth,
  profile: { loading, profile },
  match,
  getProfileById,
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById]);
  // TODO Style the profile component
  return (
    <>
      {loading && profile === null ? (
        <Spinner />
      ) : (
        <>
          <WrapperSecondary>
            <Link to="/profiles" className="cta-link">
              Back to profiles
            </Link>
            {auth.isAuthenticated &&
              auth.loading === false &&
              auth.user._id === profile.user._id && (
                <Link to="/edit-profile" className="cta-link">
                  Edit Profile
                </Link>
              )}
            <ProfileTop profile={profile} />
            <About profile={profile} />
          </WrapperSecondary>
        </>
      )}
    </>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({ profile: state.profile, auth: state.auth });
export default connect(
  mapStateToProps,
  { getProfileById }
)(Profile);
