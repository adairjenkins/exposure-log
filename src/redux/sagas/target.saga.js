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

function* targetSaga() {
    yield takeLatest('GET_TARGET', getTarget);
}

export default targetSaga;