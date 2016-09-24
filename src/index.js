import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import * as reducers from './reducers';
reducers.routing = routerReducer;

import thunkMiddleware from 'redux-thunk';
import api from './api.js';
import App from './App';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Subject from './components/Subject';

import './index.css';
import injectTapEventPlugin from 'react-tap-event-plugin';


// Needed for onTouchTap in material-ui
injectTapEventPlugin();

// Redux: Creating stores with the reducers and add middleware
const store = createStore(combineReducers(reducers), applyMiddleware(thunkMiddleware, api));

// Router: Sync the history with the redux store
const history = syncHistoryWithStore(browserHistory, store);

// Render the Element
function run(){

//  let state = store.getState();


  ReactDOM.render(
    <Provider store={store}>
      <Router history={history} >
        <Route path='/' component={App}>
          <Route path='/login' component={Login} /> 
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/dashboard/subjects/:subjectId' component={Subject} />
        </Route>
      </Router>
    </Provider>,
    document.getElementById('root')); 
}

run();

store.subscribe(run);
