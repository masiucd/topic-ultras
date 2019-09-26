/* eslint-disable no-shadow */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';
import { FormSecondary } from '../styled/Form';
import { BtnPrimary } from '../styled/Button';

const PostForm = ({ addPost }) => {
  const [text, setText] = useState('');

  return (
    <>
      <FormSecondary
        onSubmit={e => {
          e.preventDefault();
          addPost({ text });
          setText('');
        }}
      >
        <div className="title">
          <h3>add a post</h3>
        </div>
        <div className="form-group">
          <input
            name="text"
            placeholder="add a post"
            value={text}
            required
            onChange={e => setText(e.target.value)}
          ></input>
        </div>
        <div className="form-group">
          <BtnPrimary type="submit">Submit</BtnPrimary>
        </div>
      </FormSecondary>
    </>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(
  null,
  { addPost }
)(PostForm);
