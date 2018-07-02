import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Button } from 'antd'
import { notifySuccess, notifyError } from '../../../lib/notification'
import { errorHandler } from '../../../lib/utils'
import { addCategoryThunk } from '../../../thunks/category'
import Former from './Former'

class AddModal extends React.Component {
  constructor (props) {
    super(props)
    this.create = this.create.bind(this)
  }

  create = (e, form, id=null) => {
    e.preventDefault()
    form.validateFields((err, values) => {
      if (err) return undefined

      let data = new window.FormData()
      if(values.parent_id) data.append('parent_id', values.parent_id)
      if(values.name_fa) data.append('name_fa', values.name_fa)
      if(values.name_en) data.append('name_en', values.name_en)
      if(values.color) data.append('color', values.color)
      if(values.photo) data.append('photo', values.photo.file)

      this.props.dispatch(addCategoryThunk(data)).then(res => {
        notifySuccess('دسته جدید با موفقیت ثبت شد.')
        this.props.reloadList()
        this.props.viewer(false)
        form.resetFields()
        return true
      }).catch(e => {
        notifyError(errorHandler(e))
        return false
      })
    })
  }

  render () {
    return (
      <Modal
        title="افزودن دسته جدید"
        visible={this.props.show}
        onCancel={() => this.props.viewer(false)}
        footer={<Button onClick={() => this.props.viewer(false)}>لغو</Button>}>
          <Former onSubmit={this.create} dispatch={this.props.dispatch} categoryList={this.props.categoryList} />
      </Modal>
    )
  }
}

AddModal.propTypes = {
  show: PropTypes.bool,
  viewer: PropTypes.func,
  dispatch: PropTypes.func,
  reloadList: PropTypes.func,
  categoryList: PropTypes.array
}

export default AddModal
