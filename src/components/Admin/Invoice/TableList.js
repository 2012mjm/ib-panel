import React from 'react'
import {Table, Badge, Icon} from 'antd'
import PropTypes from 'prop-types'
import { INVOICE_STATUS } from '../../../lib/constants'
import { priceFormat, statusStyle } from '../../../lib/utils'
import moment from 'moment-jalaali'
moment.loadPersian([{usePersianDigits: true, dialect: 'persian-modern'}])

class TableList extends React.Component {
  render () {
    const {list, loading} = this.props
    const columns = [
      { title: 'شماره فاکتور',
        dataIndex: 'number',
        key: 'number',
        render: (number, record) => <a onClick={() => this.props.viewer(true, record)}>{number}</a>
      },
      { title: 'مبلغ',
        dataIndex: 'amount',
        key: 'amount',
        render: (amount, record) => priceFormat(amount)
      },
      { title: 'وضعیت',
        dataIndex: 'status',
        key: 'status',
        render: (status, record) => statusStyle(status, INVOICE_STATUS[status])
      },
      { title: 'دلیل رد',
        dataIndex: 'reasonRejected',
        key: 'reasonRejected'
      },
      { title: 'تاریخ ایجاد',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (value, record) => moment(value).locale('fa').format('jD jMMMM jYY (H:mm)')
      },
      { title: 'عملیات',
        key: 'operations',
        render: (text, record) => (<div>
          <a onClick={() => this.props.viewer(true, record)}><Icon type="eye" style={{ fontSize: 17 }} /></a>{' '}
        </div>)
      }
    ]
    return (
      <Table dataSource={list} rowKey={record => record.id} columns={columns} loading={loading} />
    )
  }
}

TableList.propTypes = {
  dataSource: PropTypes.array,
  loading: PropTypes.bool,
  viewer: PropTypes.func,
}

export default TableList
