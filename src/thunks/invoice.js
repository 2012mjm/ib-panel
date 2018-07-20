import * as authActions from '../actions/auth'
import * as ajaxActions from '../actions/ajax'
import * as invoiceActions from '../actions/invoice'
import { API_URL } from '../lib/constants'
import axios from 'axios'

export function invoiceThunk () {
  return (dispatch, getState) => {
    dispatch(ajaxActions.isLoading(true))
    return axios.get(`${API_URL}invoices`).then((res) => {

      dispatch(ajaxActions.isLoading(false))
      dispatch(invoiceActions.setInvoiceList(res.data))
      return res.data
    }).catch((e) => {
      dispatch(ajaxActions.isLoading(false))
      throw e
    })
  }
}

export function infoInvoiceThunk (id) {
  return (dispatch, getState) => {
    dispatch(ajaxActions.isLoading(true))
    return axios.get(`${API_URL}invoice?id=${id}`).then((res) => {

      dispatch(invoiceActions.setCurrentInvoice(res.data))
      dispatch(ajaxActions.isLoading(false))
      return res.data
    }).catch((e) => {
      dispatch(ajaxActions.isLoading(false))
      throw e
    })
  }
}