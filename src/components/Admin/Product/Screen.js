import React from 'react'
import { Card, Layout, Row, Col, Button } from 'antd'
import { connect } from 'react-redux'
import { productThunk } from '../../../thunks/product'
import AddModal from './AddModal'
import EditModal from './EditModal'
import TableList from './TableList'

class Screen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      isAddModalVisible: false,
      isEditModalVisible: false,
      list: [],
      productValues: {}
    }
    this.toggleAddModal = this.toggleAddModal.bind(this)
    this.toggleEditModal = this.toggleEditModal.bind(this)
    this.getProductList = this.getProductList.bind(this)
  }

  toggleAddModal (show = true) {
    this.setState({isAddModalVisible: !!show})
  }

  toggleEditModal (show = true, product) {
    this.setState({isEditModalVisible: !!show, productValues: product})
  }

  getProductList () {
    this.setState({loading: true})

    this.props.dispatch(productThunk(1, 100)).then((res) => {
      if (res.length > 0) {
        this.setState({list: res, loading: false})
        return true
      } else {
        this.setState({loading: false})
        return false
      }
    }).catch(() => {
      this.setState({loading: false})
      return false
    })
  }

  componentDidMount () {
    this.getProductList()
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.list) {
      return this.setState({list: nextProps.list})
    }
  }

  render () {
    const { list, loading, isAddModalVisible, isEditModalVisible, productValues } = this.state
    return (
      <Layout>
        {/* <AddModal show={isAddModalVisible} viewer={this.toggleAddModal} dispatch={this.props.dispatch} reloadList={this.getProductList} />
        <EditModal show={isEditModalVisible} viewer={this.toggleEditModal} dispatch={this.props.dispatch} reloadList={this.getProductList} product={productValues} /> */}
        <Layout.Content>
          <Row gutter={48}>
            <Col span={12}><h2>محصولات</h2></Col>
            <Col span={12}>
              {/* <Button className="btn-left" type="primary" onClick={this.toggleAddModal}>افزودن محصول جدید</Button> */}
            </Col>
          </Row>
          <Card>
            <TableList list={list} viewer={this.toggleEditModal} loading={loading} />
          </Card>
        </Layout.Content>
      </Layout>
    )
  }
}

function mapStateToProps (state) {
  return {
    list: state.product.list
  }
}

export default connect(mapStateToProps)(Screen)
