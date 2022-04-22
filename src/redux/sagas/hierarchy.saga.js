import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getHierarchy() {
    console.log('saga getHierarchy func');
    try {
        const response = yield axios.get('/api/hierarchy');
        yield put({type: 'SET_HIERARCHY', payload: response.data});
    } catch (error) {
        console.log('saga getHierarchy error', error);
    }
}

function* addHierarchy(action) {
    console.log('saga addHierarchy action.payload:', action.payload);
    try {
        yield axios.post('/api/hierarchy', action.payload);
        yield put({type: 'GET_HIERARCHY'})
    } catch (error) {
        console.log('saga addHierarchy error:', error);
    }
}

function* deleteHierarchy(action) {
    console.log('saga deleteHierarchy id:', action.payload);
    try {
        yield axios.delete(`/api/hierarchy/${action.payload}`);
        yield put({type: 'GET_HIERARCHY'});
    } catch (error) {
        console.log('saga deleteHierarchy error:', error);
    }
}

function* editHierarchy(action) {
    console.log('saga editHierarchy action.payload:', action.payload);
    try {
        yield axios.put(`/api/hierarchy`, action.payload);
        yield put({type: 'GET_HIERARCHY'});
    } catch (error) {
        console.log('saga editHierarchy error:', error);
    }
}

function* hierarchySaga() {
    yield takeLatest('GET_HIERARCHY', getHierarchy);
    yield takeLatest('ADD_HIERARCHY', addHierarchy);
    yield takeLatest('DELETE_HIERARCHY', deleteHierarchy);
    yield takeLatest('EDIT_HIERARCHY', editHierarchy);
}

  export default hierarchySaga;