import React, { Component } from 'react';
import { connect } from 'react-redux';
import { STATUS_STATES } from '../reducers/status';
import { SyncLoader } from 'react-spinners';

function mapStateToProps(state) {
  console.log('state', state);
  return {
    username: state.login.username,
    password: state.login.password,
    accept: state.login.accept,
    action: state.status.actionState,
    hasData: state.status.dataState,
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
    handeCheckboxChange: (event) => dispatch({
      type : 'CHANGE_ACCEPT',
      payload: event.target.checked
    }),

    onLoginPressed: (event) => dispatch({
      type : 'LOGIN_PRESSED',
    }),
    onBackPressed: (event) => dispatch({
      type : 'SHOW_LOGIN', payload: false
    }),
  }
}

class Login extends Component {
  render() {
  const back = (this.props.hasData === STATUS_STATES.DATA ? <button className="action sec" onClick={this.props.onBackPressed}>Zurück</button> : <div className="action"></div>) 

    return (
      <div className="login">
        <div className="warning">
          <div className="warningText">
          Dies ist <b>keine</b> offizielle Webseite der
          Teschnischen Hchschule Ingolstadt.
          Alle daten (inklusiv passörter) werden 
          unverschlüsselt an <a href={window.location.host}>{window.location.host}</a> gesedet.
          Mehr informationen findest du <a href="https://github.com/Runinho/thi-timetable/">hier</a>.
          </div>
        </div>
        <input placeholder="Benutzerkennung (z.B. mso1337)" name="username" type="text" onChange={this.props.handleUsernameChange} value={this.props.username} /><br />
        <input placeholder="Passwort" name="password" type="password" onChange={this.props.handePasswordChange} value={this.props.password} /><br />
        <div className="checkboxContainer">
          <input className="checkbox" type="checkbox" onChange={this.props.handeCheckboxChange} checked={this.props.accept}/>
          <div>Ich habe den <b>Hinweis</b> gelesen und bin mir der Konsequenzen bewusst.</div>
        </div>
        <div className="actions">
          {back}
          <button disabled={!(this.props.accept && this.props.password && this.props.username)} className="action main" onClick={this.props.onLoginPressed}>{this.props.action === STATUS_STATES.LOGIN ? <div className="loginLoader"><SyncLoader size="5" color={'#FFFFFF'} /></div>: 'Login'}</button>
        </div>
        <p>
          Diese seite ist OpenSource und unter <a href="https://github.com/Runinho/thi-timetable">github.com/Runinho/thi-timetable</a> zu finden.
        </p>
        <div className="created">
          created by Rune Frohn 2018
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);