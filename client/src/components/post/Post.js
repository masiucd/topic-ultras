/* eslint-disable no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/post';

const Post = ({ getPosts, post }) => {
  useEffect(() => {
    getPosts();
  }, []);
  console.log(post);
  return (
    <div>
      <h1>s</h1>
    </div>
  );
};

Post.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({ post: state.post });
export default connect(
  mapStateToProps,
  { getPosts }
)(Post);
