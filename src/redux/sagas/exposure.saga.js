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

function* deleteExposure(action) {
    console.log('saga deleteExposure action.payload:', action.payload);
    try {
        yield axios.delete(`/api/exposure/${action.payload}`)
        yield put({type: 'GET_EXPOSURE'})
    } catch (error) {
        console.log('saga deleteExposure error:', error);
    }
}

function* editExposure(action) {
    console.log('saga editExposure action.payload:', action.payload);
    try {
        yield axios.put(`/api/exposure`, action.payload);
        yield put({type: 'GET_EXPOSURE'});
    } catch (error) {
        console.log('saga editExposure error:', error);
    }
}

function* exposureSaga() {
    yield takeLatest('GET_EXPOSURE', getExposure);
    yield takeLatest('ADD_EXPOSURE', addExposure);
    yield takeLatest('DELETE_EXPOSURE', deleteExposure);
    yield takeLatest('EDIT_EXPOSURE', editExposure);
}

export default exposureSaga;