import React, { Component } from 'react';
import './App.scss';

import store from './redux/configureStore';
import {Provider} from 'react-redux';
import Root from './components/root';

class App extends Component {
  render() {
    console.log('test reder');
    return (
      <div>
        <Provider store={store}>
          <div className="App">
            <div className="App-header">
              <p className="Title">THI-Stundenplan</p>
            </div>
            <Root></Root>
          </div>
        </Provider>
      </div>
    );
  }
}

export default App;
