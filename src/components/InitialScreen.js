import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

class InitialScreen extends Component {
  render () {
    const { isAuthenticated } = this.props.auth
    return (
      <Redirect to={`${isAuthenticated ? '/store' : '/account'}`} />
    )
  }
}

function mapStateToProps (state) {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(InitialScreen)
