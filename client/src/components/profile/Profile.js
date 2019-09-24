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
import Experience from './Experience';
import Education from './Education';

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

            <div className="profile-experience">
              {profile && profile[0].experience.length > 0 ? (
                profile[0].experience.map(x => (
                  <Experience key={x._id} profile={profile} />
                ))
              ) : (
                <h3 className="no-msg">No Experience</h3>
              )}
              {profile && profile[0].education.length > 0 ? (
                profile[0].education.map(edu => (
                  <Education key={edu._id} profile={edu} />
                ))
              ) : (
                <h3 className="no-msg">No education</h3>
              )}
            </div>
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
