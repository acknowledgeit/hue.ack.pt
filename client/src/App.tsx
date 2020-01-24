import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Setup from './components/Setup'

class App extends React.Component {
  render() {
    return <BrowserRouter>
      <Switch>
        <Route path="/">
          <Setup />
        </Route>
      </Switch>
    </BrowserRouter>
  }
}

export default App;
