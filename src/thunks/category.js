import * as categoryActions from '../actions/category'
import * as ajaxActions from '../actions/ajax'
import { API_URL } from '../lib/constants'
import axios from 'axios'

export function categoryThunk () {
  return (dispatch, getState) => {
    dispatch(ajaxActions.isLoading(true))
    return axios.get(`${API_URL}category`).then((res) => {

      dispatch(ajaxActions.isLoading(false))
      dispatch(categoryActions.setCategoryList(res.data))
      return res.data
    }).catch((e) => {
      dispatch(ajaxActions.isLoading(false))
      throw e
    })
  }
}

export function updateCategoryThunk (values) {
  return (dispatch, getState) => {
    dispatch(ajaxActions.isLoading(true))
    return axios.put(`${API_URL}category`, values).then((res) => {

      dispatch(ajaxActions.isLoading(false))
      return res.data
    }).catch((e) => {
      dispatch(ajaxActions.isLoading(false))
      throw e
    })
  }
}

export function addCategoryThunk (values) {
  return (dispatch, getState) => {
    dispatch(ajaxActions.isLoading(true))
    return axios.post(`${API_URL}category`, values).then((res) => {

      dispatch(ajaxActions.isLoading(false))
      return res.data
    }).catch((e) => {
      dispatch(ajaxActions.isLoading(false))
      throw e
    })
  }
}

export function deleteCategoryThunk (id) {
  return (dispatch, getState) => {
    dispatch(ajaxActions.isLoading(true))
    return axios.delete(`${API_URL}category?id=${id}`).then((res) => {

      dispatch(ajaxActions.isLoading(false))
      return res.data
    }).catch((e) => {
      dispatch(ajaxActions.isLoading(false))
      throw e
    })
  }
}