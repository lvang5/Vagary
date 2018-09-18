import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import addCarReducer from './addCarReducer';
import carReducer from './carReducer';

const store = combineReducers({
  user,
  login,
  addCarReducer,
  carReducer,
});

export default store;
