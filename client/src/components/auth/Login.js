/* eslint-disable no-shadow */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { DeveloperBoard } from 'styled-icons/material';
import { Wrapper } from '../styled/Wrapper';
import { Form } from '../styled/Form';
import { BtnPrimary } from '../styled/Button';
import { setAlert } from '../../actions/alert';
import { login } from '../../actions/auth';

const Login = ({ setAlert, login, auth: { isAuth, user } }) => {
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
      login(email, password);
      setAlert(`Welcome Master ${user && user.name}!`, 'success');
    }
  };

  if (isAuth) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <>
      <Wrapper>
        <h1>
          Log in{' '}
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
          Dont' have a account?{' '}
          <Link to="/register" className="cta-link">
            Register
          </Link>{' '}
        </p>
      </Wrapper>
    </>
  );
};

Login.propTypes = {
  setAlert: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({ auth: state.auth });

export default connect(
  mapStateToProps,
  { setAlert, login }
)(Login);
