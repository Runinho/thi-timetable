import React, { Component } from 'react';
import { connect } from 'react-redux';
import Day from './day';
import Status from './status';
import TimeAgo from 'react-timeago'

function mapStateToProps(state) {
  return {
    timestamp: state.data.data.timestamp,
    date: state.day.currentDay,
    day: state.day.days[new Date(state.day.currentDay).setHours(0,0,0,0)]
  };
}

class Timetable extends Component {
  render() {
    return (
      <div>
        <Status></Status>
        <div className="informationContainer">
          <div className="information">
            Last updated: <TimeAgo date={this.props.timestamp} minPeriod="5"/>
          </div>
        </div>
        <Day date={this.props.date} data={this.props.day}></Day>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
)(Timetable);