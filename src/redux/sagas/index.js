import { all, takeEvery, call, put as dispatch } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import axios from '../../../node_modules/axios';


export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    yield takeEvery('POST_DATA', postData),
    yield takeEvery('FETCH_CITY', getCity)
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



function* getCity(action) {
  console.log(action.payload);
  try{ 
    const response = yield call(axios.get, '/api/cars/?city=' + action.payload)
    console.log(response);
    const responseAction = {type: 'SET_CAR', payload: response.data}
    console.log(responseAction)
    yield dispatch(responseAction)
  }catch(err){
    console.log('Error', err);
    
  };

}

