import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
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

// Set the routes
const routes = {
    path: '/',
    component: App,
    childRoutes: [
        { path: '/login', component: Login },
        { path: '/dashboard', component: Dashboard },
        { path: '/dashboard/subjects/:subjectId', component: Subject },
    ]
};


// Render the Element
const render = () => {
  let state = store.getState();
  console.log(state);

  ReactDOM.render(
    <Provider store={store}>
      <Router history={history} routes={routes} >
      </Router>
    </Provider>,
    document.getElementById('root')); 
}

render();

// Run everytime the store changes
store.subscribe(render);