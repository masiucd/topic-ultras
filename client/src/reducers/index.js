import { combineReducers } from 'redux';
import alert from './alert';
import post from './post';
import auth from './auth';
import profile from './profile';

export default combineReducers({
  alert,
  post,
  auth,
  profile,
});
