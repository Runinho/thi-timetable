/**
 * Wherever the both events take place to the same time.
 * 
 * @param {event} a 
 * @param {event} b 
 */
export function isOverlapping(a, b){
  return (a[3] > b[2] && a[2] < b[3]) || (a[2] > b[2] && a[3] < b[3]) || (b[2] > a[2] && b[3] < a[3]);
}

function getEventsForDay(events, dateTime) {
  const currentDay = new Date(dateTime).setHours(0,0,0,0);
  const currentDayEnd = new Date(currentDay).setHours(24,0,0,0);
  
  console.log(new Date(currentDay).toDateString(), new Date(currentDayEnd).toDateString());
  const day = events.filter((event) => {
    return (new Date(event[2]) > currentDay && new Date(event[3]) < currentDayEnd)
  })
  // filter for identical string.
  // TODO: why is the data duplicated in the first place?
  const uniqDay = day.reduce((a,b) => {
    if(a.findIndex((c) => c[1] == b[1])<0){
        a.push(b)
      }
      return a;
    },[])
  uniqDay.sort((b, a) => (new Date(a[3]) - new Date(a[2])) - (new Date(b[3]) - new Date(b[2])));
  console.log('unsort:', uniqDay);
  // calculate overlapping
  const uniqDayWithOverlapping = uniqDay.map((event, index_a) => {
    // find overlapping
    const overlapping = uniqDay.reduce((acc, current, index_b) => {
      if (index_a !== index_b && isOverlapping(event, current)){
        if(index_b > index_a){
          acc.after += 1;
        } else {
          acc.before += 1;
        }
      }
      return acc;
    }, {before: 0, after:0})
    event[23] = overlapping;
    return event;
  })
  console.log(uniqDayWithOverlapping);
  return uniqDayWithOverlapping;
}

export default (state={days: {}, currentDay: new Date(2018,5,11,12,20,5)}, action) => {
  switch(action.type){
    case 'INIT':
      break;
    case 'DATE_CHANGED':
      const currentDay = new Date(state.currentDay).setHours(0,0,0,0);
      if(days[currentDay.toString()] == null){
        const day = getEventsForDay(action.payload.events, state.currentDay);
        state.days[currentDay.toString()] = day;
      }
      return {...state, days: days};
      break;
    case 'TIMETABLE_DATA_LOADED':
      const currentDay2 = new Date(state.currentDay).setHours(0,0,0,0);
      const day = getEventsForDay(action.payload.data.events, state.currentDay);
      const days = {};
      days[currentDay2.toString()] = day;
      return {...state, days: days};
    default: 
      return state
  }
  return state;
}