import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    data: state.data.data
  };
}

class Timetable extends Component {
  render() {
    return (
      <div>
        {JSON.stringify(this.props.data)}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
)(Timetable);