import ajaxReducer from './ajaxReducer'
import authReducer from './authReducer'

// import { routerReducer } from 'react-router-redux'
// import { reducer as searchReducer } from 'redux-search'
import { combineReducers } from 'redux'

export default combineReducers({
  ajax: ajaxReducer,
  auth: authReducer,
})