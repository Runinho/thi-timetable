import { getOtherDay, getTimeFromString } from "../helper/date";
import { getPortPromise } from "portfinder";
console.log('otherday',getOtherDay);
/**
 * Wherever the both events take place to the same time.
 * 
 * @param {event} a 
 * @param {event} b 
 */
export function isOverlapping(a, b){
  const b_von = getTimeFromString(b.von);
  const b_bis = getTimeFromString(b.bis);
  const a_von = getTimeFromString(a.von);
  const a_bis = getTimeFromString(a.bis);
  return (a_bis > b_von && a_von < b_bis) || (a_von > b_von && a_bis < b_bis) || (b_von > a_von && b_bis < a_bis);
}

function formatDate(date) {
  let d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  let year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

function getEventsForDay(data, dateTime) {
  const date = formatDate(dateTime);
  console.log('formated data',date);
  const day = data.filter((d) => d.datum === date);
  console.log('filter:', day);
  day.sort((a, b) => (getTimeFromString(a.von) - getTimeFromString(b.von)));
  // calculate overlapping
  const dayWithOverlapping = day.map((event, index_a) => {
    // find overlapping
    const overlapping = day.reduce((acc, current, index_b) => {
      if (index_a !== index_b && isOverlapping(event, current)){
        if(index_b > index_a){
          acc.after += 1;
        } else {
          acc.before += 1;
        }
      }
      return acc;
    }, {before: 0, after:0})
    event.overlapping = overlapping;
    return event;
  })
  console.log(dayWithOverlapping);
  return dayWithOverlapping;
}

export default (state={days: {}, currentDay: new Date(), viewDate: new Date().setHours(0,0,0,0)}, action) => {
  let days = state.days;
  switch(action.type){
    case 'INIT':
      break;
    case 'TIMETABLE_DATA_LOADED':
      days = {}
      // Do the same as date changed:
    case 'VIEW_DATE_CHANGED':
      console.log('action.payload:', action.payload);
      const currentViewDay = state.viewDate;
      const dayBefore = getOtherDay(currentViewDay, -1);
      const dayAfter = getOtherDay(currentViewDay, 1);
      console.log(currentViewDay, dayBefore, dayAfter);
      for(let date of [currentViewDay, dayBefore, dayAfter]){
        if(days[(+date).toString()] == null){
          days[(+date).toString()] = getEventsForDay(action.payload.data.data[3], date);
        }
      }
      return {...state, days: days};
      break;
    case 'CURRENT_DATE_CHANGED':
      return {...state, currentDay: new Date()};
      break;
    case 'CHANGE_VIEW_DATE':
      return {...state, viewDate: action.payload};
    default: 
      return state
  }
  return state;
}