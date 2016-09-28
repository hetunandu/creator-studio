import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import * as reducers from './reducers';
import thunkMiddleware from 'redux-thunk';
import api from './api.js';
import App from './App';
import SubjectList from './components/Subjects/SubjectList';
import ChapterList from './components/Chapters/ChapterList';
import NewChapter from './components/Chapters/NewChapter';
import ConceptList from './components/Concepts/ConceptList';
import NewConcept from './components/Concepts/NewConcept';
import './index.css';
import injectTapEventPlugin from 'react-tap-event-plugin';


// Needed for onTouchTap in material-ui
injectTapEventPlugin();

//Adding the routing reducer to the list of reducers
reducers.routing = routerReducer;
// Redux: Creating stores with the reducers and add middleware
const store = createStore(combineReducers(reducers), applyMiddleware(thunkMiddleware, api));

// Router: Sync the history with the redux store
const history = syncHistoryWithStore(browserHistory, store);

// Set the routes
const routes = {
    path: '/',
    component: App,
    indexRoute: { component: SubjectList },
    childRoutes: [
        { 
            path: '/subjects', 
            component: SubjectList, 
            childRoutes: [
                { 
                    path: '/subjects/:subject_key', 
                    component: ChapterList,
                    childRoutes: [
                        {path: '/subjects/:subject_key/chapters/add', component: NewChapter}
                    ] 
                }
            ]
        },
        {
            path: '/chapters/:chapter_key',
            component: ConceptList,
        },
         { path: '/chapters/:chapter_key/new', component: NewConcept}
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

// First render
render();

// Run everytime the store changes
store.subscribe(render);