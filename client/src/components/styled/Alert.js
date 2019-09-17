import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { cl } from './GlobalStyle';

const Alert = ({ alert }) => {
  let a;
  return (
    <>
      {alert !== null &&
        alert.length > 0 &&
        alert.map(a => (
          <AlertWrapper className={`alert alert-${a.type}`} key={a.id}>
            <h3>{a.msg}</h3>
          </AlertWrapper>
        ))}
    </>
  );
};

Alert.propTypes = {
  alert: PropTypes.array.isRequired,
};

const AlertWrapper = styled.div`
  padding: 2rem;
  width: 80%;
  display: flex;
  align-items: center;
  margin: 1rem auto;
  height: 5rem;
  font-size: 2.1rem;
  font-weight: 700;
  color: ${cl.white};
  text-align: center;
  box-shadow: 1px 1px 2px 2px #ccc;
  position: relative;
  border: 2px solid transparent;
  -moz-border-image: -moz-linear-gradient(top, #2196f3 0%, #4c5b5c 100%);
  -webkit-border-image: -webkit-linear-gradient(top, #2196f3 0%, #4c5b5c 100%);
  border-image: linear-gradient(to bottom, #2196f3 0%, #4c5b5c 100%);
  border-image-slice: 1;
  h3 {
    padding: 0.6rem;
  }
`;
const mapStateToProps = state => ({ alert: state.alert });
export default connect(mapStateToProps)(Alert);
