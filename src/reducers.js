
import { 
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, 
  LOGOUT_SUCCESS,
  SUBJECT_REQUEST, SUBJECT_SUCCESS, SUBJECT_FAILURE,
  SUBJECT_ADD_REQUEST, SUBJECT_ADD_SUCCESS, SUBJECT_ADD_FAILURE,
  CHAPTERS_REQUEST, CHAPTERS_SUCCESS, CHAPTERS_FAILURE,
  CHAPTER_ADD_REQUEST, CHAPTER_ADD_SUCCESS, CHAPTER_ADD_FAILURE,
  CONCEPTS_REQUEST, CONCEPTS_SUCCESS, CONCEPTS_FAILURE,
  NEW_CONCEPT_CHANGE_STEP, NEW_CONCEPT_SET_NAME, 
  NEW_CONCEPT_ADD_EXP_NODE, NEW_CONCEPT_UPDATE_EXP_NODE, NEW_CONCEPT_REMOVE_EXP_NODE
} from './actions'


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

      default:
        return state
    }
  }

  export const chapters = (state = {
    isFetching: false,
    list: []
  }, action) => {
    switch(action.type){
      case CHAPTERS_REQUEST:
        return Object.assign({}, state, {
          isFetching: true,
          errorMessage: ''
        })
      case CHAPTERS_SUCCESS:
        return Object.assign({}, state, {
          isFetching: false,
          list: action.response.message.chapters || [],
          errorMessage: ''
        })
      case CHAPTERS_FAILURE:
        return Object.assign({}, state, {
          errorMessage: action.error,
          isFetching: false
        })

      // Adding a Chapter
      case CHAPTER_ADD_REQUEST:
        return Object.assign({}, state, {
          isFetching: true
        })
      case CHAPTER_ADD_SUCCESS:
        return Object.assign({}, state, {
          isFetching: false,
          list: state.list.concat([action.response.message]),
        })
      case CHAPTER_ADD_FAILURE:
        return Object.assign({}, state, {
          isFetching: false
        })
      default:
        return state 
    }
  }

  // Concept Actions
  export const concepts = (state = {
      isFetching: false,
      chapter: {},
      list: []
    }, action) => {
    switch(action.type){
      case CONCEPTS_REQUEST:
        return Object.assign({}, state, {
          isFetching: true,
          errorMessage: ''
        })
      case CONCEPTS_SUCCESS:
        return Object.assign({}, state, {
          isFetching: false,
          chapter: action.response.message.chapter,
          list: action.response.message.concepts || [],
          errorMessage: ''
        })
      case CONCEPTS_FAILURE:
        return Object.assign({}, state, {
          errorMessage: action.error,
          isFetching: false
        })
      default:
        return state 
    }
  }


  // New Concept Actions
  export const newConcept = (state = {
      stepIndex: 0,
      chapter_key: null,
      name: '',
      explanation: [],
      references: [],
      tips: [],
      questions: []
    }, action) => {
    switch(action.type){
      case NEW_CONCEPT_CHANGE_STEP:
        return Object.assign({}, state, {
          stepIndex: action.stepIndex
        })
      case NEW_CONCEPT_SET_NAME:
        return Object.assign({}, state, {
          name: action.name
        })
      case NEW_CONCEPT_ADD_EXP_NODE:
        return Object.assign({}, state, {
          explanation: state.explanation.concat([action.node])
        })
      case NEW_CONCEPT_UPDATE_EXP_NODE:
        let explanation = state.explanation
        explanation[action.index] = action.node
        return Object.assign({}, state, {
          explanation
        })
      case NEW_CONCEPT_REMOVE_EXP_NODE:
        return Object.assign({}, state, {
          explanation: state.explanation
                        .slice(0, action.index)
                        .concat(state.explanation.slice(action.index + 1))
        })
      default:
        return state 
    }
  }