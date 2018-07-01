import { createReducer } from 'redux-act'
import * as productActions from '../actions/product'

export default createReducer({
  [productActions.setProductList]: (state, payload) => ({...state, list: payload})
}, {
  list: []
})
