import React, { Component } from 'react';
import { connect } from 'react-redux';

import Login from './login';
import Timetable from './timetable';

function mapStateToProps(state) {
  return {
    showLogin: state.login.showLogin,
  };
}

class Root extends Component {

  render() {
    console.log('test');
    console.log('login?:', this.props.showLogin);
    return (
      <div>
        {this.props.showLogin && <Login></Login>}
        {!this.props.showLogin && <Timetable></Timetable>}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
)(Root);