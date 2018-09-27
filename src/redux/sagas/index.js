import { all, takeEvery, call, put as dispatch } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import axios from '../../../node_modules/axios';


export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    yield takeEvery('POST_DATA', postData)
    // watchIncrementAsync()
  ]);
}


function* postData(action) {
  console.log(action.payload);
  try{ 
    yield call(axios.post, '/api/cars', action.payload)
  }catch(err){
    console.log('Error', err);
    
  };

}