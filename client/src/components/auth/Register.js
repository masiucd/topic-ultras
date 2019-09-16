import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { DeveloperBoard } from 'styled-icons/material';
import { Wrapper } from '../styled/Wrapper';
import { Form } from '../styled/Form';
import { BtnPrimary } from '../styled/Button';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const { name, email, password, password2 } = formData;

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (password !== password2) {
      alert('No match');
    } else {
      console.log(formData);
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
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              required
              onChange={e => handleChange(e)}
            />
          </div>

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
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="password2"
              value={password2}
              required
              onChange={e => handleChange(e)}
            />
          </div>
          <BtnPrimary>Register 🏄🏻‍♀️ </BtnPrimary>
        </Form>
        <p>
          Already have a account? <Link to="/login">Sign in</Link>{' '}
        </p>
      </Wrapper>
    </>
  );
};

Register.propTypes = {};

export default Register;
