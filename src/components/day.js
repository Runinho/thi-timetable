import React from 'react';
import Course, {getPositon} from './course';


const times = []
for(let i = 8; i < 22; i++){
  times.push(i);
}

const Day = (props) => {
  console.log('pos',props.date, getPositon(props.date));
  return (
    <div className="timetable">
      <div className="day">
        <p className="number">{props.date && props.date.getDate()}</p>
        <p className="short">{props.date && props.date.toLocaleDateString(window.navigator.userLanguage || window.navigator.language, { weekday: 'short'})}</p>
      </div>
      <div className="hours">
        {
          times.map((time) => <div key={time} className="hour">
                                <div className="number">{time}</div>
                                <div className="line"></div>
                              </div>)
        }
      </div>
      <div className="currentTime" style={{top: getPositon(props.date)}}>
        <div className="line"></div>
        <div className="point"></div>
      </div>
      <div className="courseContainer">
        {props.data && props.data.map((course) => <Course key={course[1]} data={course}></Course>)}
      </div>
    </div>
  );
};

export default Day;