import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

class InitialScreen extends Component {
  render () {
    const { isAuthenticated } = this.props.auth
    return (
      <Redirect to={`${isAuthenticated ? '/store' : '/login'}`} />
    )
  }
}

function mapStateToProps (state) {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(InitialScreen)
