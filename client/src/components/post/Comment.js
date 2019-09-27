import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { deleteComment } from '../../actions/post';

const Comment = ({
  postId,
  comment: { _id, text, name, avatar, user, date },
  deleteComment,
  auth,
}) => {
  console.log(avatar);
  return (
    <CommentWrapper>
      <div className="img">
        <Link to={`/profile/${user}`}>
          <img src={avatar} alt={name} />
        </Link>
        <h3>{name}</h3>
      </div>
      <div className="body">
        <p>{text}</p>
      </div>
      <div className="footer">
        <p>
          Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
        </p>
        {!auth.loading && user === auth.user._id && (
          <span onClick={() => deleteComment(postId, _id)}> Delete ❌ </span>
        )}
      </div>
    </CommentWrapper>
  );
};

Comment.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({ auth: state.auth });

const CommentWrapper = styled.div`
  padding: 2rem 1.5rem;
  .img {
    h3 {
      font-size: 2.5rem;
    }
  }
  .body,
  .footer {
    p {
      font-size: 1.8rem;
      margin: 1rem 0;
    }
  }
  .footer {
    display: flex;
    align-items: center;
    span {
      margin: 0 1.5rem;
      font-size: 1.5rem;
      cursor: pointer;
    }
  }
`;
export default connect(
  mapStateToProps,
  { deleteComment }
)(Comment);
