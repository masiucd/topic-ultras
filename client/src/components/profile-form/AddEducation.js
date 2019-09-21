/* eslint-disable no-shadow */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { StyledExp } from './AddExperience';
import { addEducation } from '../../actions/profile';
import useToggle from '../../hooks/useToggle';
import { BtnPrimary } from '../styled/Button';
import { ProfileForm } from '../styled/Form';

const AddEducation = ({ history, addEducation, auth: { user } }) => {
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    to: '',
    current: false,
    description: '',
  });
  const [date, toggle] = useToggle();

  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  } = formData;

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <StyledExp>
      <h1>
        Add your Education master <strong>{user && user.name}</strong>{' '}
      </h1>
      <p>
        Add any developer/programming positions that you have had in the past
      </p>
      <small>* = required field</small>
      <ProfileForm
        className="form"
        onSubmit={e => {
          e.preventDefault();
          addEducation(formData, history);
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
                toggle();
              }}
            />{' '}
            Current School
          </label>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* school"
            name="school"
            value={school}
            onChange={e => handleChange(e)}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="* Degree certificate"
            name="degree"
            value={degree}
            onChange={e => handleChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Field of Study"
            name="fieldofstudy"
            value={fieldofstudy}
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
            placeholder="Program Description"
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

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({ auth: state.auth });

export default connect(
  mapStateToProps,
  { addEducation }
)(withRouter(AddEducation));
