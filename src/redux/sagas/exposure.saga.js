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

function* addExposure(action) {
    console.log('saga addExposure action.payload:', action.payload);
    try {
        yield axios.post('/api/exposure', action.payload);
        yield put({type: 'GET_EXPOSURE'});
    } catch (error) {
        console.log('saga addExposure error:', error);
    }
}

function* exposureSaga() {
    yield takeLatest('GET_EXPOSURE', getExposure);
    yield takeLatest('ADD_EXPOSURE', addExposure);
}

export default exposureSaga;