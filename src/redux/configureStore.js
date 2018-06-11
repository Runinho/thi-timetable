import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { loginEpic } from '../epics/login';
import { timetableEpic } from '../epics/timetable';
import { dayEpic } from '../epics/day';
import { statusEpic } from './../epics/status';
import loginReducer from '../reducers/login';
import timetableReducer from '../reducers/timetable';
import dayReducer from '../reducers/day';
import statusReducer from '../reducers/status';

const epicMiddleware = createEpicMiddleware(combineEpics(timetableEpic, loginEpic, dayEpic, statusEpic));

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore( combineReducers({login: loginReducer, data: timetableReducer, day: dayReducer, status: statusReducer}),
 /* preloadedState, */ 
 composeEnhancers(
  applyMiddleware(epicMiddleware),
));
store.dispatch({type: 'INIT'});

setInterval(function() {
  store.dispatch({type: 'CURRENT_DATE_CHANGED'});
}, 60000); // every minute

export default store