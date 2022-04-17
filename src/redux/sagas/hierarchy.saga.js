import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getHierarchy() {
    console.log('saga getHierarchy func');

}

function* hierarchySaga() {
    yield takeLatest('GET_HIERARCHY', getHierarchy);
}

  export default hierarchySaga;