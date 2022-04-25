import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getGoal() {
    console.log('saga getGoal func');
    try {
        const response = yield axios.get('/api/goal');
        yield put({type: 'SET_GOAL', payload: response.data[0]});
    } catch (error) {
        console.log('saga getGoal error:', error);
    }
}

function* editGoal(action) {
    console.log('saga editGoal action.payload', action.payload);
    try {
        yield axios.put('/api/goal', action.payload);
        yield put({type: 'GET_GOAL'});
    } catch (error) {
        console.log('saga editGoal error:', error);
    }
}

function* getCount() {
    console.log('saga getCount');
    try {
        const weeklyData = yield axios.get('/api/exposure/weekly-count');
        const dailyData = yield axios.get('/api/exposure/daily-count');
        const count = { weekly: weeklyData.data, daily: dailyData.data }
        yield put ({type: 'SET_COUNT', payload: count})
    } catch (error) {
        console.log('saga getCount error', error);
    }
}

function* goalSaga() {
    yield takeLatest('GET_GOAL', getGoal);
    yield takeLatest('EDIT_GOAL', editGoal);
    yield takeLatest('GET_COUNT', getCount);
}

export default goalSaga;