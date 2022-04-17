import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getExposure() {
    console.log('saga getExposure func');
    try {
        const response = yield axios.get('/api/exposure');
        yield put({type: 'SET_EXPOSURE', payload: response.data});
    } catch (error) {
        console.log('saga getExposure error', error);
    }
}

function* exposureSaga() {
    yield takeLatest('GET_EXPOSURE', getExposure);
}

export default exposureSaga;