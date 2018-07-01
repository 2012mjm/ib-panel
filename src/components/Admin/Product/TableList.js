import React from 'react'
import {Table, Icon} from 'antd'
import PropTypes from 'prop-types'
import moment from 'moment-jalaali'
moment.loadPersian([{usePersianDigits: true, dialect: 'persian-modern'}])

class TableList extends React.Component {
  render () {
    const {list, loading} = this.props
    return (
      <Table dataSource={list} rowKey={record => record.id} columns={columns} loading={loading} />
    )
  }
}

const columns = [
  { title: 'عنوان',
    dataIndex: 'title',
    key: 'title',
    render: (value, record) => value.fa
  },
  { title: 'دسته',
    dataIndex: 'category',
    key: 'category',
    render: (value, record) => value.fa
  },
  { title: 'فروشگاه',
    dataIndex: 'store',
    key: 'store',
    render: (value, record) => value.fa
  },
  { title: 'قیمت',
    dataIndex: 'price',
    key: 'price'
  },
  { title: 'تخفیف',
    dataIndex: 'discount',
    key: 'discount'
  },
  { title: 'موجودی',
    dataIndex: 'quantity',
    key: 'quantity'
  },
  { title: 'وضعیت',
    dataIndex: 'status',
    key: 'status'
  },
  { title: 'تاریخ ایجاد',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (value, record) => moment(value).locale('fa').format('jD jMMMM jYY (H:mm)')
  },
  // { title: 'عملیات',
  //   key: 'operations',
  //   render: (text, record) => (<div>
  //     <a onClick={() => this.props.viewer(true, record)}><Icon type="edit" style={{ fontSize: 17 }} /></a>
  //     <a onClick={() => this.props.viewer(true, record)}><Icon type="delete" style={{ fontSize: 17 }} /></a>
  //   </div>)
  // }
]

TableList.propTypes = {
  dataSource: PropTypes.array,
  loading: PropTypes.bool
}

export default TableList
