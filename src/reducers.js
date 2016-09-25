
import { 
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, 
  LOGOUT_SUCCESS,
  SUBJECT_REQUEST, SUBJECT_SUCCESS, SUBJECT_FAILURE,
  SUBJECT_ADD_REQUEST, SUBJECT_ADD_SUCCESS, SUBJECT_ADD_FAILURE, SET_ACTIVE_SUBJECT } from './actions'


// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
export const auth = (state = {
    isFetching: false,
    isAuthenticated: localStorage.getItem('login_token') ? true : false
  }, action)  => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        user: action.creds
      })
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: ''
      })
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      })
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false
      })
    default:
      return state
  }
}

export const subjects = (state = {
    isFetching: false,
    active: {key: null},
    list: []
  }, action) => {
    switch(action.type){
      //Fethcing the subject list
      case SUBJECT_REQUEST:
        return Object.assign({}, state, {
          isFetching: true
        })
      case SUBJECT_SUCCESS:
        return Object.assign({}, state, {
          isFetching: false,
          list: action.response.message.subjects,
        })
      case SUBJECT_FAILURE:
        return Object.assign({}, state, {
          errorMessage: action.error,
          isFetching: false
        })

      // Adding a subject
      case SUBJECT_ADD_REQUEST:
        return Object.assign({}, state, {
          isFetching: true
        })
      case SUBJECT_ADD_SUCCESS:
        return Object.assign({}, state, {
          isFetching: false,
          list: state.list.concat([action.response.message]),
        })
      case SUBJECT_ADD_FAILURE:
        return Object.assign({}, state, {
          isFetching: false
        })

      // Setting an active subject
      case SET_ACTIVE_SUBJECT:
        return Object.assign({}, state, {
          active: action.subject
        })
      
      default:
        return state
    }
  }