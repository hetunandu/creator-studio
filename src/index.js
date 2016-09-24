import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware, combineReducers } from 'redux';

import { Provider } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import * as reducers from './reducers';
reducers.routing = routerReducer;


import thunkMiddleware from 'redux-thunk';
import App from './App';

import './index.css';
import injectTapEventPlugin from 'react-tap-event-plugin';


// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();


// Redux: Creating stores with the reducers
const store = createStore(combineReducers(reducers), applyMiddleware(thunkMiddleware));

// Router: Sync the history with the redux store
const history = syncHistoryWithStore(hashHistory, store);

// Render the Element
function run(){

  // let state = store.getState();

  ReactDOM.render(
    <Provider store={store}>
      <Router history={history} >
        <Route path='/' component={App}>
          
        </Route>
      </Router>
    </Provider>,
    document.getElementById('root')); 
}

run();

store.subscribe(run);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
