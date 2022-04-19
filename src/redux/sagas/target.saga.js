import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getTarget() {
    console.log('saga getTarget func');
    try {
        const response = yield axios.get('/api/target');
        yield put({type: 'SET_TARGET', payload: response.data});
    } catch (error) {
        console.log('saga getTarget error', error);
    }
}

function* addTarget(action) {
    console.log('saga addTarget action.payload:', action.payload)
    try {
        yield axios.post('/api/target', action.payload);
        yield put({type: 'GET_TARGET'})
    } catch (error) {
        console.log('saga addTarget error:', error);
    }
}

function* targetSaga() {
    yield takeLatest('GET_TARGET', getTarget);
    yield takeLatest('ADD_TARGET', addTarget);
}

export default targetSaga;