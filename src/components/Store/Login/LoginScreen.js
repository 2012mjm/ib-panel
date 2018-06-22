import React, { Component } from 'react'
import './login.css'
import { Layout } from 'antd'
import { connect } from 'react-redux'
import LoginForm from './LoginForm'
import { storeLoginThunk } from '../../../thunks/auth'
import { notifySuccess, notifyError } from '../../../lib/notification'

class LoginScreen extends Component {
  constructor (props) {
    super(props)
    this.loginSubmit = this.loginSubmit.bind(this)
  }

  loginSubmit (e, form) {
    e.preventDefault()

    form.validateFields((err, values) => {
      if (err) return undefined

      this.props.dispatch(storeLoginThunk(values)).then((res) => {
        notifySuccess('ورود با موفقیت انجام شد')
        if(res.isAdmin) this.props.history.push('/admin')
        else this.props.history.push('/store')
        return false
      }).catch((err) => {
        if (err.response.status === 401) {
          return notifyError('شماره موبایل یا رمز عبور اشتباه است')
        }
      })
    })
  }

  render () {
    const { Content } = Layout
    return (
      <Layout className="container">
        <Content type="flex" justify="space-around" align="middle">
          <h2 className="login-title">ورود به پنل</h2>
          <div className="card-container">
            <LoginForm onSubmit={this.loginSubmit} />
          </div>
        </Content>
      </Layout>
    )
  }
}

function mapStateToProps (state) {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(LoginScreen)
