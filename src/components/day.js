import React from 'react';
import Course, {getPositon} from './course';


const times = []
for(let i = 8; i < 22; i++){
  times.push(i);
}

function sameDay(d1, d2) {
  return d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();
}

const Day = (props) => {
  let currentTime = null;
  if(sameDay(new Date(props.currentDay), new Date(props.date))){
    currentTime  = <div className="currentTime" style={{top:0, transform: 'translate(0px,' + getPositon(new Date(props.currentDay).getHours() * 60  + new Date(props.currentDay).getMinutes()) + 'px)' }}>
                      <div className="line"></div>
                      <div className="point"></div>
                    </div>
  }

  return (
    <div className="timetable">
      <div className="day">
        <p className="number">{props.date && new Date(props.date).getDate()}</p>
        <p className="short">{props.date && new Date(props.date).toLocaleDateString(window.navigator.userLanguage || window.navigator.language, { weekday: 'short'})}</p>
      </div>
      <div className="hours">
        {
          times.map((time) => <div key={time} className="hour">
                                <div className="number">{time}</div>
                                <div className="line"></div>
                              </div>)
        }
      </div>
      {currentTime}
      <div className="courseContainer">
        {props.data && props.data.map((course) => <Course key={[course.veranstaltung,course.von,course.bis].join('.')} data={course}></Course>)}
      </div>
    </div>
  );
};

export default Day;