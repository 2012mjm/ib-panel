import React from 'react'
import {Table, Badge} from 'antd'
import PropTypes from 'prop-types'
import { INVOICE_STATUS } from '../../../lib/constants'
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
        render: (amount, record) => `${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} تومان`
      },
      { title: 'وضعیت',
        dataIndex: 'status',
        key: 'status',
        render: (status, record) => {
          const text = INVOICE_STATUS[status]
          if(status === 'pending') return <span><Badge status="default" />{text}</span>
          else if(status === 'accepted') return <span><Badge status="success" />{text}</span>
          else if(status === 'rejected') return <span><Badge status="error" />{text}</span>
        }
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
