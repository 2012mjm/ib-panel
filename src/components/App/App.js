import React, {Component} from 'react'
import './App.css'
import {LocaleProvider} from 'antd'
import {Route} from 'react-router-dom'
import faIR from 'antd/lib/locale-provider/fa_IR'
import StoreAccountScreen from '../Store/Account/AccountScreen'
import AdminLoginScreen from '../Admin/Login/LoginScreen'
import InitialScreen from '../InitialScreen'
import configStore from '../../lib/configureStore'
import {Provider} from 'react-redux'
import {ConnectedRouter} from 'react-router-redux'
import {loggedIn} from '../../actions/auth'
import {setAuthorizationToken} from '../../lib/utils'
import MainStoreScreen from '../Store/Main/MainScreen'
import MainAdminScreen from '../Admin/Main/MainScreen'

class App extends Component {
  constructor (props) {
    super(props)
    const { store, history } = configStore()
    this.state = {
      store: store,
      history: history
    }
  }

  componentWillMount () {
    if (window.localStorage.auth) {
      const auth = JSON.parse(window.localStorage.auth)
      setAuthorizationToken(auth.token)
      this.state.store.dispatch(loggedIn(auth))
    }
  }

  render () {
    const {history, store} = this.state
    return (
      <Provider store={store} >
        <ConnectedRouter history={history}>
          <LocaleProvider locale={faIR}>
            <div>
              <Route path="/" exact component={InitialScreen} />
              <Route path="/admin/login" exact component={AdminLoginScreen} />
              <Route path="/admin" component={MainAdminScreen} />
              <Route path="/store" component={MainStoreScreen} />
              <Route path="/account" component={StoreAccountScreen} />
            </div>
          </LocaleProvider>
        </ConnectedRouter>
      </Provider>
    )
  }
}

export default App
