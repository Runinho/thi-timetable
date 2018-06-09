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
    },[]);
  console.log(uniqDay);
  return uniqDay;
}

export default (state={days: {}, currentDay: new Date(2018,5,12,12,20,5)}, action) => {
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
      const day = getEventsForDay(action.payload.events, state.currentDay);
      const days = {};
      days[currentDay2.toString()] = day;
      return {...state, days: days};
    default: 
      return state
  }
  return state;
}