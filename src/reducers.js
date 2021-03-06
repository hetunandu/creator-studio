import {
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
    LOGOUT_SUCCESS,
    SUBJECT_REQUEST, SUBJECT_SUCCESS, SUBJECT_FAILURE,
    SUBJECT_ADD_REQUEST, SUBJECT_ADD_SUCCESS, SUBJECT_ADD_FAILURE,
    CHAPTERS_REQUEST, CHAPTERS_SUCCESS, CHAPTERS_FAILURE,
    CHAPTER_ADD_REQUEST, CHAPTER_ADD_SUCCESS, CHAPTER_ADD_FAILURE,
    CHAPTER_EDIT_REQUEST, CHAPTER_EDIT_SUCCESS, CHAPTER_EDIT_FAILURE,
    CHAPTER_DELETE_REQUEST, CHAPTER_DELETE_SUCCESS, CHAPTER_DELETE_FAILURE,
    CONCEPTS_REQUEST, CONCEPTS_SUCCESS, CONCEPTS_FAILURE,
    EDIT_SELECTED_CONCEPT, UPDATE_SELECTED_CONCEPT, SELECT_CONCEPT,
    NEW_CONCEPT_REQUEST, NEW_CONCEPT_SUCCESS, NEW_CONCEPT_FAILURE,
    SAVE_SELECTED_CONCEPT_REQUEST, SAVE_SELECTED_CONCEPT_SUCCESS, SAVE_SELECTED_CONCEPT_FAILURE,
    DELETE_CONCEPT_REQUEST, DELETE_CONCEPT_SUCCESS, DELETE_CONCEPT_FAILURE
} from './actions'


// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
export const auth = (state = {
    isFetching: false,
    isAuthenticated: localStorage.getItem('login_token') ? true : false
}, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                isAuthenticated: false,
                user: action.creds
            });
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: true,
                errorMessage: ''
            });
        case LOGIN_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: false,
                errorMessage: action.message
            });
        case LOGOUT_SUCCESS:
            return Object.assign({}, state, {
                isFetching: true,
                isAuthenticated: false
            });
        default:
            return state
    }
};

export const subjects = (state = {
    isFetching: false,
    list: []
}, action) => {
    switch (action.type) {
        //Fetching the subject list
        case SUBJECT_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case SUBJECT_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                list: action.response.message.subjects
            });
        case SUBJECT_FAILURE:
            return Object.assign({}, state, {
                errorMessage: action.error,
                isFetching: false
            });

        // Adding a subject
        case SUBJECT_ADD_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case SUBJECT_ADD_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                list: state.list.concat([action.response.message])
            });
        case SUBJECT_ADD_FAILURE:
            return Object.assign({}, state, {
                isFetching: false
            });

        default:
            return state
    }
};

export const chapters = (state = {
    isFetching: false,
    list: []
}, action) => {
    switch (action.type) {
        case CHAPTERS_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                list: [],
                errorMessage: ''
            });
        case CHAPTERS_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                list: action.response.message.chapters || [],
                errorMessage: ''
            });
        case CHAPTERS_FAILURE:
            return Object.assign({}, state, {
                errorMessage: action.error,
                isFetching: false
            });

        // Adding a Chapter
        case CHAPTER_ADD_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case CHAPTER_ADD_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                list: state.list.concat([action.response.message])
            });
        case CHAPTER_ADD_FAILURE:
            return Object.assign({}, state, {
                isFetching: false
            });
        // Editing a Chapter
        case CHAPTER_EDIT_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case CHAPTER_EDIT_SUCCESS:
            let editedChapter = action.response.message;
            let new_list = state.list.map(chapter => {
                if (chapter.key !== editedChapter.key) return chapter;
                return Object.assign({}, chapter, editedChapter)
            });
            return Object.assign({}, state, {
                isFetching: false,
                list: new_list
            });
        case CHAPTER_EDIT_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                errorMessage: action.error
            });
        // Deleting a chapter
        case CHAPTER_DELETE_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case CHAPTER_DELETE_SUCCESS:
            console.log(action);
            return Object.assign({}, state, {
                isFetching: false,
                list: state.list.filter(chapter => {
                    return chapter.key !== action.response.deleted_key
                })
            });
        case CHAPTER_DELETE_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                errorMessage: action.error
            });
        default:
            return state
    }
};

// Concept Actions
export const concepts = (state = {
    isFetching: false,
    errorMessage: '',
    chapter: {},
    list: []
}, action) => {
    switch (action.type) {
        // Fetching concept list
        case CONCEPTS_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                errorMessage: ''
            });
        case CONCEPTS_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                chapter: action.response.message.chapter,
                list: action.response.message.chapter.concepts,
                errorMessage: '',
            });
        case CONCEPTS_FAILURE:
            return Object.assign({}, state, {
                errorMessage: action.error,
                isFetching: false
            });
        // Creating a new concept
        case NEW_CONCEPT_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                errorMessage: ''
            });
        case NEW_CONCEPT_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                list: state.list.concat([action.response.message.concept]),
            });
        case NEW_CONCEPT_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                errorMessage: action.error
            });

        // Save selected concept
        case SAVE_SELECTED_CONCEPT_SUCCESS:
            const editedConcept = action.response.message.concept;
            return Object.assign({}, state, {
                list: state.list.map(concept => {
                    if(concept.key !== editedConcept.key) {
                        return concept
                    }else{
                        return editedConcept
                    }
                })
            });
        // Deleting a concept
        case DELETE_CONCEPT_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case DELETE_CONCEPT_SUCCESS:
            return Object.assign({}, state, {
                list: state.list.filter((concept) => {
                    return concept.key !== action.response.message.deleted_key
                }),
                isFetching: false

            });
        case DELETE_CONCEPT_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                errorMessage: action.error
            });
        default:
            return state
    }
};

export const selectedConcept = (state = {
    isEditing: false,
    isSaving: false,
    errorMessage: '',
    data: {}
}, action) => {
    switch (action.type) {
        case CONCEPTS_REQUEST:
            return {
                isEditing: false,
                isSaving: false,
                errorMessage: '',
                data: {}
            }
        // Select a concept
        case SELECT_CONCEPT:
            return Object.assign({}, state, {
                data: action.concept
            });
        // Edit selected concept
        case EDIT_SELECTED_CONCEPT:
            return Object.assign({}, state, {
                isEditing: true
            });
        // Update selected concept
        case UPDATE_SELECTED_CONCEPT:
            return Object.assign({}, state, {
                data: action.concept
            });
        // New Concept
        case NEW_CONCEPT_SUCCESS:
            return Object.assign({}, state, {
                data: action.response.message.concept
            });
        // Save selected concept
        case SAVE_SELECTED_CONCEPT_REQUEST:
            return Object.assign({}, state, {
                isSaving: true,
                isEditing: false
            });
        case SAVE_SELECTED_CONCEPT_SUCCESS:
            return Object.assign({}, state, {
                isSaving: false,
            });
        case SAVE_SELECTED_CONCEPT_FAILURE:
            return Object.assign({}, state, {
                isSaving: false,
                isEditing: true,
                errorMessage: action.error
            });
        case DELETE_CONCEPT_SUCCESS:
            return Object.assign({}, state, {
                data: {}
            });
        default:
            return state;
    }
};