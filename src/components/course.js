import React from 'react';

// need to be the same in the scss file.
const timeOffset = 75;
const hourheight = 60;

export function getPositon(time){
  const dateTime = new Date(time)
  const minutesIntoDay = dateTime.getHours() * 60 + dateTime.getMinutes();
  const dayOffset = 8 * 60;
  const positon = (minutesIntoDay - dayOffset) * (60/hourheight);
  return positon;
}

function getStyle(startTime, endTime, overlapping){
  const start = getPositon(startTime);
  const end = getPositon(endTime);
  // TODO: Fix to work with more than 1 overlapping course
  const width = 100 / (Math.min((overlapping.before + overlapping.after), 1) + 1)
  return {
    height: end - start,
    top: start,
    width: 'calc(' + width + '% - 16px)',
    left: (width * overlapping.before) + '%',
  }
}

const Course = (props) => {
  return (
    <div className={"course " + (props.data[20].status ? 'canceled' : '') }  style={getStyle(props.data[2], props.data[3], props.data[23])}>
      <div className="firstLine">
        <div className="title">
          {props.data[20].fach_kurzform}
        </div>
        <div className="location">
          {props.data[22]}
        </div>
      </div>
      <div className="time">
        {props.data[20].zeitvon} - {props.data[20].zeitbis}
      </div>
      <div className="description">
        {props.data[20].fach_name + ' ' +props.data[12]}
      </div>
    </div>
  );
};

export default Course;