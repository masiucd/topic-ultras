import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import moment from 'moment';
import styled from 'styled-components';
import media from 'styled-media-query';
import { cl } from '../styled/GlobalStyle';
import { BtnPrimary } from '../styled/Button';
import { Table } from './Experience';

const Education = ({ education }) => {
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
        <BtnPrimary>Delete</BtnPrimary>
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

Education.propTypes = {};

export default Education;
