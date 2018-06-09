import React, { Component } from 'react';
import { connect } from 'react-redux';
import Day from './day';

function mapStateToProps(state) {
  return {
    data: state.data.data,
    date: state.day.currentDay,
    day: state.day.days[new Date(state.day.currentDay).setHours(0,0,0,0)]
  };
}

class Timetable extends Component {
  render() {
    return (
      <div>
        <Day date={this.props.date} data={this.props.day}></Day>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
)(Timetable);