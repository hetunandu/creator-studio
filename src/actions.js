import { CALL_API } from './api';


// There are three possible states for our login
// process and we need actions for each of them
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  }
}

function receiveLogin(token) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    login_token: token
  }
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

// Calls the API to get a token and
// dispatches actions along the way
export function loginUser(creds) {

  let config = {
    method: 'POST',
    headers: { 
        Accept: 'application/json',
        'Content-Type':'application/json' 
    },
    body: JSON.stringify(creds)
  }

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds))


    return fetch('http://127.0.0.1:8080/users/login', config)
      .then(res => res.json())
      .then(json => {
          if(json.success === false){
            dispatch(loginError(json.error))
          }else{
            // If login was successful, set the token in local storage
            localStorage.setItem('login_token', json.message.token)
            // Dispatch the success action
            dispatch(receiveLogin(json.message.token))
          }
        })
      .catch(err => console.log(err))
  }
}




// Three possible states for our logout process as well.
// Since we are using JWTs, we just need to remove the token
// from localStorage. These actions are more useful if we
// were calling the API to log the user out
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  }
}

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  }
}

// Logs the user out
export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout())
    localStorage.removeItem('login_token')
    dispatch(receiveLogout())
  }
}


// Subject Actions
export const SUBJECT_REQUEST = 'SUBJECT_REQUEST'
export const SUBJECT_SUCCESS = 'SUBJECT_SUCCESS'
export const SUBJECT_FAILURE = 'SUBJECT_FAILURE'


export function fetchSubjects() {
  return {
    [CALL_API]: {
      endpoint: 'subjects/',
      authenticated: true,
      types: [SUBJECT_REQUEST, SUBJECT_SUCCESS, SUBJECT_FAILURE]
    }
  }
}

export const SUBJECT_ADD_REQUEST = 'SUBJECT_ADD_REQUEST'
export const SUBJECT_ADD_SUCCESS = 'SUBJECT_ADD_SUCCESS'
export const SUBJECT_ADD_FAILURE = 'SUBJECT_ADD_FAILURE'

export function addSubject(subject) {
  return {
    [CALL_API]: {
      endpoint: 'subjects/',
      post: true,
      body: subject,
      authenticated: true,
      types: [SUBJECT_ADD_REQUEST, SUBJECT_ADD_SUCCESS, SUBJECT_ADD_FAILURE]
    }
  }
}


// Chapter Actions

export const CHAPTERS_REQUEST = 'CHAPTERS_REQUEST'
export const CHAPTERS_SUCCESS = 'CHAPTERS_SUCCESS'
export const CHAPTERS_FAILURE = 'CHAPTERS_FAILURE'


export function fetchChapters(subject_key) {
  return {
    [CALL_API]: {
      endpoint: `subjects/${subject_key}/chapters`,
      authenticated: true,
      types: [CHAPTERS_REQUEST, CHAPTERS_SUCCESS, CHAPTERS_FAILURE]
    }
  }
}


export const CHAPTER_ADD_REQUEST = 'CHAPTER_ADD_REQUEST'
export const CHAPTER_ADD_SUCCESS = 'CHAPTER_ADD_SUCCESS'
export const CHAPTER_ADD_FAILURE = 'CHAPTER_ADD_FAILURE'


export function addChapter(data) {
  return {
    [CALL_API]: {
      endpoint: 'chapters/',
      post: true,
      body: data,
      authenticated: true,
      types: [CHAPTER_ADD_REQUEST, CHAPTER_ADD_SUCCESS, CHAPTER_ADD_FAILURE]
    }
  }
}