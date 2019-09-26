/* eslint-disable no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/post';
import Spinner from '../styled/Spinner';
import { WrapperSecondary } from '../styled/Wrapper';
import PostItem from './PostItem';
import PostForm from './PostForm';

const Posts = ({ getPosts, post: { loading, posts } }) => {
  useEffect(() => {
    getPosts();
  }, []);

  return loading ? (
    <Spinner />
  ) : (
    <>
      {' '}
      <WrapperSecondary>
        {' '}
        <h1>Welcome to the community</h1> <PostForm />
        <div className="posts">
          {posts.map(post => (
            <PostItem key={post._id} post={post} />
          ))}
        </div>
      </WrapperSecondary>{' '}
    </>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({ post: state.post });
export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);
