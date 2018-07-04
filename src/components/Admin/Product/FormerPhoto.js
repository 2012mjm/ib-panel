import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Upload, Icon, Modal } from 'antd'
import { connect } from 'react-redux'
import { API_URL } from '../../../lib/constants'

class FormerPhoto extends Component {
  constructor (props) {
    super(props)
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: []
    }
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    })
  }

  handleRemove = (file) => {
    console.log('handleRemove', file)
  }

  handleChange = ({fileList}) => {
    this.setState({ fileList })
  }

  render () {
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">تصویر</div>
      </div>
    )
    const { product } = this.props
    const { previewVisible, previewImage, fileList } = this.state;
    return (
      <div className="clearfix">
        <Upload
          action={`${API_URL}product/photo`}
          accept="image/*"
          data={{'product_id': this.props.productId}}
          headers={{'Authorization': `Bearer ${this.props.auth.token}`}}
          name="photo"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          onRemove={this.onRemove}
        >
          {fileList.length > 5 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    )
  }
}

FormerPhoto.propTypes = {
  productId: PropTypes.number,
}

function mapStateToProps (state) {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(FormerPhoto)