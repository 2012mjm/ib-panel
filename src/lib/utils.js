/* global FileReader */
import axios from 'axios'

export function setAuthorizationToken (token) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete axios.defaults.headers.common['Authorization']
  }
}

export function isUser (userRole, roleName) {
  return true
}

export function errorHandler (error) {
  if (error.response) {
    if (error.response.status >= 400 && error.response.status < 500) {

      if(error.response.data._errors !== undefined) {
        return error.response.data._errors[0]
      }

      if (typeof error.response.data === 'string') { return error.response.data }
      if (!error.response.data.message) { return error.response.data.error }
      if (typeof error.response.data.message === 'string') { return error.response.data.message }
      return 'خطایی در ارتباط با سرور وجود دارد'
    } else {
      return 'خطایی در ارتباط با سرور وجود دارد'
    }
  } else {
    return 'خطایی در ارتباط با سرور وجود دارد'
  }
}

export function getBase64 (file) {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  return new Promise((resolve, reject) => {
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}
