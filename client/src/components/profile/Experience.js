import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import Moment from 'react-moment';
import { cl } from '../styled/GlobalStyle';

const Experience = ({ profile }) => {
  const { experience } = profile[0];
  const {
    company,
    current,
    description,
    from,
    location,
    title,
    to,
  } = experience[0];

  return (
    <StyledExperience>
      <h2>Dev Experience</h2>
      <h3>{company}</h3>
      <p>
        <Moment format="YYYY/MM/DD">{from}</Moment>-
        {!to ? ' Now' : <Moment format="YYYY/MM/DD">{to}</Moment>}
      </p>
      <p>
        <strong>Position</strong> {title}
      </p>
      <p>
        <strong>Description:</strong> {description}
      </p>
    </StyledExperience>
  );
};

Experience.propTypes = {
  profile: PropTypes.object.isRequired,
};
const StyledExperience = styled.div`
  padding: 1rem 2rem;
  h2,
  h3,
  p {
    margin: 0.6rem 0;
  }
  h2 {
    font-size: 3rem;
    color: ${cl.primary};
  }
  h3 {
    font-size: 2rem;
  }
`;
export default Experience;
