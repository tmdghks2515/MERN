import {all, fork} from 'redux-saga/effects'
import axios from 'axios'

import authSaga from './authSaga'
import dotenv from 'dotenv'
dotenv.config()

axios.defaults.baseURL = process.env.REACT_APP_BASIC_SERVER_URL


export default function* rootSaga() {
    yield all([fork(authSaga)])
}

// function* : 최신문법함수이다, 여러 값을 반환 할 수있는 함수 이다