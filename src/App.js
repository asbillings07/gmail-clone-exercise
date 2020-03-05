import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Header } from './templates/Header'
import { Emails } from './templates/Emails'
import { Message } from './templates/Message'
function App() {
  return (
    <Router>
      <Header />
      {/* Need SideBar Here */}
      <Switch>
        <Route exact path='/' component={Emails} />
        <Route exact path='/message/:id' component={Message} />
      </Switch>
    </Router>
  )
}

export default App
