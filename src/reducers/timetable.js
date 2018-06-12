function loadDataFromLocalStorage() {
  try{
    const obj = JSON.parse(localStorage.getItem('data'));
    return (obj.data.dozenten || obj.data.data === "Session is over" ? null : obj);
  } catch (e){
    localStorage.setItem('data', null);
    console.log(e);
  }
  return null;
}

export default (state={data: loadDataFromLocalStorage()}, action) => {
  switch(action.type){
    case 'INIT':
      break;
    case 'TIMETABLE_DATA_LOADED':
      console.log('LOADED!');
      const data = action.payload;
      localStorage.setItem('data', JSON.stringify(data));
      return {...state, data: data};
    default: 
      return state
  }
  return state;
}