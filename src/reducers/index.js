import ajaxReducer from './ajaxReducer'
import authReducer from './authReducer'
import categoryReducer from './categoryReducer'
import storeReducer from './storeReducer'
import productReducer from './productReducer'

// import { routerReducer } from 'react-router-redux'
// import { reducer as searchReducer } from 'redux-search'
import { combineReducers } from 'redux'

export default combineReducers({
  ajax: ajaxReducer,
  auth: authReducer,
  category: categoryReducer,
  store: storeReducer,
  product: productReducer
})
