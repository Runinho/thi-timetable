import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  console.log('state', state);
  return {
    username: state.login.username,
    password: state.login.password,
    showLogin: state.login.showLogin,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleUsernameChange: (event) => dispatch({
      type : 'CHANGE_USERNAME',
      payload: event.target.value
    }),
    handePasswordChange: (event) => dispatch({
      type : 'CHANGE_PASSWORD',
      payload: event.target.value
    }),
    onLoginPressed: (event) => dispatch({
      type : 'LOGIN_PRESSED',
    }),
  }
}

class Login extends Component {
  render() {
    if(this.props.showLogin){
      return (
        <div>
          <input name="username" type="text" onChange={this.props.handleUsernameChange} value={this.props.username} /><br />
          <input name="password" type="password" onChange={this.props.handePasswordChange} value={this.props.password} /><br />
          <button onClick={this.props.onLoginPressed}>login</button><br />
        </div>
      );
    }
    return null;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);