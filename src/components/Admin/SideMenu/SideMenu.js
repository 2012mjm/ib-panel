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
    const { SubMenu } = Menu
    return (
      <Sider collapsible collapsed={this.props.collapsedMenu} onCollapse={() => console.log('')}>
        <div className="logo" >
          {/* <img src={logo} alt="logo" height="39" width="97" className="logoimg" /> */}
        </div>
        <Menu id="mainSideMenu" theme="dark" defaultSelectedKeys={['1']} mode="inline" onClick={this.handleClick}>
        <SubMenu title={<span><Icon type="database" /><span className="menu">محصولات</span></span>}>
            <Menu.Item key="/admin/product">
              <Icon type="file-text" />
              <span className="menu">لیست محصولات</span>
            </Menu.Item>
            <Menu.Item key="/admin/product/add">
              <Icon type="file-text" />
              <span className="menu">افزودن محصول جدید</span>
            </Menu.Item>
          </SubMenu>
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
