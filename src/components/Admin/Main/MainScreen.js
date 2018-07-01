import React, {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import './main.css'
import {Layout, Dropdown, Avatar, Menu, Icon} from 'antd'
import {connect} from 'react-redux'
import {logout} from '../../../actions/auth'
import SideMenu from '../SideMenu/SideMenu'
import CategoryScreen from '../Category/Screen'

class MainScreen extends Component {
  constructor (props) {
    super(props)
    this.handleMenuClick = this.handleMenuClick.bind(this)
  }

  handleMenuClick ({ key }) {
    if (key === 'logout') {
      this.props.dispatch(logout())
      this.props.history.push('/admin/login')
    }
  }

  render () {
    const {auth, history} = this.props
    const {Header, Content} = Layout
    const menu = (
      <Menu className="menu" selectedKeys={[]} onClick={this.handleMenuClick}>
        <Menu.Item key="logout"><Icon type="logout" />خروج</Menu.Item>
      </Menu>
    )
    if (history.location.pathname === '/admin/login') { return <span /> }
    if (auth.isAuthenticated && !auth.isAdmin) { history.replace('/store') }
    return (
      <Layout className="container">
        <SideMenu collapsedMenu={false} {...this.props} />
        <Layout>
          <Header className="header">
            <div className="left">
              <Dropdown overlay={menu}>
                <span className="action account">
                  <Avatar size="small" className="avatar" src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" /> مدیر سیستم
                </span>
              </Dropdown>
            </div>
          </Header>
          <Content className="main-content">
            <Switch>
              <Route path="/admin/category" component={CategoryScreen} />
              {/* <Route path="/admin" component={ManageListScreen} /> */}
            </Switch>
            <div className="globalFooter">
              <div className="copyright">
                <Icon type="copyright" /> کلیه حقوق محفوظ است
              </div>
            </div>
          </Content>
        </Layout>
        {!auth.isAuthenticated && (history.location.pathname === '/admin') && <Redirect to="/admin/login" />}
      </Layout>
    )
  }
}

function mapStateToProps (state) {
  return {
    auth: state.auth,
  }
}

export default connect(mapStateToProps)(MainScreen)
