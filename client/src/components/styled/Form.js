import styled from 'styled-components';
import media from 'styled-media-query';
import { cl } from './GlobalStyle';

export const Form = styled.form`
  padding: 5rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  margin: 2rem 0;
  border: 2px solid ${cl.dark};
  min-width: 54%;
  text-align: center;
  height: 100%;
  input {
    padding: 0.6rem 0.85rem;
    border: 2px solid ${cl.dark};
    margin: 1rem 0;
    transition: all 300ms ease-in-out;
    width: 60%;
    box-shadow: 2px 1px 2px 2px rgba(0, 0, 0, 0.4);
    font-size: 1.5rem;
    &:focus {
      transform: scale(1.03);
      border: 2px solid ${cl.primary};
    }
  }
  button {
    width: 60%;
    margin: 2rem auto;
    &:hover {
      transform: scale(1.03);
    }
  }

  ${media.greaterThan('small')``};
`;

export const ProfileForm = styled(Form)`
  min-width: 100%;
  margin-right: auto;
  .form-group {
    padding: 1rem 0;
  }
  .form-text,
  small {
    display: block;
    font-size: 1.5rem;
    font-weight: 500;
    margin: 0.5rem;
  }
  input {
    width: 80%;
  }

  #toggle-social {
    max-width: 40%;
  }
  .social-area {
    display: flex;

    #social-icon {
      margin-left: 2rem;
    }
    .form-group-social {
      display: flex;
      align-items: center;
      width: 100%;
      margin: 1rem 0;
      input {
        width: 80%;
        margin: 0 auto;
      }
    }
  }
  textarea {
    border: 2px solid ${cl.dark};
    width: 70%;
    height: 90%;
    font-size: 1.7rem;
  }
  .form-group-select {
    /* border: 2px solid red; */

    select {
      display: block;
      font-size: 16px;
      font-family: sans-serif;
      font-weight: 700;
      color: #444;
      line-height: 1.3;
      padding: 0.6em 1em 0.2em 0.8em;
      width: 60%;
      max-width: 100%;
      box-sizing: border-box;
      margin: 0 auto;
      border: 1px solid #aaa;
      box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.04);
      border-radius: 0.5em;
      -moz-appearance: none;
      -webkit-appearance: none;
      appearance: none;
      background-color: ${cl.white};
      background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'),
        linear-gradient(to bottom, #ccc 1%, ${cl.white} 100%);
      background-repeat: no-repeat, repeat;
      background-position: right 0.7em top 50%, 0 0;
      background-size: 0.65em auto, 100%;
    }
  }
`;
