import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { cl } from '../styled/GlobalStyle';

const ProfileItem = ({ profile }) => {
  const {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills,
  } = profile;
  return (
    <ProfileItemStyled>
      <div className="img">
        <img src={avatar} alt={name} />
      </div>
      <div className="main">
        <h3>{name}</h3>
        <p>
          {status} {company && <span>at {company}</span>}
        </p>

        <p>{location && <span>{location}</span>}</p>
        <Link className="cta-link" to={`/profile/${_id}`}>
          View Profile
        </Link>
      </div>
      <ul className="skills">
        {skills.slice(0, 4).map((skill, i) => (
          <li key={i}>{skill}</li>
        ))}
      </ul>
    </ProfileItemStyled>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

const ProfileItemStyled = styled.div`
  padding: 2rem 1rem;
  background: rgba(0, 0, 0, 0.8);
  display: grid;
  grid-gap: 10px;
  min-height: 26rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-template-rows: auto;
  margin: 1rem 0;
  box-shadow: 1px 1px 1px 2px #ccc;
  color: ${cl.white};
  .img {
    justify-self: center;
    img {
      border-radius: 50%;
    }
  }
  .main {
    justify-self: center;
    width: 80%;
    display: flex;
    flex-direction: column;

    h3,
    p,
    a {
      margin: 1rem 0.5rem;
    }
    h3 {
      font-size: 1.8rem;
      border-bottom: 2px solid ${cl.white};
      width: 50%;
    }
    p {
      font-size: 1.6rem;
    }
    a {
      width: 40%;
      color: ${cl.white};
      font-size: 1.2rem;
      background: ${cl.primary};
      padding: 0.5rem 0.8rem;
    }
  }
  .skills {
    display: flex;
    align-items: center;
    li {
      font-size: 2rem;
      margin: 1rem 0.5rem;
      border-bottom: 1px solid ${cl.primary};
      padding: 0.4rem 0.65rem;
    }
  }
`;
export default ProfileItem;
