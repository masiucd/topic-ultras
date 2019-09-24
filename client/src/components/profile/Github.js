import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../styled/Spinner';
import { getGithubRepos } from '../../actions/profile';

const Github = ({ getGithubRepos, profile }) => {
  let a;
  return (
    <div>
      <h1>s</h1>
    </div>
  );
};

Github.propTypes = {
  getGithubRepos: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({ profile: state.profile });

export default connect(
  mapStateToProps,
  { getGithubRepos }
)(Github);
