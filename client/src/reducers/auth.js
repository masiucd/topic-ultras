import { REGISTER_SUCCESS, REGISTER_FAIL } from '../actions/types';

const initialState = {
  // fetching the token
  // putting it in the state
  token: localStorage.getItem('token'),
  isAuth: null,
  loading: true,
  user: null,
};
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case REGISTER_SUCCESS:
      // setting the token if success and sending it to the state
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuth: true,
        loading: false,
      };

    case REGISTER_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        isAuth: null,
        user: null,
        loading: false,
      };
    default:
      return state;
  }
};
