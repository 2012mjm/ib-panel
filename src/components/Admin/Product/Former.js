import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Input } from 'antd'

class Former extends Component {
  render () {
    const FormItem = Form.Item
    const { getFieldDecorator } = this.props.form
    const { product } = this.props
    return (
      <Form className="form" onSubmit={(e) => {
        if (this.props.onSubmit(e, this.props.form, product.id)) {}
      }}>
        <FormItem label="شماره موبایل" {...formItemLayout}>
          {getFieldDecorator('mobile', {
            rules: [{required: true, message: 'این فیلد الزامی است!'}],
            initialValue: product.mobile
          })(
            <Input />
          )}
        </FormItem>
        <FormItem label="کلمه عبور" {...formItemLayout}>
          {getFieldDecorator('password', {
            rules: [{required: true, message: 'این فیلد الزامی است!'}],
          })(
            <Input type="password" />
          )}
        </FormItem>
        <FormItem label="ایمیل" {...formItemLayout}>
          {getFieldDecorator('email')(
            <Input type="email" />
          )}
        </FormItem>
        <FormItem label="نام فروشگاه (فارسی)" {...formItemLayout}>
          {getFieldDecorator('product_name_fa', {
            rules: [{required: true, message: 'این فیلد الزامی است!'}],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem label="نام فروشگاه (انگلیسی)" {...formItemLayout}>
          {getFieldDecorator('product_name_en')(
            <Input />
          )}
        </FormItem>
        <FormItem label="مالک (فارسی)" {...formItemLayout}>
          {getFieldDecorator('owner_fa')(
            <Input />
          )}
        </FormItem>
        <FormItem label="مالک (انگلیسی)" {...formItemLayout}>
          {getFieldDecorator('owner_en')(
            <Input />
          )}
        </FormItem>
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
  product: PropTypes.object,
}

Former.defaultProps = {
  product: {
    id: null,
    product_id: null,
    category_id: null,
    name_fa: '',
    name_en: '',
    description_fa: '',
    description_en: '',
    price: '',
    discount: '',
    quantity: '',
    weight: '',
    status: '',
  }
}

export default Form.create()(Former)