import React, { Component } from 'react'
import {Layout, Menu, Icon} from 'antd'
import PropTypes from 'prop-types'
import './sideMenu.css'

class SideMenu extends Component {
  constructor (props) {
    super(props)
    this.state = {
      current: null
    }
    this.onCollapse = this.onCollapse.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  onCollapse (collapsed) {
    // Actions.toggleMenu(collapsed)
  }

  handleClick (e) {
    this.props.history.push(e.key)
  }

  render () {
    const { Sider } = Layout
    // const { SubMenu } = Menu
    return (
      <Sider collapsible collapsed={this.props.collapsedMenu} onCollapse={() => console.log('')}>
        <div className="logo" >
          {/* <img src={logo} alt="logo" height="39" width="97" className="logoimg" /> */}
        </div>
        <Menu id="mainSideMenu" theme="dark" defaultSelectedKeys={['1']} mode="inline" onClick={this.handleClick}>
          <Menu.Item key="/admin/product">
            <Icon type="layout" />
            <span className="menu">محصولات</span>
          </Menu.Item>
          <Menu.Item key="/admin/category">
            <Icon type="layout" />
            <span className="menu">دسته‌بندی‌ها</span>
          </Menu.Item>
        </Menu>
      </Sider>
    )
  }
}

SideMenu.propTypes = {
  isAuthenticated: PropTypes.bool,
  collapsedMenu: PropTypes.bool
}

export default SideMenu
