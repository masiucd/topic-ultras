import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Youtube, Twitter, Linkedin } from 'styled-icons/fa-brands';
import { Facebook } from 'styled-icons/feather';
import { Instagram } from 'styled-icons/boxicons-logos';
import { Linkedin2 } from 'styled-icons/icomoon';
import { cl } from '../styled/GlobalStyle';

const ProfileTop = ({ profile }) => {
  const { social, user, location, status } = profile[0];

  return (
    <ProfileIntro>
      <div className="img">
        <img src={user.avatar} alt={user.name} />
        <h1>{user.name}</h1>
        <p>{status && <span> {status}</span>}</p>
        <p>{location && <span> {location}</span>}</p>
      </div>
      <div className="body">
        <div className="social">
          {social && social.youtube && (
            <a href={social.youtube} target="_blank" rel="noopener noreferrer">
              <Youtube size="30" />
            </a>
          )}
          {social && social.facebook && (
            <a href={social.facebook} target="_blank" rel="noopener noreferrer">
              <Facebook size="30" />
            </a>
          )}
          {social && social.twitter && (
            <a href={social.twitter} target="_blank" rel="noopener noreferrer">
              <Twitter size="30" />
            </a>
          )}

          {social && social.linkedin && (
            <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
              <Linkedin2 size="30" />
            </a>
          )}
          {social && social.instagram && (
            <a
              href={social.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram size="30" />
            </a>
          )}
        </div>
      </div>
    </ProfileIntro>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.array.isRequired,
};
const ProfileIntro = styled.div`
  padding: 2rem 1.5rem;
  background: ${cl.primary};
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-self: center;
  width: 100%;
  margin: 1.5rem 0;
  color: ${cl.white};
  .img {
    margin: 0 auto;
    width: 100%;
    text-align: center;

    img {
      border-radius: 50%;
    }
    h1 {
      text-transform: capitalize;
      margin: 1rem 0;
      text-align: center;
    }
  }
  .body {
    display: flex;
    justify-content: center;
    flex-direction: column;
    .social {
      padding: 2rem 0;
      display: flex;
      justify-content: space-around;
      width: 100%;

      a {
        color: ${cl.white};
        border: none;
        transition: 300ms ease-in-out;
      }
    }
  }
`;
export default ProfileTop;
