import axios from 'axios';

export default token => {
  // if token is set in localstorage
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    // delete token if not set
    delete axios.defaults.headers.common['x-auth-token'];
  }
};
