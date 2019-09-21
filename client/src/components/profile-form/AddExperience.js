import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { addExperience } from '../../actions/profile';
import useToggle from '../../hooks/useToggle';
import { BtnPrimary } from '../styled/Button';
import { ProfileForm } from '../styled/Form';

const AddExperience = ({ history, addExperience }) => {
  const [formData, setFormData] = useState({
    company: '',
    title: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: '',
  });
  const [date, toggleDate] = useToggle();

  const { company, title, location, from, to, current, description } = formData;

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <StyledExp>
      <h1 className="large text-primary">Add An Experience</h1>
      <p className="lead">
        <i className="fas fa-code-branch" /> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <ProfileForm
        className="form"
        onSubmit={e => {
          e.preventDefault();
          addExperience(formData, history);
        }}
      >
        <div className="form-group current-job">
          <label>
            <input
              type="checkbox"
              name="current"
              checked={current}
              value={current}
              onChange={() => {
                setFormData({ ...formData, current: !current });
                toggleDate();
              }}
            />{' '}
            Current job
          </label>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Job Title"
            name="title"
            value={title}
            onChange={e => handleChange(e)}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="* Company"
            name="company"
            value={company}
            onChange={e => handleChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={e => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input
            type="date"
            name="from"
            value={from}
            onChange={e => handleChange(e)}
          />
        </div>

        <div className="form-group">
          <h4>To Date</h4>
          <input
            type="date"
            name="to"
            value={to}
            onChange={e => handleChange(e)}
            disabled={date ? 'disabled' : ''}
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
            value={description}
            onChange={e => handleChange(e)}
          />
        </div>
        <BtnPrimary type="submit">Submit</BtnPrimary>
        <Link className="go-back-link" to="/dashboard">
          Go Back
        </Link>
      </ProfileForm>
    </StyledExp>
  );
};

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
};

const StyledExp = styled.div`
  padding: 2rem;
`;
export default connect(
  null,
  { addExperience }
)(withRouter(AddExperience));
