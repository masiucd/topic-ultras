/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPost } from '../../actions/post';
import PostItem from '../posts/PostItem';
import Spinner from '../styled/Spinner';

const Post = ({ getPost, post: { post, loading }, match }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost]);
  return (
    <>
      <Link>Back to posts</Link>
      {loading || post === null ? (
        <Spinner />
      ) : (
        <>
          {' '}
          <PostItem post={post} showActions={false} />{' '}
        </>
      )}
    </>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({ post: state.post });
export default connect(
  mapStateToProps,
  { getPost }
)(Post);
