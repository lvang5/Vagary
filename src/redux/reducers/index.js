import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import addCarReducer from './addCarReducer';
import carReducer from './carReducer';
import locationReducer from './locationReducer';
import tripReducer from './tripReducer';

const store = combineReducers({
  user,
  login,
  addCarReducer,
  carReducer,
  locationReducer,
  tripReducer,
});

export default store;
