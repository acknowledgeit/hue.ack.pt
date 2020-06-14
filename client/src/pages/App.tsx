import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import 'babel-polyfill'

import Dashboard from './Dashboard'
import Setup from './Setup'
import SetupBridge from './SetupBridge'

import useLocalStorage from '../hooks/useLocalStorage'

export const App = () => {
  const [cache, setCache] = useLocalStorage('_cache')

  let defaultBridgeId: string = ''

  const isSetup = () => {
    if (cache && cache.defaultBridgeId) {
      defaultBridgeId = cache.defaultBridgeId
      return true
    }
    return false
  }

  return (
    <Router>
      <Switch>
        <Route path="/dashboard/:bridgeId">
          <Dashboard cache={cache} setCache={setCache} />
        </Route>
        <Route path="/setup/:bridgeId">
          <SetupBridge cache={cache} setCache={setCache} />
        </Route>
        <Route path="/setup">
          <Setup cache={cache} setCache={setCache} />
        </Route>
        <Route path="/">
          {isSetup() ? (
            <Redirect to={`/dashboard/${defaultBridgeId}`} />
          ) : (
            <Redirect to="/setup" />
          )}
        </Route>
      </Switch>
    </Router>
  )
}
