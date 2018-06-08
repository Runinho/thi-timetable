import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { loginEpic } from '../epics/login';
import { timetableEpic } from '../epics/timetable';
import loginReducer from '../reducers/login';
import timetableReducer from '../reducers/timetable';

const epicMiddleware = createEpicMiddleware(combineEpics(timetableEpic, loginEpic));

const store = createStore(
  combineReducers({login: loginReducer, data: timetableReducer}),
  applyMiddleware(epicMiddleware)
);
store.dispatch({type: 'INIT'});

export default store