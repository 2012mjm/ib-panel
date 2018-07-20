import React from 'react'
import { Card, Layout, Row, Col, Button } from 'antd'
import { connect } from 'react-redux'
import { invoiceThunk, infoInvoiceThunk } from '../../../thunks/invoice'
import { notifySuccess, notifyError } from '../../../lib/notification'
import { errorHandler } from '../../../lib/utils'
import TableList from './TableList'
import ViewModal from './ViewModal'

class Screen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      list: [],
      isViewModalVisible: false,
      invoiceValues: {}
    }
    this.getInvoiceList = this.getInvoiceList.bind(this)
    this.toggleViewModal  = this.toggleViewModal.bind(this)
  }

  toggleViewModal = (show = true, invoice) => {
    if(show) {
      this.props.dispatch(infoInvoiceThunk(invoice.id)).then(res => {
        this.setState({invoiceValues: res})
      }, e => {
        notifyError(errorHandler(e))
      })
    }

    this.setState({isViewModalVisible: !!show})
  }

  getInvoiceList = () => {
    this.setState({loading: true})

    this.props.dispatch(invoiceThunk()).then((res) => {
      this.setState({list: res, loading: false})
      return true
    }).catch(() => {
      this.setState({loading: false})
      return false
    })
  }

  componentDidMount = () => {
    this.getInvoiceList()
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.list) {
      return this.setState({list: nextProps.list})
    }
  }

  render () {
    const { list, loading, isViewModalVisible, invoiceValues } = this.state
    return (
      <Layout>
        <ViewModal show={isViewModalVisible} viewer={this.toggleViewModal} invoice={invoiceValues} />
        <Layout.Content>
          <Row gutter={48}>
            <Col span={12}><h2>سفارشات</h2></Col>
          </Row>
          <Card>
            <TableList list={list} loading={loading} viewer={this.toggleViewModal} />
          </Card>
        </Layout.Content>
      </Layout>
    )
  }
}

function mapStateToProps (state) {
  return {
    list: state.invoice.list
  }
}

export default connect(mapStateToProps)(Screen)
