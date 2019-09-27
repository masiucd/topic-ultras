/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { addComment } from '../../actions/post';
import { FormSecondary } from '../styled/Form';
import useForm from '../../hooks/useForm';
import { BtnPrimary } from '../styled/Button';

const CommentForm = ({ postId, addComment }) => {
  const [text, handleText, reset] = useForm();
  return (
    <CommentWrapper>
      <h1>CommentForm</h1>
      <FormSecondary
        onSubmit={e => {
          e.preventDefault();
          addComment(postId, { text });
          reset();
        }}
      >
        <div className="form-group">
          <input
            type="text"
            name="text"
            placeholder="add a comment"
            onChange={handleText}
            value={text}
          />
        </div>
        <div className="form-group">
          <BtnPrimary type="submit">add a comment 🙌 </BtnPrimary>
        </div>
      </FormSecondary>
    </CommentWrapper>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
};

const CommentWrapper = styled.div`
  padding: 2rem 1.5rem;
`;

export default connect(
  null,
  { addComment }
)(CommentForm);
