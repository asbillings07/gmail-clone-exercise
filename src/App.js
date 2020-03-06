import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { SideBar } from './templates/SideBar'
import { EmailList } from './templates/EmailList'
import { Message } from './templates/Message'
function App() {
  return (
    <Router>
      <SideBar />
      {/* Need SideBar Here */}
      <Switch>
        <Route exact path='/' component={EmailList} />
        <Route exact path='/message/:id' component={Message} />
      </Switch>
    </Router>
  )
}

export default App
