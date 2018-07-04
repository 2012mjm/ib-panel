import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Button } from 'antd'
import { notifySuccess, notifyError } from '../../../lib/notification'
import { errorHandler } from '../../../lib/utils'
import { addProductThunk } from '../../../thunks/product'
import FormerInfo from './FormerInfo'
import FormerPhoto from './FormerPhoto'

class AddModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showInfoForm: true,
      showPhotoForm: false,
      productId: null,
      modalTitle: 'افزودن محصول جدید',
      footerButton: 'انصراف',
    }
    this.create = this.create.bind(this)
  }

  create = (e, form, id=null) => {
    e.preventDefault()
    form.validateFields((err, values) => {
      if (err) return undefined

      this.props.dispatch(addProductThunk(values)).then(res => {
        notifySuccess('محصول جدید با موفقیت ثبت شد.')
        this.setState({
          showInfoForm: false,
          showPhotoForm: true,
          productId: res.id,
          modalTitle: 'افزودن تصاویر محصول',
          footerButton: 'بستن'
        })
        this.props.reloadList()
        form.resetFields()
        return true
      }).catch(e => {
        notifyError(errorHandler(e))
        return false
      })
    })
  }

  render () {
    const { showInfoForm, showPhotoForm, productId, modalTitle, footerButton } = this.state
    return (
      <Modal
        destroyOnClose
        title={modalTitle}
        visible={this.props.show}
        onCancel={() => this.props.viewer(false)}
        footer={<Button onClick={() => this.props.viewer(false)}>{footerButton}</Button>}>
          {showInfoForm && <FormerInfo onSubmit={this.create} dispatch={this.props.dispatch} />}
          {showPhotoForm && <FormerPhoto productId={productId} />}
      </Modal>
    )
  }
}

AddModal.propTypes = {
  show: PropTypes.bool,
  viewer: PropTypes.func,
  dispatch: PropTypes.func,
  reloadList: PropTypes.func,
}

export default AddModal
