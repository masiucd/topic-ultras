/* eslint-disable no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfiles } from '../../actions/profile';
import Spinner from '../styled/Spinner';
import { Container } from '../styled/Grid';
import ProfileItem from './ProfileItem';
import { ProfileWrapper } from '../styled/Wrapper';

const Profiles = ({ getProfiles, profile }) => {
  const { profiles, loading } = profile;

  useEffect(() => {
    getProfiles();
  }, []);

  return (
    <>
      <Container>
        <ProfileWrapper>
          <h1>Developers</h1>
          <p>Get in touch with the developers</p>
          {!loading && profiles.length !== 0 ? (
            profiles.map(p => <ProfileItem key={p._id} profile={p} />)
          ) : (
            <Spinner />
          )}
        </ProfileWrapper>
      </Container>
    </>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({ profile: state.profile });
export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);
