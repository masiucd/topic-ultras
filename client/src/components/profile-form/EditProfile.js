/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {
  Twitter,
  Youtube,
  Facebook,
  Instagram,
  Linkedin,
} from 'styled-icons/fa-brands';
import { Link, withRouter } from 'react-router-dom';
import { Wrapper } from '../styled/Wrapper';
import { Container } from '../styled/Grid';
import { ProfileForm } from '../styled/Form';
import { BtnPrimary } from '../styled/Button';
import useToggle from '../../hooks/useToggle';
import {
  createOrUpdateProfile,
  getCurrentProfile,
} from '../../actions/profile';

const EditProfile = ({
  auth,
  createOrUpdateProfile,
  history,
  getCurrentProfile,
  profile: { profile, loading },
}) => {
  const { user } = auth;
  const [on, toggle] = useToggle();
  const [formData, setFormData] = useState({
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: '',
  });

  useEffect(() => {
    getCurrentProfile();
    setFormData({
      company: loading || !profile.company ? '' : profile.company,
      website: loading || !profile.website ? '' : profile.website,
      location: loading || !profile.location ? '' : profile.location,
      status: loading || !profile.status ? '' : profile.status,
      skills: loading || !profile.skills ? '' : profile.skills.join(','),
      githubusername:
        loading || !profile.githubusername ? '' : profile.githubusername,
      bio: loading || !profile.bio ? '' : profile.bio,
      twitter: loading || !profile.social ? '' : profile.social.twitter,
      facebook: loading || !profile.social ? '' : profile.social.facebook,
      linkedin: loading || !profile.social ? '' : profile.social.linkedin,
      youtube: loading || !profile.social ? '' : profile.social.youtube,
      instagram: loading || !profile.social ? '' : profile.social.instagram,
    });
  }, [loading]);
  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData;
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = e => {
    e.preventDefault();
    createOrUpdateProfile(formData, history, true);
  };
  return (
    <CreateProfileWrapper>
      <Container>
        <h1>Edit Profile</h1>
        <Wrapper>
          <ProfileForm onSubmit={handleSubmit}>
            <p>
              Let's update your profile for you{' '}
              <strong>Master {user && user.name}</strong>
            </p>
            <div className="form-group form-group-select">
              <select
                name="status"
                value={status}
                onChange={e => handleChange(e)}
              >
                <option value="0">* Select Professional Status</option>
                <option value="Developer">Developer</option>
                <option value="Junior Developer">Junior Developer</option>
                <option value="Senior Developer">Senior Developer</option>
                <option value="Manager">Manager</option>
                <option value="Student or Learning">Student or Learning</option>
                <option value="Instructor">Instructor or Teacher</option>
                <option value="Intern">Intern</option>
                <option value="Other">Other</option>
              </select>
              <small className="form-text">
                Give us an idea of where you are at in your career
              </small>
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Company"
                name="company"
                value={company}
                onChange={e => handleChange(e)}
              />
              <small className="form-text">
                Could be your own company or one you work for
              </small>
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Website"
                name="website"
                value={website}
                onChange={e => handleChange(e)}
              />
              <small className="form-text">
                Could be your own or a company website
              </small>
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Location"
                name="location"
                value={location}
                onChange={e => handleChange(e)}
              />
              <small className="form-text">
                City & state suggested (eg. Boston, MA)
              </small>
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="* Skills"
                name="skills"
                value={skills}
                onChange={e => handleChange(e)}
              />
              <small className="form-text">
                Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
              </small>
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Github Username"
                name="githubusername"
                value={githubusername}
                onChange={e => handleChange(e)}
              />
              <small className="form-text">
                If you want your latest repos and a Github link, include your
                username
              </small>
            </div>
            <div className="form-group">
              <textarea
                placeholder="A short bio of yourself"
                name="bio"
                value={bio}
                onChange={e => handleChange(e)}
              />
              <small className="form-text">
                Tell us a little about yourself
              </small>
            </div>

            <BtnPrimary id="toggle-social" onClick={toggle} type="button">
              Add Social Network Links {on ? '⬆️' : '⬇️'}
            </BtnPrimary>
            <small>Optional</small>
            {on ? (
              <>
                <div className="social-area">
                  <div className="form-group form-group-social">
                    <Twitter size="25" id="social-icon" />
                    <input
                      type="text"
                      placeholder="Twitter URL"
                      name="twitter"
                      value={twitter}
                      onChange={e => handleChange(e)}
                    />
                  </div>
                </div>
                <div className="social-area">
                  <div className="form-group form-group-social">
                    <Instagram size="25" id="social-icon" />
                    <input
                      type="text"
                      placeholder="Instagram URL"
                      name="instagram"
                      value={instagram}
                      onChange={e => handleChange(e)}
                    />
                  </div>
                </div>
                <div className="social-area">
                  <div className="form-group form-group-social">
                    <Facebook size="25" id="social-icon" />
                    <input
                      type="text"
                      placeholder="Facebook URL"
                      name="facebook"
                      value={facebook}
                      onChange={e => handleChange(e)}
                    />
                  </div>
                </div>
                <div className="social-area">
                  <div className="form-group form-group-social">
                    <Linkedin size="25" id="social-icon" />
                    <input
                      type="text"
                      placeholder="Linkedin URL"
                      name="linkedin"
                      value={linkedin}
                      onChange={e => handleChange(e)}
                    />
                  </div>
                </div>
                <div className="social-area">
                  <div className="form-group form-group-social">
                    <Youtube size="25" id="social-icon" />
                    <input
                      type="text"
                      placeholder="Youtube URL"
                      name="youtube"
                      value={youtube}
                      onChange={e => handleChange(e)}
                    />
                  </div>
                </div>
              </>
            ) : null}
            <BtnPrimary type="submit">Submit</BtnPrimary>
            <Link className="go-back-link" to="/dashboard">
              Go Back
            </Link>
          </ProfileForm>
        </Wrapper>
      </Container>
    </CreateProfileWrapper>
  );
};

EditProfile.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  createOrUpdateProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({ auth: state.auth, profile: state.profile });

const CreateProfileWrapper = styled.div`
  margin: 1rem;
  h1 {
    text-align: center;
  }
`;

export default connect(
  mapStateToProps,
  { createOrUpdateProfile, getCurrentProfile }
)(withRouter(EditProfile));
