/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import moment from 'moment';

import { Table } from './Experience';
import { deleteEducation } from '../../actions/profile';

const Education = ({ education, deleteEducation }) => {
  if (education.length === 0) {
    return <div></div>;
  }
  const exps = education.map(edu => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td>{edu.degree}</td>
      <td>
        <Moment format="YYYY/MM/DD">{moment.utc(edu.from)}</Moment> -{' '}
        {edu.to === null ? (
          ' Now'
        ) : (
          <Moment format="YYYY/MM/DD">{moment.utc(edu.to)}</Moment>
        )}
      </td>
      <td>
        <span onClick={() => deleteEducation(edu._id)}>Delete</span>
      </td>
    </tr>
  ));
  return (
    <>
      <h2 className="my-2">Education Credentials</h2>{' '}
      <Table>
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
          </tr>
        </thead>
        <tbody>{exps}</tbody>
      </Table>
    </>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired,
};

export default connect(
  null,
  { deleteEducation }
)(Education);
