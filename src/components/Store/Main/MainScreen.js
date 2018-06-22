import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import './main.css'
import { Layout, Dropdown, Avatar, Menu, Icon } from 'antd'
import { connect } from 'react-redux'
import { logout } from '../../../actions/auth'
import SideMenu from '../SideMenu/SideMenu'

class MainStoreScreen extends Component {
  constructor (props) {
    super(props)
    this.handleMenuClick = this.handleMenuClick.bind(this)
  }

  handleMenuClick ({ key }) {
    if (key === 'logout') {
      this.props.dispatch(logout())
      this.props.history.push('/account')
    }
  }

  render () {
    const {auth, history} = this.props
    const {Header, Content} = Layout
    const menu = (
      <Menu className="menu" selectedKeys={[]} onClick={this.handleMenuClick}>
        <Menu.Item key="logout"><span>خروج</span><Icon type="logout" /></Menu.Item>
      </Menu>
    )
    if (auth.isAuthenticated && auth.isAdmin) { history.replace('/admin') }
    return (
      <Layout className="container">
        <SideMenu collapsedMenu={false} {...this.props} />
        <Layout>
          <Header className="header">
            <div className="left">
              <Dropdown overlay={menu}>
                <span className="action account">
                  {auth.isAuthenticated && <span>{`${auth.storeOwner || auth.mobile} [${auth.storeName}]`}</span>} <Avatar size="small" className="avatar" src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
                </span>
              </Dropdown>
            </div>
          </Header>
          <Content className="main-content">
            <div className="globalFooter">
              <div className="copyright">
                <Icon type="copyright" /> کلیه حقوق محفوظ است
              </div>
            </div>
          </Content>
        </Layout>

        {!auth.isAuthenticated && <Redirect to="/account" />}
      </Layout>
    )
  }
}

function mapStateToProps (state) {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(MainStoreScreen)
