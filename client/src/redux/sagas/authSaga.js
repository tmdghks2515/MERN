import axios from 'axios'
import {all, call, put, takeEvery, fork, takeLatest} from 'redux-saga/effects'
import {LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS} from '../types'

// Login
const loginAPI =  (loginData) => {
    console.log(loginData, "loginData")
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    return axios.post('api/auth', loginData, config)
}

function* login(action) {
    try {
        const result = yield call(loginAPI, action.payload)
        console.log(result, "result")
        yield put({
            type: LOGIN_SUCCESS,
            payload: result.data
        })
    } catch (e) {
        console.log(e, "error")
        yield put({
            type: LOGIN_FAILURE,
            payload: e.response
        })
    }
}

function* logout(action) {
    try {
        yield put({
            type: LOGOUT_SUCCESS,
        })
    } catch (e) {
        console.log(e, "error")
        yield put({
            type: LOGOUT_FAILURE,
            payload: e.response
        })
    }
}

function* watchLogin() {
    yield takeLatest(LOGIN_REQUEST, login)
}

function* watchLogout() {
    yield takeLatest(LOGOUT_REQUEST, logout)
}

export default function* authSaga() {
    yield all([
        fork(watchLogin),
        fork(watchLogout)
    ])
};