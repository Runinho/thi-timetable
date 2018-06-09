import React, { Component } from 'react';
import './App.scss';

import store from './redux/configureStore';
import {Provider} from 'react-redux';
import Login from './components/login';
import Timetable from './components/timetable';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <div className="App-header">
            <p className="Title">Stundenplan</p>
          </div>
          <Login></Login>
          <Timetable></Timetable>
        </div>
      </Provider>
    );
  }
}

export default App;
