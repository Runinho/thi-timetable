import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { loginEpic } from '../epics/login';
import { timetableEpic } from '../epics/timetable';
import { dayEpic } from '../epics/day';
import loginReducer from '../reducers/login';
import timetableReducer from '../reducers/timetable';
import dayReducer from '../reducers/day';

const epicMiddleware = createEpicMiddleware(combineEpics(timetableEpic, loginEpic, dayEpic));

const store = createStore(
  combineReducers({login: loginReducer, data: timetableReducer, day: dayReducer}),
  applyMiddleware(epicMiddleware)
);
store.dispatch({type: 'INIT'});

export default store