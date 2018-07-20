import ajaxReducer from './ajaxReducer'
import authReducer from './authReducer'
import categoryReducer from './categoryReducer'
import storeReducer from './storeReducer'
import productReducer from './productReducer'
import invoiceReducer from './invoiceReducer'
import customerReducer from './customerReducer'

import { combineReducers } from 'redux'

export default combineReducers({
  ajax: ajaxReducer,
  auth: authReducer,
  category: categoryReducer,
  store: storeReducer,
  product: productReducer,
  invoice: invoiceReducer,
  customer: customerReducer,
})
