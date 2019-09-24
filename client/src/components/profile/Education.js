import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import Moment from 'react-moment';
import { cl } from '../styled/GlobalStyle';

const Education = ({ profile }) => {
  const { education } = profile[0];
  const { school, degree, fieldofstudy, current, to, from } = education[0];

  return (
    <StyledEducation>
      <h2>Dev Education</h2>
      <h3>{school}</h3>
      <p>
        <Moment format="YYYY/MM/DD">{from}</Moment>-
        {!to ? ' Now' : <Moment format="YYYY/MM/DD">{to}</Moment>}
      </p>
      <p>
        <strong>Filed of study:</strong> {fieldofstudy}
      </p>
      <p>
        <strong>Degree:</strong> {degree}
      </p>
    </StyledEducation>
  );
};

Education.propTypes = {
  profile: PropTypes.object.isRequired,
};
const StyledEducation = styled.div`
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
export default Education;
