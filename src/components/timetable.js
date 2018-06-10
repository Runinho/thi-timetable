import React, { Component } from 'react';
import { connect } from 'react-redux';
import Day from './day';
import Status from './status';
import TimeAgo from 'react-timeago';
import {Motion, spring} from 'react-motion';
import { getOtherDay } from '../helper/date';
import ReactSwipe from 'react-swipe';

function mapStateToProps(state) {
  return {
    timestamp: (state.data.data ? state.data.data.timestamp : null),
    currentDay: state.day.currentDay,
    viewDate: state.day.viewDate,
    days: state.day.days,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeViewDate: (newViewDate) => dispatch({
      type : 'CHANGE_VIEW_DATE',
      payload: newViewDate
    }),
  }
}

class Timetable extends Component {
  constructor(props){
    super(props)
    this.slideChanged = this.slideChanged.bind(this);
    this.state = {viewDate: new Date(), currentSlideElement: 1};
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown.bind(this), false);
  }
  
  componentWillUnMount() {
    document.removeEventListener('keydown', this.handleKeyDown.bind(this), false);
  }
  
  handleKeyDown(event) {
    if (event.keyCode == 39 /*right arrow*/) {
      this.reactSwipe.next();
    }
    if (event.keyCode == 37 /*left arrow*/) {
      this.reactSwipe.prev();
    }
  }

  slideChanged(index, elem){
    this.props.changeViewDate(getOtherDay(this.props.viewDate, index-1));
    this.setState({currentSlideElement: 1});
    console.log('slide!:',index, elem);
  }

  render() {
    const yesterday = getOtherDay(this.props.viewDate, -1);
    const tomorrow = getOtherDay(this.props.viewDate, 1);
    const days = [yesterday, this.props.viewDate, tomorrow];
    console.log('render',this.props.currentDay);
    return (
      <div>
        <Status></Status>
        <div className="informationContainer">
          <div className="information">
            Last updated: <TimeAgo date={this.props.timestamp} minPeriod="5"/>
            {this.state.startX}
            {this.state.shiftX}
          </div>
        </div>
        <ReactSwipe ref={reactSwipe => this.reactSwipe = reactSwipe} key={JSON.stringify(days)} swipeOptions={{transitionEnd: this.slideChanged, startSlide: 1}}>
          {days.map((day) => <Day currentDay={this.props.currentDay} key={day} date={+day} data={this.props.days[+day]}></Day>)}
        </ReactSwipe>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Timetable);