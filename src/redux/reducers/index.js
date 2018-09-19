import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import addCarReducer from './addCarReducer';
import carReducer from './carReducer';
import locationReducer from './locationReducer';

const store = combineReducers({
  user,
  login,
  addCarReducer,
  carReducer,
  locationReducer,
});

export default store;
