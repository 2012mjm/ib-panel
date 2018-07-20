const SERVER_DOMAIN = 'localhost'
const PROTO = 'http'

export const API_URL = `${PROTO}://${SERVER_DOMAIN}:1312/api/v1/`
// export const WS_URL = `ws://${SERVER_DOMAIN}:3005`
// export const FILES_BASE_URL = `${PROTO}://${SERVER_DOMAIN}:3001/`

export const INVOICE_STATUS = {
  'pending': 'در انتظار پرداخت',
  'accepted': 'پرداخت شده',
  'rejected': 'رد شده',
}
