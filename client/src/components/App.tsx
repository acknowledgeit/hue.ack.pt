import * as React from 'react'
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom'

import { Dashboard } from './Dashboard'
import { Setup } from './Setup'

const isSetup = () => {
  return false
}

export const App = () => (
  <Router>
    <Switch>
      <Route path="/dashboard">
        <Dashboard />
      </Route>
      <Route path="/setup">
        <Setup />
      </Route>
      <Route path="/">{isSetup() ? <Redirect to="/dashboard" /> : <Redirect to="/setup" />}</Route>
    </Switch>
  </Router>
)
