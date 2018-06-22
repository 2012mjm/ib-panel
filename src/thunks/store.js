import * as authActions from '../actions/auth'
import * as ajaxActions from '../actions/ajax'
import { API_URL } from '../lib/constants'
import axios from 'axios'
import { setAuthorizationToken } from '../lib/utils'
import jwt from 'jsonwebtoken'

export function storeSignupThunk (data) {
  return (dispatch, getState) => {
    dispatch(ajaxActions.isLoading(true))
    return axios.post(`${API_URL}store/signup`, data).then((res) => {
      
      const tokenDecode = jwt.decode(res.data.token)
      res.data.isAdmin = tokenDecode.isAdmin

      dispatch(ajaxActions.isLoading(false))
      dispatch(authActions.loggedIn(res.data))

      window.localStorage.setItem('auth', JSON.stringify(res.data))
      setAuthorizationToken(res.data.token)
      return res.data
    }).catch((e) => {
      dispatch(ajaxActions.isLoading(false))
      throw e
    })
  }
}
