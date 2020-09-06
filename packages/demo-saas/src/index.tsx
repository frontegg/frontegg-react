import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { App } from './App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';


function counter(state = 0, action: any) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
const store = createStore(counter);


ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>
  , document.getElementById('root'));
