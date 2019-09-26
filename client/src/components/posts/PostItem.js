/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { BtnPrimary } from '../styled/Button';
import { addLike, removeLike, deletePost } from '../../actions/post';

const PostItem = ({
  post: { _id, text, name, avatar, user, likes, comments, date },
  auth,
  addLike,
  removeLike,
  deletePost,
  showActions,
}) => {
  let a;
  return (
    <StyledPost>
      <div className="img">
        <Link to={`/profile/${user}`}>
          <img src={avatar} alt={name} />
        </Link>
        <h3>{name}</h3>
      </div>
      <div className="body">
        <p>
          {text}{' '}
          <span>
            posted on <Moment format="YYYY/MM/DD">{date}</Moment>{' '}
          </span>
        </p>
      </div>
      {showActions && (
        <>
          <div className="cta">
            <BtnPrimary onClick={() => addLike(_id)}>
              👍🏻 {likes.length > 0 && <span>{likes.length}</span>}{' '}
            </BtnPrimary>
            <BtnPrimary onClick={() => removeLike(_id)}>👎🏻</BtnPrimary>
            <Link to={`/posts/${_id}`}>
              <BtnPrimary>
                {' '}
                {comments.length > 0 && comments.length} Discussion
              </BtnPrimary>
            </Link>
            <BtnPrimary onClick={() => deletePost(_id)}>❌</BtnPrimary>
          </div>
        </>
      )}
    </StyledPost>
  );
};

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  showActions: PropTypes.bool.isRequired,
};
const mapStateToProps = state => ({ auth: state.auth });

const StyledPost = styled.div`
  display: grid;
  padding: 3rem;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  grid-template-rows: auto;
  grid-gap: 10px;
  width: 100%;
  margin: 0.6rem 0;
  box-shadow: 1px 2px 1px 1px #ccc;
  .img {
    text-align: center;
    img {
      border-radius: 50%;
    }
  }
  .body {
    display: flex;
    align-self: center;
    p {
      span {
        font-size: 1.3rem;
        color: #ccc;
        display: block;
      }
    }
  }
  .cta {
    grid-column: 1/2;
    align-items: center;
    justify-content: center;
    display: flex;
    button {
      margin: 0 0.7rem;
    }
  }
`;

export default connect(
  mapStateToProps,
  { addLike, removeLike, deletePost }
)(PostItem);
