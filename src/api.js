const BASE_URL = 'http://localhost:8080/'

function callApi(endpoint, authenticated, post, body) {

  let token = localStorage.getItem('login_token') || null
  let config = {}

  if(authenticated) {
    if(token) {
      config = {
        headers: { 'Authorization': `${token}` }
      }
    }
  }

  if(post){
      config.method = 'POST'
      config.body = JSON.stringify(body)
      config.headers['Content-type'] = 'application/json'
  }

  return fetch(BASE_URL + endpoint, config)
    .then(response => response.json())
    .then(json => {
      if (json.success === false) {
        return Promise.reject(json)
      }

      return json
    }).catch(err => console.log(err))
}

export const CALL_API = Symbol('Call API')

export default store => next => action => {

  const callAPI = action[CALL_API]

  // So the middleware doesn't get applied to every single action
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  let { endpoint, types, authenticated, post, body } = callAPI

  const [ requestType, successType, errorType ] = types

  // Passing the authenticated boolean back in our data will let us distinguish between normal and secret quotes
  return callApi(endpoint, authenticated, post, body)
    .then(
        response =>
        next({
            response,
            authenticated,
            type: successType
        }),
        error => next({
        error: error.message || 'There was an error.',
        type: errorType
        })
    )
}