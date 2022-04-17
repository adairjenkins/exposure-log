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

function* hierarchySaga() {
    yield takeLatest('GET_HIERARCHY', getHierarchy);
}

  export default hierarchySaga;