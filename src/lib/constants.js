const SERVER_DOMAIN = 'localhost'
const PROTO = 'http'

export const API_URL = `${PROTO}://${SERVER_DOMAIN}:1312/api/v1/`
// export const WS_URL = `ws://${SERVER_DOMAIN}:3005`
// export const FILES_BASE_URL = `${PROTO}://${SERVER_DOMAIN}:3001/`

export const INVOICE_STATUS = {
  'pending': 'در انتظار پرداخت',
  'accepted': 'پرداخت شده',
  'rejected': 'رد شده',
  'sent': 'ارسال توسط فروشندگان',
  'sent-final': 'ارسال به مشتری',
  'paid': 'پرداخت شده',
}

export const ORDER_STATUS = {
  'pending': 'در انتظار ارسال',
  'sent': 'ارسال شده',
  'rejected': 'رد شده',
}

export const PRODUCT_STATUS = {
  'pending': 'در انتظار تایید',
  'accepted': 'تایید شده',
  'rejected': 'رد شده',
  'deleted': 'حذف شده',
}