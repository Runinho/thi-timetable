// enum for states
export const STATUS_STATES = Object.freeze({
  INIT: Symbol("INIT"),
  NODATA:   Symbol("NODATA"),
  DATA: Symbol("DATA"),
  INVALID_SESSION: Symbol("INVALID_SESSION"),
  VALID_SESSION: Symbol("VALID_SESSION"),
  LOADING_DATA: Symbol("LOADING_DATA"),
  LOGIN: Symbol("LOGIN"),
  NOACTION: Symbol("NOACTION"),
});

export default (state={actionState: STATUS_STATES.INIT, dataState: STATUS_STATES.NODATA, sessionState: STATUS_STATES.INIT, extra: null}, action) => {
  switch(action.type){
    case 'SESSION_INVALID': 
      return {...state, sessionState: STATUS_STATES.INVALID_SESSION, actionState: STATUS_STATES.NOACTION};
    case 'SESSION_VALID': 
      return {...state, sessionState: STATUS_STATES.VALID_SESSION, actionState: STATUS_STATES.NOACTION};
    case 'TIMETABLE_DATA_LOADED': 
      return {...state, dataState: STATUS_STATES.DATA}
    case 'LOGIN_PRESSED':
      return {...state, actionState: STATUS_STATES.LOGIN}
    case 'LOAD_TIMETABLE_DATA':
      return {...state, actionState: STATUS_STATES.LOADING_DATA}
  }
  return state;
}