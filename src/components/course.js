import React from 'react';
import { getTimeFromString } from '../helper/date';

// need to be the same in the scss file.
const timeOffset = 75;
const hourheight = 60;

export function getPositon(minutesIntoDay){
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
    <div className={"course " + (false ? 'canceled' : '') }  style={getStyle(getTimeFromString(props.data.von), getTimeFromString(props.data.bis), props.data.overlapping)}>
      <div className="firstLine">
        <div className="title">
          {props.data.veranstaltung}
        </div>
        <div className="location">
          {props.data.raum}
        </div>
      </div>
      <div className="time">
        {props.data.von.substr(0,5)} - {props.data.bis.substr(0,5)}
      </div>
      <div className="description">
        {props.data.fach + ' bei ' +props.data.dozent}
      </div>
    </div>
  );
};

export default Course;