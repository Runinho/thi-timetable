import React, { Component } from 'react';
import { connect } from 'react-redux';
import { STATUS_STATES } from '../reducers/status';
import { ClipLoader } from 'react-spinners';
// eslint-disable-next-line import/no-webpack-loader-syntax
import WarningIcon from '-!svg-react-loader?name=WarningIcon!./baseline-warning-24px.svg';
// eslint-disable-next-line import/no-webpack-loader-syntax
import DoneIcon from '-!svg-react-loader?name=DoneIcon!./round-done-24px.svg';

function mapStateToProps(state) {
  return {
    dataState: state.status.dataState,
    sessionState: state.status.sessionState,
    actionState: state.status.actionState,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onShowLogin: (event) => dispatch({
      type : 'SHOW_LOGIN', payload: true
    }),
  }
}

class Status extends Component {
  render() {
    let message;
    if(this.props.actionState === STATUS_STATES.NOACTION){
      if(this.props.dataState === STATUS_STATES.DATA){
        // we have data to display
        if(this.props.sessionState === STATUS_STATES.VALID_SESSION){
          // All good
          message = <span><DoneIcon className="doneIcon" /></span>
        } else {
          // We can't update the data
          message = <div onClick={this.props.onShowLogin}><WarningIcon className="warningIcon" /></div>
        }
      } else {
        // we don't have data to display
        if(this.props.sessionState === STATUS_STATES.VALID_SESSION){
          // Waiting for data
          message = <span>Waiting for data.</span>
        } else {
          // We can't update the data
          message = <span>Need Login!</span>
        }
      }
    } else {
      message = '';
    }
    console.log('action_state:', this.props.actionState);
    return (
      <div className="statusContainer">
        {message}
        <ClipLoader
          color={'#61DAFB'} 
          loading={this.props.actionState !== STATUS_STATES.NOACTION} 
        />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Status);