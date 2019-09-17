import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { DeveloperBoard } from 'styled-icons/material';
import { Wrapper } from '../styled/Wrapper';
import { Form } from '../styled/Form';
import { BtnPrimary } from '../styled/Button';
import { setAlert } from '../../actions/alert';

const Login = ({ setAlert }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (email.length === '' || password.length === '') {
      setAlert('please fill in the fields!', 'danger');
    } else {
      setAlert('Welcome Master!', 'success');
    }
  };

  return (
    <>
      <Wrapper>
        <h1>
          Sign Up{' '}
          <span>
            {' '}
            <DeveloperBoard size="35" />{' '}
          </span>{' '}
        </h1>
        <Form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              required
              onChange={e => handleChange(e)}
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              required
              onChange={e => handleChange(e)}
            />
          </div>
          <BtnPrimary>Login 🏄🏻‍♀️ </BtnPrimary>
        </Form>
        <p>
          Dont' have a account? <Link to="/register">Register</Link>{' '}
        </p>
      </Wrapper>
    </>
  );
};

Login.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

export default connect(
  null,
  { setAlert }
)(Login);
