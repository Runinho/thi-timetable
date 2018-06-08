import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import store from './redux/configureStore';
import {Provider} from 'react-redux';
import Login from './components/login';
import Timetable from './components/timetable';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <Login></Login>
          <Timetable></Timetable>
        </div>
      </Provider>
    );
  }
}

export default App;
