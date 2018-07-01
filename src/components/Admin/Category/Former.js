import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Form, Button, Input, Upload, Icon, TreeSelect } from 'antd'

class Former extends Component {
  constructor (props) {
    super(props)
    this.normalize = this.normalize.bind(this)
  }

  normalize(list) {
    let treeData = []
    for(let i=0; i<list.length; i++) {
      let itemI = list[i]
      let listJ = []
      if(itemI.child !== undefined) {
        for(let j=0; j<itemI.child.length; j++) {
          let itemJ = itemI.child[j]
          let listK = []
          if(itemJ.child !== undefined) {
            for(let k=0; k<itemJ.child.length; k++) {
              let itemK = itemJ.child[k]
              listK.push({
                  label: itemK.name.fa,
                  value: itemK.id.toString(),
                  key: itemK.id.toString()
              })
            }
          }
          listJ.push({
            label: itemJ.name.fa,
            value: itemJ.id.toString(),
            key: itemJ.id.toString(),
            children: listK
          })
        }
      }
      treeData.push({
          label: itemI.name.fa,
          value: itemI.id.toString(),
          key: itemI.id.toString(),
          children: listJ
      })
    }
    return treeData
  }

  render () {
    const FormItem = Form.Item
    const { getFieldDecorator } = this.props.form
    const { category } = this.props
    return (
      <Form className="form" onSubmit={(e) => {
        if (this.props.onSubmit(e, this.props.form, category.id)) {}
      }}>
        <FormItem label="والد" {...formItemLayout}>
          {getFieldDecorator('parent_id', {
            rules: [{required: false}],
            initialValue: (category.parent_id) && category.parent_id.toString()
          })(
            <TreeSelect
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              treeData={this.normalize(this.props.categoryList)}
              placeholder="والد"
              />
          )}
        </FormItem>
        <FormItem label="عنوان فارسی" {...formItemLayout}>
          {getFieldDecorator('name_fa', {
            rules: [{required: true, message: 'این فیلد الزامی است!'}],
            initialValue: category.name.fa
          })(
            <Input />
          )}
        </FormItem>
        <FormItem label="عنوان انگلیسی" {...formItemLayout}>
          {getFieldDecorator('name_en', {
            rules: [{required: false}],
            initialValue: category.name.en
          })(
            <Input />
          )}
        </FormItem>
        <FormItem label="کد رنگ" {...formItemLayout}>
          {getFieldDecorator('color', {
            rules: [{required: false}],
            initialValue: category.color
          })(
            <Input />
          )}
        </FormItem>
        <FormItem label="تصویر" {...formItemLayout}>
          {getFieldDecorator('photo', {
            rules: [{required: false}],
          })(
            <Upload name="photo" beforeUpload={(photo) => {
              return false
            }}>
              <Button>
                <Icon type="upload" /> انتخاب تصویر
              </Button>
            </Upload>
          )}
        </FormItem>
        {category.photo && <FormItem label="تصویر فعلی" {...formItemLayout}>
          {getFieldDecorator('default_photo')(
            <img className="default-photo" src={category.photo} alt="" />
          )}
        </FormItem>}
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" className="btn-block">ثبت</Button>
        </FormItem>
      </Form>
    )
  }
}

const formItemLayout = {
  labelCol: {
    xs: 8
  },
  wrapperCol: {
    xs: 16
  }
}

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 16,
      offset: 8
    }
  }
}

Former.propTypes = {
  category: PropTypes.object,
}

Former.defaultProps = {
  category: {
    id: null,
    parent_id: '',
    photo: '',
    name: {},
    color: ''
  }
}

function mapStateToProps (state) {
  return {
    categoryList: state.category.list
  }
}

export default connect(mapStateToProps)(Form.create()(Former))