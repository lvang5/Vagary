import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import locationReducer from './locationReducer';
import carReducer from './carReducer';

const store = combineReducers({
  user,
  login,
  locationReducer,
  carReducer,
});

export default store;
